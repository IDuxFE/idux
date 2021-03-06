import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import IduxComponents from '@idux/components'
import GlobalComponents from './global'
import LayoutComponents from './layout'

import App from './App.vue'

import './index.less'

import { routes } from './router'
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router).use(IduxComponents).use(GlobalComponents).use(LayoutComponents)

app.mount('#app')
