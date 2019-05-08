import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import personal from '../views/personal'
import ebook from '../views/ebook'
import ebookStore from '../views/ebookStore'
import myBookshelf from '../views/myBookshelf'
import userTheme from '../views/userTheme'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ebook',
      name: 'ebook',
      component: ebook,
      children: [
        {
          path: 'personal',
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
    },
  ]
})
