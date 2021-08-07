<template>
  <ix-modal-provider ref="modalProviderRef">
    <ix-message-provider>
      <div class="root-wrapper">
        <layout-header></layout-header>
        <div v-if="page !== 'home'" class="main-wrapper">
          <ix-row>
            <ix-col xs="0" sm="7" md="6" lg="5" xl="4" class="main-menu">
              <ix-affix>
                <layout-side-nav></layout-side-nav>
              </ix-affix>
            </ix-col>
            <ix-col xs="24" sm="17" md="18" lg="19" xl="20" class="main-content">
              <router-view></router-view>
            </ix-col>
            <ix-col
              xs="24"
              :sm="{ span: 17, offset: 7 }"
              :md="{ span: 18, offset: 6 }"
              :lg="{ span: 19, offset: 5 }"
              :xl="{ span: 20, offset: 4 }"
            >
              <layout-footer></layout-footer>
            </ix-col>
          </ix-row>
        </div>
        <template v-else>
          <router-view></router-view>
          <layout-footer></layout-footer>
        </template>
      </div>
    </ix-message-provider>
  </ix-modal-provider>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreens } from '@idux/cdk/breakpoint'
import { ModalProviderInstance } from '@idux/components/modal'
import { appContextToken, AppContext } from './context'
import LayoutHeader from './components/layout/header/Index.vue'
import LayoutSideNav from './components/layout/SideNav.vue'
import LayoutFooter from './components/layout/footer/Index.vue'

export default defineComponent({
  name: 'App',
  components: { LayoutHeader, LayoutSideNav, LayoutFooter },
  setup() {
    const modalProviderRef = ref<ModalProviderInstance>()
    const router = useRouter()
    router.afterEach(() => modalProviderRef.value?.destroyAll())

    const route = useRoute()
    const path = computed(() => route.path)
    const page = computed(() => {
      const match = route.path.match(/\/(\w+)/)
      return match?.[1] ?? 'home'
    })

    const screens = useScreens()

    const appContext: AppContext = {
      org: 'IDuxFE',
      repo: 'components',
      lang: ref('zh'),
      path,
      page,
      screens,
    }

    provide(appContextToken, appContext)

    return { page, modalProviderRef }
  },
})
</script>
