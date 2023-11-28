<template>
  <IxSpinProvider>
    <IxLoadingBarProvider>
      <IxDrawerProvider ref="drawerProviderRef">
        <IxModalProvider ref="modalProviderRef">
          <IxNotificationProvider ref="notificationProviderRef">
            <IxMessageProvider ref="messageProviderRef">
              <div :class="['root-wrapper', globalHashId]">
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
                  <GlobalSetting />
                </div>
                <template v-else>
                  <router-view></router-view>
                </template>
              </div>
              <div v-if="page !== 'home' && breakpoints.xs" :class="['root-drawer', globalHashId]">
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
import { inject, ref } from 'vue'

import { useRouter } from 'vue-router'

// import { GlobalConfig, GlobalConfigKey, defaultConfig, useGlobalConfig } from '@idux/components/config'
import { DrawerProviderInstance } from '@idux/components/drawer'
import { MessageProviderInstance } from '@idux/components/message'
import { ModalProviderInstance } from '@idux/components/modal'
import { NotificationProviderInstance } from '@idux/components/notification'
import { useThemeToken } from '@idux/components/theme'

const { globalHashId } = useThemeToken()

import { appContextToken } from './context'

const { breakpoints, page } = inject(appContextToken)!

const isDrawerOpen = ref(false)

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
</script>
