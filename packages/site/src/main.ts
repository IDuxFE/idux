/* eslint-disable import/order */

import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import IduxInstall from './iduxInstall'

// eslint-disable-next-line import/no-unassigned-import
import './index.less'

import { routes } from './router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, _, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
  routes,
})

createApp(App).use(router).use(IduxInstall).mount('#app')
