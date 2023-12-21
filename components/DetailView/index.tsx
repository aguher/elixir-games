import { Grid, Image, Text } from '@mantine/core'

import { User } from '@/core/User/domain/User'

interface Props {
    user:User
}

export const DetailView = ({ user }:Props) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Image
          alt={`Picture of ${user.name.first}`}
          fit='contain' h={128} radius='md' src={user.picture.large}
          w='auto'
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Text
          fw={900}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size='xl'
          variant='gradient'
        >
          Full name
        </Text>
        <Text>{user.name.title} {user.name.first} {user.name.last}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Text
          fw={900}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size='xl'
          variant='gradient'
        >
          Email
        </Text>
        <Text>{user.email}</Text>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <Text
          fw={900}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size='xl'
          variant='gradient'
        >
          Phone
        </Text>
        <Text>{user.phone}</Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Text
          fw={900}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size='xl'
          variant='gradient'
        >
          Nationality
        </Text>
        <Text>{user.nat}</Text>
      </Grid.Col>
      <Grid.Col span={12}>
        <Text
          fw={900}
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          size='xl'
          variant='gradient'
        >
          Location
        </Text>
        <Text>{user.location.street.name}, {user.location.street.number} - {user.location.postcode} ({user.location.state}-{user.location.country})</Text>
      </Grid.Col>
    </Grid>
  )
}
