import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import IduxComponents from '@idux/components'
import App from './App.vue'
import CodeBox from './shared/CodeBox.vue'

import './index.less'

import { routes } from './router'
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router).use(IduxComponents)
app.component(CodeBox.name, CodeBox)

app.mount('#app')
