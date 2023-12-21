/* eslint-disable no-undef */
import { Welcome } from './Welcome'

import { render, screen } from '@/test-utils'

describe('Welcome component', () => {
  it('has correct title', () => {
    render(<Welcome />)
    expect(screen.getByText('Welcome to')).toBeInTheDocument()
  })
})
