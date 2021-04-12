import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Context } from '@nuxt/types'

export const state = () => ({
  darkMode: false as boolean,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  TOGGLE_DARK_MODE(state: RootState) {
    state.darkMode = !state.darkMode
    if (state.darkMode) {
      // @ts-ignore
      this.$cookies.set('darkMode', state.darkMode.toString(), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    } else {
      // @ts-ignore
      this.$cookies.remove('darkMode')
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit(store, ctx: Context) {
    // On page init check if we stored darkMode if so apply dark mode on init
    const darkMode = this.$cookies.get('darkMode')
    if (darkMode) {
      await store.commit('TOGGLE_DARK_MODE')
    }
    // Check if user is logged it (user_id represents jwtToken)
    const userId = this.$cookies.get('user_id')
    if (userId) {
      const userData = await ctx.$content(`users/${userId}`).fetch<any>()
      if (userData) {
        await store.commit('auth/SET_USER', userData)
      } else {
        await store.commit('auth/LOGOUT')
      }
    }
  },
}
