import { IJwtProvider } from '@shared/data/jwt_provider_interface'
import { v4 as uuidv4 } from 'uuid'

class FakeJwtProvider implements IJwtProvider {
  sign (subject: object): string {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWwuYmFja2VuZC5lbWl0dGUuY29tLmJyOjcwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjgwMDE3MzI1LCJleHAiOjE2ODAwMjQ1MjUsIm5iZiI6MTY4MDAxNzMyNSwianRpIjoiUUdtZVBLbXkxTWR0enV3WSIsInN1YiI6IntcImlkXCI6MSxcImVtcHJlc2FJZFwiOjEsXCJub21lVXN1YXJpb1wiOlwiRHIuIExhcmEgUm9zYSBTYW50aWFnb1wiLFwiZW1haWxcIjpcImVtaXNzb3JlbWl0dGVAZ21haWwuY29tXCJ9IiwicHJ2IjoiYTY2ODAyODM4MjIxYzFiZTAyMzViOTg5MDBjYWUzZWJhYmZiODFkZCJ9.jqHKVpOUlXzudLNiYABmStHIDmhyNC7izx-mfUR8bvQ'
  }

  verify<T> (token: string): T {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      id: uuidv4(),
      name: 'ok',
      email: 'ok'
    } as T
  }
}

export default FakeJwtProvider
