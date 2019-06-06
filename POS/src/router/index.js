import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/pages/Pos'
import Goods from '@/components/pages/Goods'
import Index from '@/components/pages/Index'
import Help from '@/components/pages/Help'
import error from '@/components/common/error'
import Login from '@/components/common/login'

Vue.use(Router)

export default new Router({
  // mode:'history', //需要和后端很好的配合才好
  routes: [
    {
      path:'/',
      component:Index,
      name:'Index',
      alias:'/index'
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
      name:'Login',
      component:Login
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
