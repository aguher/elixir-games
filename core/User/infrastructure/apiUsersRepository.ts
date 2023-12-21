import { IResults, UserRepository } from '../domain/UserRepository'
import { UserResponse } from '../domain/User'

import { apiServer } from '@/core/Shared/infrastructure/server/apiServer'

export const apiUserRepository: UserRepository = {
  findAll: ({ seed, results, nationalities }:IResults) => apiServer<IResults, UserResponse>().url(`/api?results=${results}&seed=${seed}&nat=${nationalities.join(',')}`).get()
}
