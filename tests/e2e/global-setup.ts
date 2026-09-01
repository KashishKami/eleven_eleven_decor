import fs from 'fs'
import path from 'path'

const filesToMock = ['posts.json', 'portfolio.json', 'venues.json', 'gallery.json', 'page-visibility.json']

export default async function globalSetup() {
  const dataDir = path.resolve(__dirname, '../../php-admin/data')
  const fixturesDir = path.resolve(__dirname, '../fixtures/data')

  // Back up any existing files in php-admin/data
  for (const file of filesToMock) {
    const srcPath = path.join(dataDir, file)
    const bakPath = path.join(dataDir, `${file}.e2e-bak`)
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, bakPath)
    }

    // Copy fixture into php-admin/data for consistent test execution
    const fixturePath = path.join(fixturesDir, file)
    if (fs.existsSync(fixturePath)) {
      fs.copyFileSync(fixturePath, srcPath)
    }
  }

  // Ensure all dynamic sections are enabled for E2E tests
  const visibilityPath = path.join(dataDir, 'page-visibility.json')
  const enabledState = {
    blog: true,
    gallery: true,
    portfolio: true,
    venues: true,
  }
  fs.writeFileSync(visibilityPath, JSON.stringify(enabledState, null, 4), 'utf-8')
}
