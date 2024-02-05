'use client'

import { css } from '@linaria/core'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { DocumentationLayout } from '../shared/components/Documentation'
import { DocumentationSidebar } from '../shared/components/DocumentationSidebar'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <html lang="en">
      <body>
        <DocumentationLayout path={pathname}>
        <Head>
          <title>TEO Docs</title>
        </Head>
        <DocumentationSidebar path={pathname} />
        {children}        
      </DocumentationLayout>
      </body>
    </html>
  )
}