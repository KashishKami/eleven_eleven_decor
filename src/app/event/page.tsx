import React from 'react'
import type { Metadata } from 'next'
import EventsHubPage, { metadata as hubMetadata } from '../events/page'

export const metadata: Metadata = hubMetadata

export default function EventPageAlias() {
  return <EventsHubPage />
}
