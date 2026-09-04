import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export default async function globalSetup() {
  const fixturesDir = path.resolve(__dirname, '../fixtures/data')

  // 1. Ensure all dynamic sections are enabled in test fixtures
  const visibilityPath = path.join(fixturesDir, 'page-visibility.json')
  const enabledState = {
    blog: true,
    gallery: true,
    portfolio: true,
    venues: true,
  }
  fs.writeFileSync(visibilityPath, JSON.stringify(enabledState, null, 4), 'utf-8')

  // 2. Build Next.js static export against test fixtures so out/ is fully synchronized
  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      TEST_DATA_DIR: fixturesDir,
    },
  })
}
