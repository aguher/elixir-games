import { apiUserRepository } from '../infrastructure/apiUsersRepository'

export const UserService = {
  findAll: apiUserRepository.findAll

}
