import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import IduxComponents from '@idux/components'
import App from './App.vue'

import './index.less'

import { routes } from './router'
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router).use(IduxComponents)

app.mount('#app')
