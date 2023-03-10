import env from './env'

export default {
  jwt: {
    secret: env.appSecret,
    expiresIn: '1d'
  }
}
