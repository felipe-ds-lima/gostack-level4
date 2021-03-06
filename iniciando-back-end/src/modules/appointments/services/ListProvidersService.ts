import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      })

      await this.cacheProvider.save(`providers-list:${user_id}`, users)
    } else {
      users = users.map(user => {
        const userInstance = new User()

        Object.assign(userInstance, user)

        return userInstance
      })
    }

    return users
  }
}

export default ListProvidersService
