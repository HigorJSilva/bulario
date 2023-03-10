import { Secret, sign, verify } from 'jsonwebtoken'
import jwtConfig from '@config/jwt'
import { IJwtProvider } from '@shared/data/jwt_provider_interface'

class JwtProvider implements IJwtProvider {
  public verify<T> (token: string): T {
    return verify(token, jwtConfig.jwt.secret as Secret) as T
  }

  public sign (payload: object): string {
    return sign(payload, jwtConfig.jwt.secret as Secret, {
      expiresIn: jwtConfig.jwt.expiresIn
    })
  }
}

export default JwtProvider
