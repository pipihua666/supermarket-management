import router from './index'
import {getCookie} from '@/utils/cookie';

router.beforeEach((to,form,next)=>{
    if(getCookie()){
        next('/index');
    }else{
        if(to.path='/login'){
            next();
        }else{
            next('/login');
        }
    }
})


