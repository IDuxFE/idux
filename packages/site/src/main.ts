/* eslint-disable import/order */

import { computed, createApp, h, provide, ref } from 'vue'
import { IxThemeProvider } from '@idux/components/theme'
import { useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { useTheme } from '@idux/cdk/theme'

import { AppContext, AppTheme, appContextToken } from './context'

import { createRouter, createWebHistory, useRoute } from 'vue-router'
import IduxInstall from './iduxInstall'
import App from './App.vue'

// eslint-disable-next-line import/no-unassigned-import
import './index.less'

// eslint-disable-next-line import/no-unresolved
import { routes } from './router'

const router = createRouter({
  history: createWebHistory(__BASE_URL__),
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
router.beforeEach(route => {
  const redirectedFrom = route.redirectedFrom
  if (
    redirectedFrom &&
    redirectedFrom.path.indexOf('%23') &&
    route.fullPath.replace('#', '%23') !== redirectedFrom.path
  ) {
    return redirectedFrom.fullPath.replace('%23', '#')
  }

  return
})

createApp({
  setup() {
    const route = useRoute()

    const path = computed(() => route.path)
    const page = computed(() => {
      const match = route.path.match(/\/(\w+)/)
      return match?.[1] ?? 'home'
    })

    const breakpoints = useSharedBreakpoints()
    const themeKey = 'idux_theme'
    const { theme, changeTheme } = useTheme<AppTheme>({
      defaultTheme: (localStorage.getItem(themeKey) || 'default') as AppTheme,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const configChanges = {} as Record<GlobalConfigKey, (config: Partial<GlobalConfig[GlobalConfigKey]>) => void>
    // const compNames = Object.keys(defaultConfig) as GlobalConfigKey[]
    // compNames.forEach(compName => {
    //   const [, change] = useGlobalConfig(compName, {})
    //   configChanges[compName] = change
    // })

    const setTheme = (theme: AppTheme) => {
      changeTheme(theme)
      localStorage.setItem(themeKey, theme)
    }

    const appContext: AppContext = {
      org: 'IDuxFE',
      repo: 'components',
      lang: ref('zh'),
      path,
      page,
      breakpoints,
      theme,
      setTheme,
    }

    provide(appContextToken, appContext)

    return () => h(IxThemeProvider, { presetTheme: theme.value }, () => h(App))
  },
})
  .use(router)
  .use(IduxInstall)
  .mount('#app')
