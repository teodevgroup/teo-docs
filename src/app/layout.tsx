'use client'

import Head from 'next/head'
import React from 'react'
import { DocumentationContent, DocumentationLayout } from '../shared/components/Documentation'
import { DocumentationSidebar } from '../shared/components/DocumentationSidebar'
import { usePathname } from 'next/navigation'
import { css } from '@linaria/core'
import {
  contentFontStack,
  dark, darkBackground, darkContent, light, lightBackground, lightContent
} from '../shared/styles/theme'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  return (
    <html lang="en">
      <Head>
        <meta name="color-scheme" content="light only" />
        <meta name="description" content="TEO is the next-generation web framework for Rust, Node.js and Python. It reduces developing time and improves developers' life experience." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
      </Head>
      <body className={css`
      margin: 0;
      scroll-behavior: smooth;
      ${light} {
        background-color: ${lightBackground};
        color: ${lightContent};
      }
      /* ${dark} {
        background-color: ${darkBackground};
        color: ${darkContent};
      } */
      font-family: ${contentFontStack};
      `}>
        <DocumentationLayout path={pathname}>
        <Head>
          <title>TEO Docs</title>
        </Head>
        <DocumentationSidebar path={pathname} />
          <DocumentationContent>
            <article>
              {children}
            </article>
          </DocumentationContent>
      </DocumentationLayout>
      </body>
    </html>
  )
}