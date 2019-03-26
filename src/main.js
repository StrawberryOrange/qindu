import Vue from 'vue'
import App from './App.vue'
import Epub from 'epubjs'
import router from './router'

Vue.config.productionTip = false
global.ePub = Epub
Vue.use(Epub)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
