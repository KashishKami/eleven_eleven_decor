import { describe, it, expect } from 'vitest'
import { PORTFOLIO_PROJECTS } from '../src/data/portfolio'

describe('Portfolio Data Registry (W-601)', () => {
  it('contains portfolio projects', () => {
    expect(PORTFOLIO_PROJECTS.length).toBeGreaterThanOrEqual(6)
  })

  it('ensures each project has valid slug, title, category, hero image, and detail specs', () => {
    PORTFOLIO_PROJECTS.forEach((project) => {
      expect(project.slug).toBeDefined()
      expect(project.title.length).toBeGreaterThan(0)
      expect(project.category).toBeDefined()
      expect(project.heroImage).toContain('http')
      expect(project.location).toBeDefined()
      expect(project.guestCount).toBeGreaterThan(0)
      expect(project.summary.length).toBeGreaterThan(0)
    })
  })
})
