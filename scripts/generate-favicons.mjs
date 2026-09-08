import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

async function generate() {
  const logoSource = path.resolve('Images/11-11-11.png')
  const faviconSource = path.resolve('Images/11-11-favicon.png')
  const publicDir = path.resolve('public')
  const appDir = path.resolve('src/app')

  console.log('Generating logos from:', logoSource)
  console.log('Generating favicons from:', faviconSource)

  // Ensure output directories exist
  await fs.promises.mkdir(publicDir, { recursive: true })
  await fs.promises.mkdir(appDir, { recursive: true })

  // 1. Generate public/logo.png & public/logo-nav.png from 11-11-11.png
  const trimmedLogo = await sharp(logoSource)
    .trim()
    .toBuffer()

  const logoNavBuffer = await sharp(trimmedLogo)
    .resize({ height: 180, withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 8 })
    .toBuffer()

  const logoMasterBuffer = await sharp(trimmedLogo)
    .png({ quality: 90, compressionLevel: 8 })
    .toBuffer()

  await fs.promises.writeFile(path.join(publicDir, 'logo.png'), logoMasterBuffer)
  await fs.promises.writeFile(path.join(publicDir, 'logo-nav.png'), logoNavBuffer)
  console.log('✓ Generated public/logo.png & public/logo-nav.png')

  // 2. Trim and make square icon with padding from 11-11-favicon.png
  const trimmedFavicon = await sharp(faviconSource)
    .trim()
    .toBuffer()

  const squareBuffer = await sharp(trimmedFavicon)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer()

  // 512x512 master icon
  await fs.promises.writeFile(path.join(publicDir, 'icon-512.png'), squareBuffer)
  await fs.promises.writeFile(path.join(appDir, 'icon.png'), squareBuffer)

  // 192x192 apple/android icon
  const icon192 = await sharp(squareBuffer).resize(192, 192).png().toBuffer()
  await fs.promises.writeFile(path.join(publicDir, 'icon-192.png'), icon192)
  await fs.promises.writeFile(path.join(appDir, 'apple-icon.png'), icon192)

  // 48x48 and 32x32 for favicon.png & favicon.ico
  const icon48 = await sharp(squareBuffer).resize(48, 48).png().toBuffer()
  const icon32 = await sharp(squareBuffer).resize(32, 32).png().toBuffer()

  await fs.promises.writeFile(path.join(publicDir, 'favicon.png'), icon32)
  await fs.promises.writeFile(path.join(publicDir, 'favicon-48.png'), icon48)

  // Write directly as favicon.ico
  await fs.promises.writeFile(path.join(publicDir, 'favicon.ico'), icon48)
  await fs.promises.writeFile(path.join(appDir, 'favicon.ico'), icon48)

  console.log('✓ Favicons generated successfully from 11-11-favicon.png!')
}

generate().catch((err) => {
  console.error('Failed to generate favicons & logos:', err)
  process.exit(1)
})
