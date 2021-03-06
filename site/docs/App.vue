<template>
  <div class="site-root">
    <div class="page-wrapper">
      <layout-header :page="page" />
      <div class="main-wrapper">
        <div style="width: 15%">
          <layout-side-nav :page="page" />
        </div>
        <div style="width: 85%" class="main-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalConfig } from '@idux/components'

export default defineComponent({
  name: 'App',

  setup() {
    const language = ref('zh')
    provide('language', language)

    // 动态加载：不会被打包，可以减小包体积，需要加载的时候时候 http 请求加载
    const loadIconDynamically = (iconName: string) => {
      return fetch(`/icon-svg/${iconName}.svg`).then(res => res.text())
    }
    useGlobalConfig('icon', { loadIconDynamically })

    const route = useRoute()
    const page = ref('docs')
    watchEffect(() => {
      const match = route.path.match(/\/(\w+)/)
      if (match && match[1]) {
        page.value = match[1]
      }
    })

    return { page }
  },
})
</script>
