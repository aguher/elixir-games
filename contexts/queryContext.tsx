"use client"

import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
interface Props {
    children:React.ReactNode
}
export function QueryProvider ({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
