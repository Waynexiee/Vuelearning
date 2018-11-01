import Vue from 'vue'
import Router from 'vue-router'
import TodoSec from './components/TodoSection'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:completed',
      name: 'Todos',
      component: TodoSec
    },
  ]
})
