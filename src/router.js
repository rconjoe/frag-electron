import { createRouter, createWebHistory, RouterView } from "vue-router"
import Home from './components/Home.vue'
import Server from './components/Server.vue'
import GameInstance from './components/GameInstance.vue'

const routerHistory = createWebHistory()

export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/server',
      component: Server,
      props: route => ({ host: router.query.h })
    },
    {
      path: '/instance',
      component: GameInstance,
      props: route => ({ instance: router.query.i })
    }
  ]
})