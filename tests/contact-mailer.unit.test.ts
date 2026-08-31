import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

describe('Mailer & SMTP Integration Tests (TDD Rule 2 - Red/Green)', () => {
  const rootDir = process.cwd()
  const scriptPath = path.join(rootDir, 'tests', 'scripts', 'test-smtp-mailer.php')
  const phpBin = fs.existsSync('C:\\php\\php.exe') ? 'C:\\php\\php.exe' : 'php'

  it('verifies Mailer.php exists, PHPMailer loads, and handles fallback gracefully', () => {
    let output = ''
    try {
      output = execSync(`"${phpBin}" "${scriptPath}"`, { encoding: 'utf-8' })
    } catch (err: any) {
      output = err.stdout ? err.stdout.toString() : err.message
      // If the PHP script fails (e.g. exit 1 because Mailer.php is missing), parse JSON output
      try {
        const json = JSON.parse(output)
        expect(json.success).toBe(true)
      } catch {
        throw new Error(`PHP script failed before completion: ${output}`)
      }
    }

    const data = JSON.parse(output)
    expect(data.success).toBe(true)
    expect(data.results.mailer_loaded).toBe(true)
    expect(data.results.smtp_class_available).toBe(true)
    expect(data.results.fallback_when_disabled).toBe(true)
    expect(data.results.resilient_error_handling).toBe(true)
  })
})
