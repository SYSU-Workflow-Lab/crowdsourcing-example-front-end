import Vue from 'vue'
import Router from 'vue-router'
import TaskDecomposition from '@/components/TaskDecomposition'
import Vote from '@/components/Vote'
import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/task-decomposition',
      name: 'TaskDecomposition',
      component: TaskDecomposition
    },
    {
      path: '/vote/:purpose',
      name: 'Vote',
      component: Vote
    },
    {
      path: '*',
      component: Error
    }
  ]
})
