'use client'
import { Input, Grid, MultiSelect } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'

const nationalities = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US']

interface Props {
    onChangeNationalities:(nationalities:string[]) => void
    onChangeName:(name:string)=>void
    selectedNationalities:string[]
    loading:boolean
}

export const Filters = ({ onChangeNationalities, onChangeName, selectedNationalities, loading }:Props) => {
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 200)
  useEffect(() => {
    onChangeName(debounced)
  }, [debounced, onChangeName])

  return (
    <Grid m='lg'>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <MultiSelect
          clearable
          hidePickedOptions
          searchable
          data={nationalities}
          data-testid='selector'
          defaultValue={selectedNationalities}
          description='You can select more than one'
          disabled={loading}
          label='Choose a nationality'
          nothingFoundMessage='Nationality not found...'
          onChange={onChangeNationalities}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Input.Wrapper description='Search by first or last name' label='Search by user'>
          <Input
            disabled={loading}
            placeholder='Write something!'
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Input.Wrapper>
      </Grid.Col>
    </Grid>
  )
}
