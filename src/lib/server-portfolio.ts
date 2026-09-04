import fs from 'fs'
import path from 'path'
import type { PortfolioProject } from '@/data/portfolio'
import { getServerDataDir } from './server-data-dir'

export function getAllPortfolioProjectsServer(): PortfolioProject[] {
  const jsonPath = path.join(getServerDataDir(), 'portfolio.json')
  if (!fs.existsSync(jsonPath)) {
    return []
  }
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8')
    const projects = JSON.parse(content)
    if (Array.isArray(projects)) {
      return projects.filter((p) => !p.published || p.published === 1 || p.published === true)
    }
    return []
  } catch {
    return []
  }
}

export function getPortfolioProjectBySlugServer(slug: string): PortfolioProject | null {
  const projects = getAllPortfolioProjectsServer()
  return projects.find((p) => p.slug === slug) || null
}
