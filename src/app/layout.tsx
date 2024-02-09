'use client'

import React from 'react'
import { DocumentationContent, DocumentationLayout } from '../shared/components/Documentation'
import { DocumentationSidebar } from '../shared/components/DocumentationSidebar'
import { css } from '@linaria/core'
import {
  contentFontStack,
  dark, darkBackground, darkContent, light, lightBackground, lightContent
} from '../shared/styles/theme'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="description" content="Teo Documentation. Guides, references, tutorials for Teo web framework." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
        <title>TEO Docs</title>
      </head>
      <body className={css`
        margin: 0;
        scroll-behavior: smooth;
        ${light} {
          background-color: ${lightBackground};
          color: ${lightContent};
        }
        ${dark} {
          background-color: ${darkBackground};
          color: ${darkContent};
        }
        font-family: ${contentFontStack};
      `}>
        <DocumentationLayout path={pathname}>
          <DocumentationSidebar path={pathname} />
          <DocumentationContent>
            {children}
          </DocumentationContent>
        </DocumentationLayout>
      </body>
    </html>
  )
}