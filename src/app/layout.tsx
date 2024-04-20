'use server'

import React from 'react'

import type { Viewport } from 'next'
import { headers } from 'next/headers'
import Main from '../shared/components/Main'

export async function generateViewport(): Promise<Viewport> {
  return {
    colorScheme: 'light dark',
  }
}

export async function generateMetadata() {
  const headersList = headers()
  const pathname = headersList.get('x-request-pathname') as string
  const res = await global.docFetchToc(pathname)
  
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
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100,200,300,400,500,600,700,800,900&family=Barlow:ital,wght@0,100,200,300,400,500,600,700,800,900&family=Inter:wght@100,200,300,400,500,600,700,800,900&family=JetBrains+Mono:ital,wght@0,100,200,300,400,500,600,700,800&display=swap" />
      </head>
        
      <Main>
        {children}
      </Main>
    </html>
  )
}
