import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  darkMode: false as boolean,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  TOGGLE_DARK_MODE(state: RootState) {
    state.darkMode = !state.darkMode
  },
}

export const actions: ActionTree<RootState, RootState> = {}
