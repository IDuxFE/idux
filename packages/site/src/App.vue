<template>
  <IxModalProvider ref="modalProviderRef">
    <IxMessageProvider>
      <div class="root-wrapper">
        <LayoutHeader></LayoutHeader>
        <div v-if="page !== 'home'" class="main-wrapper">
          <IxRow>
            <IxCol xs="0" sm="7" md="6" lg="5" xl="4" class="main-menu">
              <IxAffix>
                <LayoutSider></LayoutSider>
              </IxAffix>
            </IxCol>
            <IxCol xs="24" sm="17" md="18" lg="19" xl="20" class="main-content">
              <router-view></router-view>
            </IxCol>
            <IxCol
              xs="24"
              :sm="{ span: 17, offset: 7 }"
              :md="{ span: 18, offset: 6 }"
              :lg="{ span: 19, offset: 5 }"
              :xl="{ span: 20, offset: 4 }"
            >
              <LayoutFooter></LayoutFooter>
            </IxCol>
          </IxRow>
        </div>
        <template v-else>
          <router-view></router-view>
          <LayoutFooter></LayoutFooter>
        </template>
      </div>
    </IxMessageProvider>
  </IxModalProvider>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScreens } from '@idux/cdk/breakpoint'
import { ModalProviderInstance } from '@idux/components/modal'
import { appContextToken, AppContext } from './context'

export default defineComponent({
  name: 'App',
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
