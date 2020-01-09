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
            
})

export const errors=[{
      path: '*',
      redirect: '/404'
  }]
// export default new Router({
//     routes: [
//         {
//             path: '/login',
//             component: resolve => require(['../components/page/login.vue'], resolve)
//         },
//         {
//             path: '/',
//             redirect: '/login'                
//         },
//         {
//             path: '*',
//             redirect: '/404'
//         },
//         {
//             path: '/',
//             component: resolve => require(['../components/common/Home.vue'], resolve),
//             meta: { title: '用户管理', icon: 'el-icon-user' },
//             children: [
//               {
//                 path: '/merchants',
//                 component: resolve => require(['../components/page/merchantsList.vue'], resolve),
//                 meta: { title: '商家列表', icon: 'el-icon-tickets' }
//               },
//               {
//                 path: '/customer',
//                 component: resolve => require(['../components/page/customer.vue'], resolve),
//                 meta: { title: '客户列表', icon: 'el-icon-document-copy' }
//               },
//             ]
//         },
//         {
//             path: '/',
//             component: Layout,
//             meta: { title: '商品管理', icon: 'el-icon-user' },
//             children: [
//               {
//                 path: '/index',
//                 name: 'index',
//                 component: resolve => require(['../components/page/index.vue'], resolve),
//                 meta: { title: '商品管理', icon: 'el-icon-tickets' }
//               },
//             ]
//         },
//         {
//             path: '/',
//             component: Layout,
//             meta: { title: '订单管理', icon: 'el-icon-user' },
//             children: [
//                 {
//                     path: 'Order',
//                     name: 'Order',
//                     component: resolve => require(['../components/page/order.vue'], resolve),
//                     meta: { title: '订单管理', icon: 'el-icon-truck' }
//                   },
//             ]
//         },
//         {
//           path: '/',
//           component: Layout,
//           name: 'Examples3',
//           meta: { title: '分类管理', icon: 'el-icon-folder-opened' },
//           children: [
//             {
//               path: 'administration',
//               name: 'administration',
//               component: resolve => require(['../components/page/commodity/administration.vue'], resolve),
//               meta: { title: '商品分类', icon: 'el-icon-folder-opened' }
//             },
//             {
//               path: 'attribute',
//               name: 'attribute',
//               component: resolve => require(['../components/page/commodity/attribute.vue'], resolve),
//               meta: { title: '商品属性', icon: 'el-icon-folder-opened' }
//             },
//             {
//               path: 'specifications',
//               name: 'specifications',
//               component: resolve => require(['../components/page/commodity/specifications.vue'], resolve),
//               meta: { title: '商品规格', icon: 'el-icon-folder-opened' }
//             },
//           ]
//         },
//         {
//           path: '/',
//           component: Layout,
//           name: 'Examples4',
//           meta: { title: '消息中心', icon: 'el-icon-chat-dot-round' },
//           children: [
//             {
//               path: 'send',
//               name: 'send',
//               component: resolve => require(['../components/page/send'], resolve),
//               meta: { title: '发送消息', icon: 'el-icon-chat-square' }
//             },
//             {
//               path: 'classification',
//               name: 'classification',
//               component: resolve => require(['../components/page/classification'], resolve),
//               meta: { title: '新闻分类', icon: 'el-icon-postcard' }
//             },
//             {
//               path: 'Journalismcenter',
//               name: 'Journalismcenter',
//               component: resolve => require(['../components/page/Journalismcenter'], resolve),
//               meta: { title: '新闻中心', icon: 'el-icon-postcard' }
//             },
//             {
//               path: 'feedback',
//               name: 'feedback',
//               component: resolve => require(['../components/page/feedback'], resolve),
//               meta: { title: '意见反馈', icon: 'el-icon-message' }
//             },
//           ]
//         },
//         {
//             path: '/',
//             component: Layout,
//             name: 'Examples6',
//             meta: { title: '用户中心', icon: 'el-icon-lock' },
//             children: [
//               {
//                 path: 'user',
//                 name: 'user',
//                 component: resolve => require(['../components/page/user.vue'], resolve),
//                 meta: { title: '用户', icon: 'el-icon-lollipop' }
//               },
//               {
//                 path: 'role',
//                 name: 'role',
//                 component: resolve => require(['../components/page/role.vue'], resolve),
//                 meta: { title: '角色', icon: 'el-icon-lollipop'}
//               },
//               {
//                 path: 'permissions',
//                 name: 'permissions',
//                 component: resolve => require(['../components/page/permissions.vue'], resolve),
//                 meta: { title: '权限', icon: 'el-icon-lollipop'}
//               },
//             ]
//           },
//           {
//             path: '/',
//             component: Layout,
//             name: 'Examples5`',
//             meta: { title: '基础信息', icon: 'el-icon-document' },
//             children: [
//               {
//                 path: 'banner',
//                 name: 'banner',
//                 component: resolve => require(['../components/page/banner.vue'], resolve),
//                 meta: { title: '商品轮播', icon: 'el-icon-lollipop' }
//               },
//               {
//                 path: 'img',
//                 name: 'img',
//                 component: resolve => require(['../components/page/img.vue'], resolve),
//                 meta: { title: '其他图片', icon: 'el-icon-lollipop' }
//               },
//             ]
//           },
//           {
//             path: '/',
//             component: Layout,
//             name: 'Examples6`',
//             meta: { title: '页面管理', icon: 'el-icon-document' },
//             children: [
//               {
//                 path: 'navgrouping',
//                 name: 'navgrouping',
//                 component: resolve => require(['../components/page/html/nav.vue'], resolve),
//                 meta: { title: '导航分组管理', icon: 'el-icon-lollipop' }
//               },
//               {
//                 path: 'floor',
//                 name: 'floor',
//                 component: resolve => require(['../components/page/html/floor.vue'], resolve),
//                 meta: { title: '楼层管理', icon: 'el-icon-lollipop' }
//               },
//             ]
//           },
//     ]
// })