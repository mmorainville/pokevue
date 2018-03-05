import Vue from 'vue'
import Router from 'vue-router'
import World from './views/World.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'world',
      component: World
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
