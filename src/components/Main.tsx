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
import Preferences from '../lib/preferences/preferences'

export default function Main({
  children,
}: {
  children: React.ReactNode,
  preferences: Preferences,
}) {
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
      <DocumentationLayout>
        <DocumentationSidebar />
        <DocumentationContent>{children}</DocumentationContent>
      </DocumentationLayout>
    </body>
  )
}
