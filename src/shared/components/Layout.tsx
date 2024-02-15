'use client'

import React, { ReactElement, ReactNode } from 'react'
import { styled } from '@linaria/react'
import { globals } from '../styles/app.linaria.global'


const LayoutContainer = styled.div`
  overflow-y: hidden;
`

type LayoutProps = {
  children?: ReactNode
}

const Layout: (props: LayoutProps) => ReactElement = ({ children }) => {
  return <LayoutContainer className={globals}>
    {children}
  </LayoutContainer>
}

export default Layout
