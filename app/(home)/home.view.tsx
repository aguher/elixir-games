'use client'

import { Dispatch, SetStateAction } from 'react'

import { Welcome } from '../../components/Welcome/Welcome'

import { TableUsers } from '@/components/TableUsers'
import { EmptyState } from '@/components/EmptyState'
import { Filters } from '@/components/Filters'
import { User } from '@/core/User/domain/User'

interface Props {
  isLoading:boolean
  nationalities:string[]
  setName:Dispatch<SetStateAction<string>>
  filterResults: User[],
  onSelectUser:(user:User)=>void
  refetch:()=>void
  setNationalities:(nationalities:string[]) => void
}

export const HomeView = ({ isLoading, nationalities, setName, filterResults, onSelectUser, refetch, setNationalities }:Props) => {
  return (
    <>
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
