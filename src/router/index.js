import Vue from 'vue'
import Router from 'vue-router'
import TaskDecomposition from '@/components/TaskDecomposition'
import TaskCompletion from '@/components/TaskCompletion'
import TaskMergence from '@/components/TaskMergence'
import Vote from '@/components/Vote'
import Management from '@/components/Management'
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
      path: '/task-completion/:index(\\d+)',
      name: 'TaskCompletion',
      component: TaskCompletion
    },
    {
      path: '/task-mergence/',
      name: 'TaskMergence',
      component: TaskMergence
    },
    {
      path: '/vote/:purpose/:index(\\d+)',
      name: 'Vote',
      component: Vote
    },
    {
      path: '/vote/:purpose/',
      redirect: '/vote/:purpose/0'
    },
    {
      path: '/management',
      name: 'Management',
      component: Management
    },
    {
      path: '*',
      component: Error
    }
  ]
})
