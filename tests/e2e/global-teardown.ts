import fs from 'fs'
import path from 'path'

const filesToMock = ['posts.json', 'portfolio.json', 'venues.json', 'gallery.json', 'page-visibility.json']

export default async function globalTeardown() {
  const dataDir = path.resolve(__dirname, '../../php-admin/data')

  // Restore live data from .e2e-bak files
  for (const file of filesToMock) {
    const srcPath = path.join(dataDir, file)
    const bakPath = path.join(dataDir, `${file}.e2e-bak`)
    if (fs.existsSync(bakPath)) {
      fs.copyFileSync(bakPath, srcPath)
      fs.unlinkSync(bakPath)
    }
  }

  // Ensure page-visibility.json returns to default all-off state
  const visibilityPath = path.join(dataDir, 'page-visibility.json')
  const defaultState = {
    blog: false,
    gallery: false,
    portfolio: false,
    venues: false,
  }
  fs.writeFileSync(visibilityPath, JSON.stringify(defaultState, null, 4), 'utf-8')
}
