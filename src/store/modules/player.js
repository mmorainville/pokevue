import Vue from 'vue'

const state = () => ({
  pokemonList: [],
  pokeballs: [],
  state: {
    isInDialog: false
  }
})

const mutations = {
  updateState (state, payload) {
    if (payload.pokemonList) {
      Vue.set(state, 'pokemonList', payload.pokemonList)
    }

    if (payload.pokeballs) {
      Vue.set(state, 'pokeballs', payload.pokeballs)
    }

    if (payload.state) {
      Vue.set(state, 'state', payload.state)
    }
  },
  emptyState (state) {
    Vue.set(state, 'pokemonList', [])
    Vue.set(state, 'pokeballs', [])
    Vue.set(state, 'state', {
      isInDialog: false
    })
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
