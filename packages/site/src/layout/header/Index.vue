<template>
  <header :class="classes">
    <ix-row class="header-row">
      <ix-col xs="22" sm="7" md="6" lg="5" xl="4">
        <logo />
      </ix-col>
      <ix-col xs="2" sm="17" md="18" lg="19" xl="20" class="header-right">
        <template v-if="isXs">
          <ix-dropdown icon="unordered-list">
            <template #overlay>
              <navigation />
            </template>
          </ix-dropdown>
        </template>
        <template v-else>
          <search-box />
          <navigation mode="horizontal" />
          <github-button v-if="!isXs && !isSm"></github-button>
        </template>
      </ix-col>
    </ix-row>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import Logo from './Logo.vue'
import SearchBox from './SearchBox.vue'
import Navigation from './Navigation.vue'
import GithubButton from './GithubButton.vue'
import { appContextToken } from '../../context'

export default defineComponent({
  components: { Logo, SearchBox, Navigation, GithubButton },
  setup() {
    const { page, screens } = inject(appContextToken)!
    const classes = computed(() => {
      return {
        header: true,
        'home-header': page.value === 'home',
      }
    })
    const isXs = computed(() => screens.value.xs)
    const isSm = computed(() => screens.value.sm)
    return { classes, isXs, isSm }
  },
})
</script>
