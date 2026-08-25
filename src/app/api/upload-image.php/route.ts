import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const phpUploadsDir = path.join(process.cwd(), 'php-admin', 'manage-7f3b9x2k', 'uploads')
    if (!fs.existsSync(phpUploadsDir)) {
      fs.mkdirSync(phpUploadsDir, { recursive: true })
    }

    const extension = path.extname(file.name) || '.jpg'
    const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${extension}`
    const destPath = path.join(uploadsDir, safeName)
    const phpDestPath = path.join(phpUploadsDir, safeName)

    fs.writeFileSync(destPath, buffer)
    try {
      fs.writeFileSync(phpDestPath, buffer)
    } catch {
      // safe fallback
    }

    return NextResponse.json({ url: `/uploads/${safeName}` }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
