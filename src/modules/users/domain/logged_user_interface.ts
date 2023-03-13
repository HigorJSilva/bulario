export interface ILoggedUser {

  user: {
    id: string
    name: string
    email: string
  }
  token: string
}
