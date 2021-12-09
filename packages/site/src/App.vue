<template>
  <IxDrawerProvider ref="drawerProviderRef">
    <IxModalProvider ref="modalProviderRef">
      <IxNotificationProvider>
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
      </IxNotificationProvider>
    </IxModalProvider>
  </IxDrawerProvider>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { DrawerProviderInstance } from '@idux/components/drawer'
import { ModalProviderInstance } from '@idux/components/modal'

import { AppContext, appContextToken } from './context'

const drawerProviderRef = ref<DrawerProviderInstance>()
const modalProviderRef = ref<ModalProviderInstance>()

const router = useRouter()
router.afterEach(() => {
  drawerProviderRef.value?.destroyAll()
  modalProviderRef.value?.destroyAll()
})

const route = useRoute()
const path = computed(() => route.path)
const page = computed(() => {
  const match = route.path.match(/\/(\w+)/)
  return match?.[1] ?? 'home'
})

const breakpoints = useSharedBreakpoints()

const appContext: AppContext = {
  org: 'IDuxFE',
  repo: 'components',
  lang: ref('zh'),
  path,
  page,
  breakpoints,
}

provide(appContextToken, appContext)
</script>
