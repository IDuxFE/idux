<template>
  <IxSpinProvider>
    <IxLoadingBarProvider>
      <IxDrawerProvider ref="drawerProviderRef">
        <IxModalProvider ref="modalProviderRef">
          <IxNotificationProvider ref="notificationProviderRef">
            <IxMessageProvider ref="messageProviderRef">
              <div class="root-wrapper">
                <LayoutHeader></LayoutHeader>
                <div v-if="page !== 'home'" class="main-wrapper">
                  <IxRow>
                    <IxCol xs="0" sm="7" md="6" lg="5" xl="4" class="main-menu">
                      <IxAffix v-if="!breakpoints.xs" style="width: unset">
                        <LayoutSider class="side-nav"></LayoutSider>
                      </IxAffix>
                      <IxDropdown v-else>
                        <IxIcon name="menu"></IxIcon>
                        <template #overlay>
                          <LayoutHeaderNavigation />
                        </template>
                      </IxDropdown>
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
                  <GlobalTheme @themeChange="onThemeChange" />
                </div>
                <template v-else>
                  <router-view></router-view>
                </template>
              </div>
              <div v-if="page !== 'home' && breakpoints.xs" class="root-drawer">
                <div class="root-drawer-handle" @click="isDrawerOpen = !isDrawerOpen">
                  <IxIcon name="menu-fold"></IxIcon>
                </div>
                <IxDrawer
                  v-model:visible="isDrawerOpen"
                  class="root-drawer"
                  :closable="false"
                  placement="start"
                  :width="200"
                >
                  <LayoutSider></LayoutSider>
                </IxDrawer>
              </div>
            </IxMessageProvider>
          </IxNotificationProvider>
        </IxModalProvider>
      </IxDrawerProvider>
    </IxLoadingBarProvider>
  </IxSpinProvider>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import { useSharedBreakpoints } from '@idux/cdk/breakpoint'
import { GlobalConfig, GlobalConfigKey, defaultConfig, seerConfig, useGlobalConfig } from '@idux/components/config'
import { DrawerProviderInstance } from '@idux/components/drawer'
import { MessageProviderInstance } from '@idux/components/message'
import { ModalProviderInstance } from '@idux/components/modal'
import { NotificationProviderInstance } from '@idux/components/notification'

import { AppContext, appContextToken } from './context'

const drawerProviderRef = ref<DrawerProviderInstance>()
const modalProviderRef = ref<ModalProviderInstance>()
const notificationProviderRef = ref<NotificationProviderInstance>()
const messageProviderRef = ref<MessageProviderInstance>()

const router = useRouter()
router.afterEach(() => {
  drawerProviderRef.value?.destroyAll()
  modalProviderRef.value?.destroyAll()
  notificationProviderRef.value?.destroyAll()
  messageProviderRef.value?.destroyAll()
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

const isDrawerOpen = ref(false)

const configChanges = {} as Record<GlobalConfigKey, (config: Partial<GlobalConfig[GlobalConfigKey]>) => void>
const compNames = Object.keys(defaultConfig) as GlobalConfigKey[]
compNames.forEach(compName => {
  const [, change] = useGlobalConfig(compName, {})
  configChanges[compName] = change
})

const onThemeChange = (theme: string) => {
  const config = theme === 'seer' ? seerConfig : defaultConfig
  const compNames = Object.keys(config) as GlobalConfigKey[]
  compNames.forEach(compName => {
    const currConfig = config[compName]
    const currChange = configChanges[compName]
    currChange(currConfig!)
  })
}
</script>
