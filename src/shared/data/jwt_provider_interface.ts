export interface IJwtProvider {
  sign (subject: object): string
}
