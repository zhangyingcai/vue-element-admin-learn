import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// import '@/styles/index.scss' // global css
import '@/styles/index.css'

import App from './App'
// import store from './store'
import router from './router'

//  为什么要加 * 
import * as filters from './filters/index'


import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI)

// import {
//   Pagination,
//   Dialog,
//   Input,
//   Table,
//   TableColumn,
//   Tabs,
//   TabPane,
//   Row,
//   Col,
//   Card,
//   Header,
//   Loading,
//   Message
// } from 'element-ui';

// Vue.use(Pagination);
// Vue.use(Dialog);
// Vue.use(Input);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Card);
// Vue.use(Header);
// Vue.use(Loading.directive);
// Vue.prototype.$message = Message;

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
