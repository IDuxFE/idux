/* eslint-disable import/order */

import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import IduxInstall from './iduxInstall'
import App from './App.vue'

// eslint-disable-next-line import/no-unassigned-import
import './index.less'

// eslint-disable-next-line import/no-unresolved
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

// fix: vscode link policy
router.beforeEach(router => {
  const redirectedFrom = router.redirectedFrom
  if (
    redirectedFrom &&
    redirectedFrom.path.indexOf('%23') &&
    router.fullPath.replace('#', '%23') !== redirectedFrom.path
  ) {
    return redirectedFrom.fullPath.replace('%23', '#')
  }
})

createApp(App).use(router).use(IduxInstall).mount('#app')
