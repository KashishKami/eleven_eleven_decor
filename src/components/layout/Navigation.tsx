import React from 'react'
import pageVisibility from '../../../php-admin/data/page-visibility.json'
import { NavigationClient } from './NavigationClient'

export function Navigation() {
  return <NavigationClient visibility={pageVisibility} />
}
