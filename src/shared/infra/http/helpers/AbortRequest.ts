const AbortController = globalThis.AbortController
const controller = new AbortController()

export default {
  getController () {
    return controller
  },
  getTimeout () {
    return setTimeout(() => {
      controller.abort()
    }, 75000)
  }
}
