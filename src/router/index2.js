import Vue from 'vue'
import VueRouter  from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false })

Vue.use(VueRouter)

const constantRoutes = [
  // token,
  {
    path: '/',
    component: () => import('@/views/token/index')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/accountinfo/:address',
    component: () => import('@/views/token/accountinfo'),
    props: true
  },
  {
    path: '/txinfo',
    component: () => import('@/views/token/txinfo'),
    props: (router) => ({
      hash: router.query.hash,
      id: router.query.id
    })
  }
]

const createRouter = () => new VueRouter({
  mode: 'hash', // 默认 Hash
  scrollBehavior: (to, from, savedPosition)=>{
    if (savedPosition) {
      return savedPosition
    } else {
      return { x:0, y:0 }
    }
  },
  // 切换到新路由时，想要滚动到顶部，或者是保持原先的滚动位置，就像重新加载页面那样
  // 只有在 history.pushState 的浏览器中可用
  routes: constantRoutes
})

const router = createRouter()
router.beforeEach(async(to, from, next)=>{
  NProgress.start()
  next()
})
router.afterEach(async()=>{
  NProgress.done()
})

export default router