import { IHashProvider } from '@shared/data/hash_provider_interface'

class FakeHashProvider implements IHashProvider {
  public async generateHash (payload: string): Promise<string> {
    await Promise.resolve()
    return payload
  }

  public async compareHash (payload: string, hashed: string): Promise<boolean> {
    await Promise.resolve()
    return payload === hashed
  }
}

export default FakeHashProvider
