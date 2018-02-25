import * as types from '../mutation-types'

const state = {
  currentPosition: {
    x: 0,
    y: 0
  }
}

const mutations = {
  [types.SET_CURRENT_POSITION] (state, payload) {
    state.currentPosition = {
      x: payload.x,
      y: payload.y
    }
  },
  [types.MOVE] (state, payload) {
    state.currentPosition = {
      x: payload.x,
      y: payload.y
    }
  }
}

export default {
  state,
  mutations
}
