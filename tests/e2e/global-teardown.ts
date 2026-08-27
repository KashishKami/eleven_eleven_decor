import fs from 'fs'
import path from 'path'

export default async function globalTeardown() {
  const dataPath = path.resolve(__dirname, '../../php-admin/data/page-visibility.json')
  const defaultState = {
    blog: false,
    gallery: false,
    portfolio: false,
    venues: false,
  }
  fs.writeFileSync(dataPath, JSON.stringify(defaultState, null, 4), 'utf-8')
}
