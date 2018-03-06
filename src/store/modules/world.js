import * as types from '../mutation-types'

let grid = [
]

let obstacles = [
  {x: 61, y: 198},
  {x: 61, y: 199}
]

// Build the grid
for (let j = 0; j < 330; j++) {
  grid.push(
    []
  )
  for (let i = 0; i < 178; i++) {
    grid[j].push(
      {
        x: i,
        y: j
      }
    )

    obstacles.forEach((obstacle) => {
      if (obstacle.x === i && obstacle.y === j) {
        grid[j][i].type = 'obstacle'
      }
    })
  }
}

console.log(grid)

const state = {
  grid: grid
}

const mutations = {
  [types.SET_CURRENT_POSITION] (state, payload) {
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
