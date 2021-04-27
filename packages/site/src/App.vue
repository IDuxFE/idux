<template>
  <div class="root-wrapper">
    <layout-header />
    <div class="main-wrapper">
      <ix-row>
        <ix-col xs="24" sm="24" md="6" lg="5" xl="4" class="main-menu">
          <layout-side-nav />
        </ix-col>
        <ix-col xs="0" sm="0" md="18" lg="19" xl="20" class="main-content">
          <router-view></router-view>
        </ix-col>
      </ix-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalConfig } from '@idux/components/config'
import { appContextToken, AppContext } from './context'
import LayoutHeader from './layout/header/Index.vue'
import LayoutSideNav from './layout/SideNav.vue'

export default defineComponent({
  name: 'App',
  components: { LayoutHeader, LayoutSideNav },
  setup() {
    const appContext: AppContext = {
      org: 'IduxFE',
      repo: 'components',
      lang: ref('zh'),
      path: ref(''),
      page: ref(''),
    }

    const route = useRoute()
    watchEffect(() => {
      appContext.path.value = route.path

      const match = route.path.match(/\/(\w+)/)
      if (match && match[1]) {
        appContext.page.value = match[1]
      }
    })

    provide(appContextToken, appContext)

    // 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
    const loadIconDynamically = (iconName: string) => {
      return fetch(`/icon-svg/${iconName}.svg`).then(res => res.text())
    }

    useGlobalConfig('icon', { loadIconDynamically })
  },
})
</script>
