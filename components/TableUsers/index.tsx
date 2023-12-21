import { Button, Flex, Loader, Table } from '@mantine/core'
import { IconEyeSearch } from '@tabler/icons-react'

import classes from './TableUsers.module.css'

import { User } from '@/core/User/domain/User'

interface Props {
  loading:boolean
  elements:User[]
  onSelectUser:(user:User) =>void
}
export const TableUsers = ({ loading, elements, onSelectUser }:Props) => {
  const rows = elements.map((element:User, position) => (
    <Table.Tr key={element.id.value || position}>
      <Table.Td>{element.name.first} {element.name.last}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.login.username}</Table.Td>
      <Table.Td>{element.location.city}</Table.Td>
      <Table.Td>{element.nat}</Table.Td>
      <Table.Td><Button size='xs' variant='light' onClick={() => onSelectUser(element)}><IconEyeSearch /></Button></Table.Td>
    </Table.Tr>
  ))

  return (
    loading ? <Flex justify='center' m='xl'><Loader /></Flex> : (
      <Table.ScrollContainer className={classes.table} h='50vh' minWidth={500}>
        <Table highlightOnHover stickyHeader striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Full name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>City</Table.Th>
              <Table.Th>Nationality</Table.Th>
              <Table.Th>Options </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>

        </Table>
      </Table.ScrollContainer>
    )
  )
}
