'use client'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Modal } from '@mantine/core'

import { Welcome } from '../components/Welcome/Welcome'

import { UserService } from '@/core/User/services/usersService'
import useQueryService from '@/hooks/useService'
import { TableUsers } from '@/components/TableUsers'
import { EmptyState } from '@/components/EmptyState'
import { Filters } from '@/components/Filters'
import { User } from '@/core/User/domain/User'
import { includeWord } from '@/core/Shared/infrastructure/utils'
import { DetailView } from '@/components/DetailView'

export default function HomePage() {
  const [opened, { open, close }] = useDisclosure(false)

  const [filterResults, setFilterResults] = useState<User[]>([])
  const [nationalities, setNationalities] = useState<string[]>([])
  const [userSelected, setUserSelected] = useState<User>()
  const [name, setName] = useState('')

  const { data, refetch, isLoading } = useQueryService('list-users', [nationalities], (variables) => {
    const nationalities = variables.queryKey[1]
    return UserService.findAll({ seed: 'challenge-agus', results: 50, nationalities })
  })

  useEffect(() => {
    let filtered = data?.results || []
    if (name === '' && data && data.results) {
      setFilterResults(filtered)
    } else {
      if (name.split(' ').length === 1) {
        filtered = data?.results.filter(value => includeWord(value.name.first.toLowerCase(), name.split(' ')) || includeWord(value.name.last.toLowerCase(), name.split(' '))) || []
      } else {
        filtered = data?.results.filter(value => includeWord(value.name.first.toLowerCase(), name.split(' ')) && includeWord(value.name.last.toLowerCase(), name.split(' '))) || []
      }

      setFilterResults(filtered || [])
    }
  }, [name, data])

  const onSelectUser = (user:User) => {
    open()
    setUserSelected(user)
  }

  return (
    <>
      <Modal centered opened={opened} size='lg' title='User information' onClose={close}>
        {userSelected && <DetailView user={userSelected} />}
      </Modal>

      <Welcome />
      <Filters
        loading={isLoading}
        selectedNationalities={nationalities}
        onChangeName={setName}
        onChangeNationalities={(nationalities) => setNationalities(nationalities)}
      />
      {(!isLoading && filterResults.length === 0) || (!isLoading && !filterResults) ? <EmptyState onRefresh={refetch} />
        : <TableUsers elements={filterResults || []} loading={isLoading} onSelectUser={(user) => onSelectUser(user)} />}

    </>
  )
}
