import path from 'path'
import fs from 'fs'

/**
 * Resolves the active data storage directory for Next.js server components and build scripts.
 * Prioritizes TEST_DATA_DIR or DATA_DIR environment variables when set (e.g. during tests or isolated builds),
 * falling back to php-admin/data in the project root.
 */
export function getServerDataDir(): string {
  const custom = process.env.TEST_DATA_DIR || process.env.DATA_DIR
  if (custom && fs.existsSync(custom)) {
    return custom
  }
  return path.join(process.cwd(), 'php-admin', 'data')
}
