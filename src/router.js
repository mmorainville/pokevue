import Vue from 'vue'
import Router from 'vue-router'
import Battle from './views/Battle'
import Game from './views/Game'
import Interface from './views/Interface'
import Pokedex from './components/interface/menu/Pokedex'
import Profile from './components/interface/menu/Profile'
import Inventory from './components/interface/menu/Inventory'
import Team from './components/interface/menu/Team'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Game,
      children: [
        {
          path: '',
          component: Interface,
          children: [
            {
              path: 'pokedex',
              name: 'pokedex',
              component: Pokedex
            },
            {
              path: 'profile',
              name: 'profile',
              component: Profile
            },
            {
              path: 'inventory',
              name: 'inventory',
              component: Inventory
            },
            {
              path: 'team',
              name: 'team',
              component: Team
            }
          ]
        },
        {
          path: 'battle',
          component: Battle
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
