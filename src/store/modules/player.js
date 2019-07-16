import Vue from 'vue'

const state = () => ({
  pokemonList: [],
  pokeballs: []
})

const mutations = {
  updateState (state, payload) {
    if (payload.pokemonList) {
      Vue.set(state, 'pokemonList', payload.pokemonList)
    }

    if (payload.pokeballs) {
      Vue.set(state, 'pokeballs', payload.pokeballs)
    }
  },
  emptyState (state) {
    Vue.set(state, 'pokemonList', [])
    Vue.set(state, 'pokeballs', [])
  }
}

const getters = {
  pokemonList: state => {
    return state.pokemonList
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
