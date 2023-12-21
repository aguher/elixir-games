/* eslint-disable no-undef */

import { EmptyState } from '.'

import { render, screen } from '@/test-utils'

describe('EmptyState component', () => {
  it('on refresh action is called', () => {
    const onRefreshMock = jest.fn()
    const { getByRole } = render(<EmptyState onRefresh={onRefreshMock} />)
    const button = getByRole('button')
    button.click()
    expect(onRefreshMock).toHaveBeenCalled()
  })

  it('has the correct title and description', () => {
    const onRefreshMock = jest.fn()
    render(<EmptyState onRefresh={onRefreshMock} />)
    expect(screen.getByText('There is no results!')).toBeInTheDocument()
    expect(screen.getByText("We're sorry, but we couldn't find any results to show you. Keep trying!")).toBeInTheDocument()
  })
})
