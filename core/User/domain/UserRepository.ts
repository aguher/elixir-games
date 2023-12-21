import { UserResponse } from './User'

export interface IResults {
    seed:string
    results:number
    nationalities:string[]
  }

export interface UserRepository {
    findAll: ({ seed, results, nationalities }:IResults) => Promise<UserResponse>,
}
