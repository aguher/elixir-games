import { Title, Text } from '@mantine/core'

import classes from './Welcome.module.css'

export function Welcome() {
  return (
    <div>
      <Title className={classes.title} mb={25} mt={25} ta='center'>
        Welcome to{' '}
        <Text inherit component='span' gradient={{ from: 'pink', to: 'yellow' }} variant='gradient'>
          Elixir
        </Text>
      </Title>

    </div>
  )
}
