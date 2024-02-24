'use client'

import {
  DocumentationContent,
  DocumentationLayout,
} from '../components/Documentation'
import { DocumentationSidebar } from '../components/DocumentationSidebar'
import { css } from '@linaria/core'
import {
  contentFontStack,
  dark,
  darkBackground,
  darkContent,
  light,
  lightBackground,
  lightContent,
} from '../styles/theme'
import { usePathname } from 'next/navigation'

export default function Main({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <body
      className={css`
        margin: 0;
        scroll-behavior: smooth;
        ${light} {
          background-color: ${lightBackground};
          color: ${lightContent};
        }
        ${dark} {
          background-color: ${darkBackground};
          color: ${darkContent};
        };
        font-family: ${contentFontStack};
      `}
    >
      <DocumentationLayout path={pathname}>
        <DocumentationSidebar path={pathname} />
        <DocumentationContent>{children}</DocumentationContent>
      </DocumentationLayout>
    </body>
  )
}
