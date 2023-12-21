/* eslint-disable no-undef */

import { DetailView } from '.'

import { render, screen } from '@/test-utils'

const mockUser = {
  gender: 'male',
  name: {
    title: 'Monsieur',
    first: 'Frank',
    last: 'Leroux'
  },
  location: {
    street: {
      number: 7271,
      name: "Rue de L'Abbé-Roger-Derry"
    },
    city: 'Aeugst am Albis',
    state: 'Zug',
    country: 'Switzerland',
    postcode: 4294,
    coordinates: {
      latitude: '-61.0695',
      longitude: '-63.9493'
    },
    timezone: {
      offset: '+2:00',
      description: 'Kaliningrad, South Africa'
    }
  },
  email: 'frank.leroux@example.com',
  login: {
    uuid: '598b90fc-e791-4e3d-98e7-a42f59be1241',
    username: 'whitekoala694',
    password: 'load',
    salt: '4CKg3o3t',
    md5: '1fe22eca26befae128461e3ee88922ac',
    sha1: 'c3b989644552ed9cbde11bb18329a4d7fa52321d',
    sha256: '6ee189561d8d1b761b1fd5762512c2e2868db5f0daf9b7d9443311404901ef5b'
  },
  dob: {
    date: '1961-07-30T23:23:45.736Z',
    age: 62
  },
  registered: {
    date: '2005-06-18T17:43:27.691Z',
    age: 18
  },
  phone: '077 780 12 03',
  cell: '079 009 92 95',
  id: {
    name: 'AVS',
    value: '756.1881.2306.64'
  },
  picture: {
    large: 'https://randomuser.me/api/portraits/men/94.jpg',
    medium: 'https://randomuser.me/api/portraits/med/men/94.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/94.jpg'
  },
  nat: 'CH'
}

describe('Detail view component', () => {
  it('has correct Fullname', () => {
    render(<DetailView user={mockUser} />)
    expect(screen.getByText('Full name')).toBeInTheDocument()
    expect(screen.getByText('Monsieur Frank Leroux')).toBeInTheDocument()
  })
  it('has correct Email', () => {
    render(<DetailView user={mockUser} />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('frank.leroux@example.com')).toBeInTheDocument()
  })
  it('has correct Phone', () => {
    render(<DetailView user={mockUser} />)
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('077 780 12 03')).toBeInTheDocument()
  })
  it('has correct Nationality', () => {
    render(<DetailView user={mockUser} />)
    expect(screen.getByText('Nationality')).toBeInTheDocument()
    expect(screen.getByText('CH')).toBeInTheDocument()
  })
  it('has correct Location', () => {
    render(<DetailView user={mockUser} />)
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText("Rue de L'Abbé-Roger-Derry, 7271 - 4294 (Zug-Switzerland)")).toBeInTheDocument()
  })
})
