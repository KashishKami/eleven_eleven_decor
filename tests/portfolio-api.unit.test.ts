import { describe, it, expect } from 'vitest'
import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

const scriptPath = path.resolve(__dirname, 'scripts/test-portfolio-crud.php')
const phpBin = fs.existsSync('C:\\php\\php.exe') ? 'C:\\php\\php.exe' : 'php'

describe('Portfolio PHP CRUD & Data Store (W-1103)', () => {
  it('executes PortfolioStore operations via PHP CLI integration script', () => {
    const output = execSync(`"${phpBin}" "${scriptPath}"`, { encoding: 'utf-8' })
    const data = JSON.parse(output.trim())

    expect(data.create).toBe(true)
    expect(data.read_list).toBe(true)
    expect(data.find_slug).toBe(true)
    expect(data.update).toBe(true)
    expect(data.delete).toBe(true)
  })
})
