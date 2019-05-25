import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index'
import Pos from '@/components/pages/Pos'
import Goods from '@/components/pages/Goods'
import User from '@/components/pages/User'
import Help from '@/components/pages/Help'
import error from '@/components/common/error'

Vue.use(Router)

export default new Router({
  // mode:'history', //需要和后端很好的配合才好
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      alias:'/index',
      redirect:'/pos'
    },
    {
      path:'/pos',
      name:'Pos',
      component:Pos
    },
    {
      path:'/goods',
      name:'Goods',
      component:Goods
    },
    {
      path:'/user',
      name:'User',
      component:User
    },
    {
      path:'/help',
      name:'Help',
      component:Help
    },
    {
      path:'*',
      component:error
    }
  ]
})
