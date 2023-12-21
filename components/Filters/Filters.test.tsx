/* eslint-disable no-undef */

import { Filters } from '.'

import { fireEvent, render } from '@/test-utils'

describe('Filter component', () => {
  it('has disable select and input when loading', () => {
    const { getByTestId, getByLabelText } = render(<Filters loading selectedNationalities={[]} onChangeName={() => {}} onChangeNationalities={() => {}} />)
    const input = getByLabelText('Search by user')
    const selector = getByTestId('selector')

    expect(input).toBeDisabled()
    expect(selector).toBeDisabled()
  })

  it('on change call when a nationality is selected', () => {
    const mockOnChangeNationalities = jest.fn()

    const { getByTestId } = render(<Filters loading={false} selectedNationalities={[]} onChangeName={() => {}} onChangeNationalities={mockOnChangeNationalities} />)
    const selector = getByTestId('selector')
    fireEvent.change(selector, { target: { value: ['AU', 'CH'] } })
    expect((selector as HTMLInputElement).value).toBe('AU,CH')
  })

  it('on change call when a username is searched and change value of input', () => {
    const mockOnChangeUsername = jest.fn()

    const { getByLabelText } = render(<Filters loading={false} selectedNationalities={[]} onChangeName={mockOnChangeUsername} onChangeNationalities={() => {}} />)
    const input = getByLabelText('Search by user')
    fireEvent.change(input, { target: { value: 'agustin' } })

    expect(mockOnChangeUsername).toHaveBeenCalled()
    expect((input as HTMLInputElement).value).toBe('agustin')
  })
})
