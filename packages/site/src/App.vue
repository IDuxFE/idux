<template>
  <div class="root-wrapper">
    <layout-header />
    <div v-if="!!page" class="main-wrapper">
      <ix-row>
        <ix-col xs="0" sm="8" md="6" lg="5" xl="4" class="main-menu">
          <layout-side-nav />
        </ix-col>
        <ix-col xs="24" sm="16" md="18" lg="19" xl="20" class="main-content">
          <router-view></router-view>
        </ix-col>
      </ix-row>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { appContextToken, AppContext } from './context'
import LayoutHeader from './layout/header/Index.vue'
import LayoutSideNav from './layout/SideNav.vue'

export default defineComponent({
  name: 'App',
  components: { LayoutHeader, LayoutSideNav },
  setup() {
    const route = useRoute()
    const path = computed(() => route.path)
    const page = computed(() => {
      const match = route.path.match(/\/(\w+)/)
      return (match && match[1]) ?? ''
    })

    const appContext: AppContext = {
      org: 'IduxFE',
      repo: 'components',
      lang: ref('zh'),
      path,
      page,
    }

    provide(appContextToken, appContext)

    return { page }
  },
})
</script>
