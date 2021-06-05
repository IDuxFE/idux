<template>
  <header :class="classes">
    <ix-row>
      <ix-col xs="24" sm="24" md="6" lg="5" xl="4">
        <logo />
      </ix-col>
      <ix-col xs="0" sm="0" md="18" lg="19" xl="20" class="header-right">
        <search-box />
        <navigation />
        <github-button />
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
    const { page } = inject(appContextToken)!
    const classes = computed(() => {
      return {
        header: true,
        'home-header': !page.value,
      }
    })
    return { classes }
  },
})
</script>
