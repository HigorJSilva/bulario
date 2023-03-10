import { Secret, sign } from 'jsonwebtoken'
import jwtConfig from '@config/jwt'
import { IJwtProvider } from '@shared/data/jwt_provider_interface'

class JwtProvider implements IJwtProvider {
  public sign (payload: object): string {
    return sign(payload, jwtConfig.jwt.secret as Secret, {
      expiresIn: jwtConfig.jwt.expiresIn
    })
  }
}

export default JwtProvider
