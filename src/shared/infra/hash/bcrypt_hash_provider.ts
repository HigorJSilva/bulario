import { IHashProvider } from '@shared/data/hash_provider_interface'
import { compare, hash } from 'bcrypt'

class BcryptHashProvider implements IHashProvider {
  public async generateHash (payload: string): Promise<string> {
    return await hash(payload, 8)
  }

  public async compareHash (payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed)
  }
}

export default BcryptHashProvider
