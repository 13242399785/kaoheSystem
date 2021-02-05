// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import '../static/iconfont/iconfont.css'
import './js/drag'
import api from './api/article'
import Axios from 'axios'
// require('es6-promise').polyfill();
// require('es6-promise/auto');

Vue.prototype.$api=api;
Vue.prototype.$axios = Axios


window.router=router
Vue.config.productionTip = false

// import {Message,Dialog,Pagination,Input,Radio,Checkbox,Tree,Button,Select,Option,Upload,CheckboxGroup,Tabs,TabPane} from 'element-ui'
// Vue.prototype.$message = Message;
// Vue.use(Dialog);
// Vue.use(Pagination);
// Vue.use(Input);
// Vue.use(Radio);
// Vue.use(Checkbox);
// Vue.use(Button);
// Vue.use(Tree);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Upload);
// Vue.use(CheckboxGroup);
// Vue.use(Tabs);
// Vue.use(TabPane);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {

//   if(to.name=='linkqr'){
//     return false;
//   }else if(to.meta=='rolve'&&localStorage.getItem("usertype")=='普通用户'){
//     alert('很抱歉您目前没有管理权限!')
//     next('login');
//     return false;
//   }else{
//     next();
//   }
//   next();
// })