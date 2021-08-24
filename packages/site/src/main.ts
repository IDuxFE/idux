import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import IduxCdk from './iduxCdk'
import IduxComponents from './iduxComponents'
import GlobalComponents from './components/global'

import App from './App.vue'

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

createApp(App).use(router).use(IduxCdk).use(IduxComponents).use(GlobalComponents).mount('#app')
