import fs from 'fs'
import path from 'path'

export default async function globalTeardown() {
  const fixturesDir = path.resolve(__dirname, '../fixtures/data')

  // Reset fixture page-visibility.json back to default enabled state
  const visibilityPath = path.join(fixturesDir, 'page-visibility.json')
  const defaultState = {
    blog: true,
    gallery: true,
    portfolio: true,
    venues: true,
  }
  if (fs.existsSync(fixturesDir)) {
    fs.writeFileSync(visibilityPath, JSON.stringify(defaultState, null, 4), 'utf-8')
  }

  // Clean up any remaining .e2e-bak files in php-admin/data if any exist from previous runs
  const dataDir = path.resolve(__dirname, '../../php-admin/data')
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir)
    for (const f of files) {
      if (f.endsWith('.e2e-bak')) {
        try {
          fs.unlinkSync(path.join(dataDir, f))
        } catch {}
      }
    }
  }
}
