import Vue from 'vue'
import Router from 'vue-router'
import TaskDecomposition from '@/components/TaskDecomposition'
import TaskCompletion from '@/components/TaskCompletion'
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
      path: '/task-completion/:index',
      name: 'TaskCompletion',
      component: TaskCompletion
    },
    {
      path: '/vote/:purpose/:index',
      name: 'Vote',
      component: Vote
    },
    {
      path: '*',
      component: Error
    }
  ]
})
