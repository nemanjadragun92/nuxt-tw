import { Middleware } from '@nuxt/types'
import { UserState } from '~/store/auth'

const loginMiddleware: Middleware = ({ store, redirect }) => {
  const { user } = store.state.auth as UserState
  // If user is logged in redirect him to (Protected page)
  if (user) {
    return redirect('/examples/middleware/protected')
  }
}

export default loginMiddleware
