export interface IJwtProvider {
  sign (subject: object): string
  verify <T>(token: string): T
}
