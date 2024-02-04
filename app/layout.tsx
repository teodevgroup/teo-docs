import { css } from '@linaria/core'
import React from 'react'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className={css`background-color: green;`}>{children}</body>
      </html>
    )
  }