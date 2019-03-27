import Vue from 'vue'
// import './cube-ui'
import App from './App.vue'
import Epub from 'epubjs'
import router from './router'
// import cubeui from 'cube-ui'
// import stylus from 'stylus'
// import stylusLoader from 'stylus-loader' 

Vue.config.productionTip = false
global.ePub = Epub
Vue.use(Epub)
// Vue.use(cubeui)
// Vue.use(stylus)
// Vue.use(stylusLoader)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
