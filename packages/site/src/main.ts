import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createGlobalConfig } from '@idux/components/config'
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

// 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
const loadIconDynamically = (iconName: string) => {
  return fetch(`/icon-svg/${iconName}.svg`).then(res => res.text())
}

const globalConfig = createGlobalConfig({
  icon: { loadIconDynamically },
})

createApp(App).use(router).use(globalConfig).use(IduxCdk).use(IduxComponents).use(GlobalComponents).mount('#app')
