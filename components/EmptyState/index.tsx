import { Button, Card, Container, Group, Image, Text } from '@mantine/core'

interface Props {
    onRefresh:()=>void
}

export const EmptyState = ({ onRefresh }:Props) => {
  return (
    <Container size='xs'>
      <Card withBorder padding='lg' radius='md' shadow='sm'>
        <Card.Section>
          <Image
            alt='Norway'
            height={160}
            src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png'
          />
        </Card.Section>

        <Group justify='space-between' mb='xs' mt='md'>
          <Text fw={500}>There is no results!</Text>
        </Group>

        <Text c='dimmed' size='sm'>
          We're sorry, but we couldn't find any results to show you. Keep trying!
        </Text>

        <Button fullWidth color='blue' mt='md' radius='md' onClick={onRefresh}>
          Try again!
        </Button>
      </Card>
    </Container>
  )
}
