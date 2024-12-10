'use server'

import React from 'react'
import type { Viewport } from 'next'
import { headers } from 'next/headers'
import Main from '../shared/components/Main'
import defaultPreferences from '../shared/lib/preferences/preferencesServer'
import { outlineCachesFetcher } from '../shared/lib/outline/outlineCachesFetcher'

export async function generateViewport(): Promise<Viewport> {
  return {
    colorScheme: 'light dark',
  }
}

export async function generateMetadata() {
  const headersList = await headers()
  const pathname = headersList.get('x-request-pathname') as string
  const res = outlineCachesFetcher.tableOfContents(pathname)
  
  return {
    title: res?.title ? `${res.title} | TEO Docs` : 'TEO Docs',
    description: 'Teo Documentation. Guides, references, tutorials for Teo web framework.',
    icons: {
      icon: '/favicon.ico',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const preferences = await defaultPreferences()
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      </head>
      <Main preferences={preferences}>
        {children}
      </Main>
    </html>
  )
}
