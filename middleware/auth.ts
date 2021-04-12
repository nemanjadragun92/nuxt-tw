import { Middleware } from '@nuxt/types'
import { UserState } from '~/store/auth'

const authMiddleware: Middleware = ({ store, redirect }) => {
  const { user } = store.state.auth as UserState
  // If user is not logged in redirect him to (Login page)
  if (!user) {
    return redirect('/examples/middleware')
  }
}

export default authMiddleware
