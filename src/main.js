import Vue from 'vue'
import App from './App.vue'
import Epub from 'epubjs'

Vue.config.productionTip = false
global.ePub = Epub
Vue.use(Epub)

new Vue({
  render: h => h(App),
}).$mount('#app')
