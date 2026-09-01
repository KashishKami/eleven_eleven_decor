import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

function getPhpBinary(): string {
  if (fs.existsSync('C:\\php\\php.exe')) return 'C:\\php\\php.exe'
  return 'php'
}

describe('Real-Time Gateway & Visibility Guard (W-1203)', () => {
  const phpBin = getPhpBinary()
  const rootDir = process.cwd()
  const gatewayPath = path.join(rootDir, 'public', 'gateway.php')
  const testScriptPath = path.join(rootDir, 'tests', 'scripts', 'test-gateway.php')
  const testDataDir = path.join(rootDir, 'tests', 'fixtures', 'data')

  it('gateway.php exists in public directory', () => {
    expect(fs.existsSync(gatewayPath)).toBe(true)
  })

  it('returns HTTP 404 when section is toggled off in page-visibility.json', () => {
    expect(fs.existsSync(testScriptPath)).toBe(true)
    const output = execSync(`"${phpBin}" "${testScriptPath}" --mode=visibility_off`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })
    const res = JSON.parse(output)
    expect(res.status_code).toBe(404)
    expect(res.body).toContain('404')
  })

  it('returns HTTP 200 when section is toggled on and slug exists', () => {
    const output = execSync(`"${phpBin}" "${testScriptPath}" --mode=valid_item`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })
    const res = JSON.parse(output)
    expect(res.status_code).toBe(200)
    expect(res.is_visible).toBe(true)
  })

  it('returns HTTP 404 when slug does not exist in data store', () => {
    const output = execSync(`"${phpBin}" "${testScriptPath}" --mode=invalid_slug`, {
      encoding: 'utf-8',
      env: { ...process.env, TEST_DATA_DIR: testDataDir },
    })
    const res = JSON.parse(output)
    expect(res.status_code).toBe(404)
  })
})
