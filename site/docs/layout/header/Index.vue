<template>
  <header class="site-header">
    <div style="width: 25%">
      <logo />
    </div>
    <div style="width: 75%" class="nav-wrapper">
      <navigation :page="page" />
      <github-button />
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Logo from './Logo.vue'
import Navigation from './Navigation.vue'
import GithubButton from './GithubButton.vue'

export default defineComponent({
  name: 'LayoutHeader',
  components: { Logo, Navigation, GithubButton },
  props: {
    page: { type: String, required: true },
  },
})
</script>
