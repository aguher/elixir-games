import { fetchServer } from './fetchServer'
const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000/api'
export const apiServer = <Request, Response>() =>
  fetchServer<Request, Response>()
    .endpoint(() => {
      return apiEndpoint
    })
