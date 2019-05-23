import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/pages/Pos'

Vue.use(Router)

export default new Router({
  // mode:'history', //需要和后端很好的配合才好
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    }
  ]
})
