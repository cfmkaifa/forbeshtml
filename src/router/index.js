import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Layout from '../components/common/Home.vue'

export default new Router({
    routes:[
      {
        path: '/login',
        component: resolve => require(['../components/page/login.vue'], resolve)
      },
      {
        path: '/',
        component: resolve => require(['../components/page/login.vue'], resolve)
      },
      {
        path: '/404',
        component: resolve => require(['../components/page/404.vue'], resolve),
         meta: { title: '404' }
      }, 
      {
        path: '/403',
        component: resolve => require(['../components/page/403.vue'], resolve),
        meta: { title: '403' }
      }
    ]       
});
export const errors=[{
      path: '*',
      redirect: '/404'
  }];