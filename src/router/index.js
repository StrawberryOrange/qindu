import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import personal from '../views/personal'
import none from '../views/none'
import ebookStore from '../views/ebookStore'
import myBookshelf from '../views/myBookshelf'
import userTheme from '../views/userTheme'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'none',
      component: none
    }, {
      path: '/personal',
      name: 'personal',
      component: personal,
      children: [
        {
          path: 'ebookStore',
          name: 'ebookStore',
          component: ebookStore
        },
        {
          path: 'myBookshelf',
          name: 'myBookshelf',
          component: myBookshelf
        },
        {
          path: 'userTheme',
          name: 'userTheme',
          component: userTheme
        }
      ]
    }
  ]
})
