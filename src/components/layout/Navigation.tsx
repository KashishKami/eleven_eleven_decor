import React from 'react'
import { getPageVisibility } from '@/lib/server-visibility'
import { NavigationClient } from './NavigationClient'

export function Navigation() {
  const pageVisibility = getPageVisibility()
  return <NavigationClient visibility={pageVisibility} />
}
