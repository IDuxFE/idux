<template>
  <header :class="classes">
    <IxRow class="header-row">
      <IxCol xs="22" sm="7" md="6" lg="5" xl="4">
        <LayoutHeaderLogo />
      </IxCol>
      <IxCol xs="2" sm="17" md="18" lg="19" xl="20" class="header-right">
        <template v-if="isXs">
          <IxDropdown>
            <IxIcon name="normal" />
            <template #overlay>
              <LayoutHeaderNavigation />
            </template>
          </IxDropdown>
        </template>
        <template v-else>
          <LayoutHeaderSearchBox />
          <LayoutHeaderNavigation mode="horizontal" />
          <LayoutHeaderGithubButton v-if="!isXs && !isSm && !isHome" />
        </template>
      </IxCol>
    </IxRow>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { appContextToken } from '../../../context'

export default defineComponent({
  setup() {
    const { page, breakpoints } = inject(appContextToken)!
    const isHome = computed(() => page.value === 'home')
    const classes = computed(() => {
      return {
        header: true,
        'home-header': isHome.value,
      }
    })
    const isXs = computed(() => breakpoints.xs)
    const isSm = computed(() => breakpoints.sm)
    return { classes, isHome, isXs, isSm }
  },
})
</script>
