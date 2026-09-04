import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// Disable sharp file cache on Windows to prevent lock issues
sharp.cache(false)

const PUBLIC_DIR = path.resolve('public')

async function getFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)))
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const statBefore = await fs.promises.stat(filePath)
  const initialBytes = statBefore.size

  // Skip tiny files (< 20KB)
  if (initialBytes < 20 * 1024) {
    return { skipped: true, initialBytes }
  }

  const inputBuffer = await fs.promises.readFile(filePath)
  const image = sharp(inputBuffer)
  const metadata = await image.metadata()

  let pipeline = sharp(inputBuffer)

  // Downscale only if larger than 1920px width/height for web efficiency & SEO standards
  if (metadata.width && metadata.width > 1920) {
    pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true })
  } else if (metadata.height && metadata.height > 1920) {
    pipeline = pipeline.resize({ height: 1920, withoutEnlargement: true })
  }

  let buffer
  if (ext === '.jpg' || ext === '.jpeg') {
    buffer = await pipeline
      .jpeg({
        quality: 86,
        mozjpeg: true,
        progressive: true,
      })
      .toBuffer()
  } else if (ext === '.webp') {
    buffer = await pipeline
      .webp({
        quality: 85,
        effort: 6,
      })
      .toBuffer()
  } else if (ext === '.png') {
    // For logos and PNG images
    buffer = await pipeline
      .png({
        quality: 85,
        compressionLevel: 9,
        effort: 8,
      })
      .toBuffer()
  }

  if (buffer && buffer.length < initialBytes) {
    await fs.promises.writeFile(filePath, buffer)
    return {
      success: true,
      initialBytes,
      finalBytes: buffer.length,
      savedBytes: initialBytes - buffer.length,
    }
  }

  return { skipped: true, initialBytes }
}

async function run() {
  console.log('--- Starting Image Asset Optimization ---')
  const files = await getFiles(PUBLIC_DIR)
  console.log(`Found ${files.length} image files in public/`)

  let totalBefore = 0
  let totalAfter = 0
  let optimizedCount = 0

  for (const file of files) {
    try {
      const relPath = path.relative(PUBLIC_DIR, file)
      const res = await optimizeImage(file)
      totalBefore += res.initialBytes
      if (res.success) {
        totalAfter += res.finalBytes
        optimizedCount++
        const pct = (((res.savedBytes) / res.initialBytes) * 100).toFixed(1)
        console.log(
          `✓ ${relPath}: ${(res.initialBytes / 1024).toFixed(0)}KB -> ${(res.finalBytes / 1024).toFixed(0)}KB (-${pct}%)`
        )
      } else {
        totalAfter += res.initialBytes
      }
    } catch (err) {
      console.error(`Failed to process ${file}:`, err.message)
    }
  }

  const savedMB = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2)
  const beforeMB = (totalBefore / (1024 * 1024)).toFixed(2)
  const afterMB = (totalAfter / (1024 * 1024)).toFixed(2)
  const totalPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)

  console.log('\n--- Optimization Summary ---')
  console.log(`Files optimized: ${optimizedCount}/${files.length}`)
  console.log(`Total Size: ${beforeMB} MB -> ${afterMB} MB`)
  console.log(`Bandwidth Saved: ${savedMB} MB (${totalPct}% reduction!)`)
}

run()
