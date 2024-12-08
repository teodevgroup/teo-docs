'use server'

import React from 'react'
import fetchToc from '../../shared/lib/fetchToc'
import { ClientDocumentationSidebar, DocSidebarContainer } from './DocumentationSidebarClient'
import { headers } from 'next/headers'

export const DocumentationSidebar = async () => {
  const headersList = await headers()
  const path = headersList.get('x-request-pathname') as string
  const sidebarToc = await fetchToc(firstPathComponent(path))
  if (sidebarToc) {
    return <ClientDocumentationSidebar path={path} sidebarToc={sidebarToc} />
  } else {
    return requiresSidebar(path) ? <DocSidebarContainer /> : <></>
  }
}

const requiresSidebar = (path: string) => {
  return path.startsWith('/guides') || path.startsWith('/getting-started') || path.startsWith('/concepts') || path.startsWith('/reference')
}

const firstPathComponent = (path: string) => {
  const components = path.split('/')
  if (components.length > 1) {
    return '/' + components[1]
  } else {
    return ''
  }
}
