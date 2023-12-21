import '@mantine/core/styles.css'
import React from 'react'
import { MantineProvider, ColorSchemeScript, Container } from '@mantine/core'

import { theme } from '../theme'

import { QueryProvider } from '@/contexts/queryContext'

export const metadata = {
  title: 'Agus Herrera - Challenge',
  description: 'Frontend challenge!'
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link href='/favicon.svg' rel='shortcut icon' />
        <meta
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
          name='viewport'
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <QueryProvider>
            <Container>
              {children}
            </Container>
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
