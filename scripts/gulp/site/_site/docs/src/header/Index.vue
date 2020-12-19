<template>
  <header class="site-header">
    <div style="width: 25%">
      <logo />
    </div>
    <div style="width: 75%" class="nav-wrapper">
      <navigation :language="language" :page="page" />
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
  components: { Logo, Navigation, GithubButton },
  props: {
    language: { type: String, required: true },
    page: { type: String, required: true },
  },
  emits: ['languageChange'],
  setup(_, { emit }) {
    const changeLanguage = (language: string) => emit('languageChange', language)

    return { changeLanguage }
  },
})
</script>
