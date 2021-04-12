import { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface UserInterface {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export const state = () => ({
  user: null as UserInterface | null,
})

export type UserState = ReturnType<typeof state>

export const getters: GetterTree<UserState, UserState> = {}

export const mutations: MutationTree<UserState> = {
  SET_USER(state: UserState, payload: UserInterface) {
    state.user = payload
    if (state.user) {
      // @ts-ignore
      this.$cookies.set('user', state.user.id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    } else {
      // @ts-ignore
      this.$cookies.remove('user')
    }
  },
}

export const actions: ActionTree<UserState, UserState> = {}
