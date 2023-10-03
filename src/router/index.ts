import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import Start from '../views/Start.vue'
import Lottery from '../views/Lottery.vue'
import Calendar from '../views/Calendar.vue'
import Zonk from '../views/Zonk.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/lottery',
    name: 'lottery',
    component: Lottery,
    props: (route: Route) => ({ timeout: Number.parseInt(route.query.timeout as string, 10) })
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/zonk',
    name: 'zonk',
    component: Zonk
  },
  {
    path: '/*',
    redirect: '/calendar'
  }
]

const router = new VueRouter({
  routes
})

export default router
