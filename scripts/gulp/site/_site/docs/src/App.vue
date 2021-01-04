<template>
  <div class="site-root">
    <div class="page-wrapper">
      <site-header :language="language" :page="page" />
      <div class="main-wrapper">
        <div style="width: 20%">
          <site-side-nav :language="language" :page="page" :routerList="routerList" />
        </div>
        <div style="width: 80%">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalConfig } from '@idux/components'

import SiteHeader from './header/Index.vue'
import SiteSideNav from './side-nav/Index.vue'

import { routerList } from './router'

export default defineComponent({
  name: 'App',
  components: { SiteHeader, SiteSideNav },
  setup() {
    // 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
    const loadIconDynamically = (iconName: string) => {
      return fetch(`/icon-svg/${iconName}.svg`).then(res => res.text())
    }
    useGlobalConfig('icon', { loadIconDynamically })

    const language = ref('zh')

    const route = useRoute()
    const page = ref('docs')
    watchEffect(() => {
      const match = route.path.match(/\/(\w+)/)
      if (match && match[1]) {
        page.value = match[1]
      }
    })

    return { language, page, routerList }
  },
})
</script>
