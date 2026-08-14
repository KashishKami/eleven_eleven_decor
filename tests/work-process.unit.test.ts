import { describe, it, expect } from 'vitest'
import { PROCESS_STEPS } from '@/data/process'

describe('Work Process Data & Configuration', () => {
  it('defines 4 process steps with images for 3-column sticky pinning layout', () => {
    expect(PROCESS_STEPS).toHaveLength(4)
    PROCESS_STEPS.forEach((step) => {
      expect(step.number).toBeDefined()
      expect(step.title).toBeDefined()
      expect(step.description).toBeDefined()
      expect(step.image).toBeDefined()
      expect(typeof step.image).toBe('string')
      expect(step.image.length).toBeGreaterThan(0)
    })
  })

  it('contains expected step numbers 01, 02, 03, 04', () => {
    const numbers = PROCESS_STEPS.map((s) => s.number)
    expect(numbers).toEqual(['01', '02', '03', '04'])
  })
})
