import fs from 'fs'
import path from 'path'

export default async function globalSetup() {
  const dataPath = path.resolve(__dirname, '../../php-admin/data/page-visibility.json')
  const enabledState = {
    blog: true,
    gallery: true,
    portfolio: true,
    venues: true,
  }
  fs.writeFileSync(dataPath, JSON.stringify(enabledState, null, 4), 'utf-8')
}
