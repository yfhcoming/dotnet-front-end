import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Test from "@/views/newView/Test";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统首页', icon: 'dashboard' }
    }]
  },
  /*{
    path: '/user',
    component: Layout,
    redirect: '/user/user-manage',
    name: 'user',
    meta: {
      title: 'user',
      icon: 'user'
    },
    children: [
      {
        path: 'user-manage',
        component: ()=>import('@/views/user/user-manage'),
        name: 'user-manage',
        meta: { title: '用户管理',icon: 'tree' }
      },
      {
        path: 'tea-list',
        hidden:true,
        component:()=>import('@/views/class/tea-list'),
        name: 'tea-list',
        meta: { title: '教师列表',icon: 'form' }
      },
      {
        path: 'stu-list',
        hidden:true,
        component:()=>import('@/views/class/stu-list'),
        name: 'stu-list',
        meta: { title: '学生列表',icon: 'form' }
      },
    ]
  },*/
  /*{
    path: '/class',
    component: Layout,
    redirect: '/class/class-manage',
    name: 'class',
    meta: {
      title: 'class',
      icon: 'class'
    },
    children: [
      {
        path: 'class-manage',
        component: ()=>import('@/views/class/class-manage'),
        name: 'class-manage',
        meta: { title: '课程管理',icon: 'el-icon-s-help' }
      },
      {
        path: 'class-tea-list',
        hidden:true,
        component:()=>import('@/views/class/class-tea-list'),
        name: 'class-tea-list',
        meta: { title: '课程教师列表',icon: 'tree' }
      },
      {
        path: 'class-stu-list',
        hidden:true,
        component:()=>import('@/views/class/class-stu-list'),
        name: 'class-stu-list',
        meta: { title: '课程学生列表',icon: 'table' }
      },

    ]
  },*/

  {
    path: '/base',
    component: Layout,
    redirect: '/base/class-manage',
    name: 'base',
    meta: {
      title: 'base',
      icon: 'base'
    },
    children: [
      {
        path: 'kbasbase',
        component: ()=>import('@/views/base/kbasbase'),
        name: 'kbasbase',
        meta: { title: '知识库',icon: 'tree' }
      },
    ]
  },

  {
    path: '/commu',
    component: Layout,
    redirect: '/commu/class-manage',
    name: 'commu',
    meta: {
      title: 'commu',
      icon: 'commu'
    },
    children: [
      {
        path: 'post',
        component: ()=>import('@/views/base/post'),
        name: 'post',
        meta: { title: '社区交流',icon: 'el-icon-s-help' }
      },
    ]
  },


  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/yfhcoming/SE-Manage-backend',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
