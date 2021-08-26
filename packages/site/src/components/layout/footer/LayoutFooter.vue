<template>
  <footer class="footer">
    <section class="footer-columns">
      <LayoutFooterCol v-for="col in locale" :key="col.title" :icon="col.icon" :title="col.title">
        <LayoutFooterItem v-for="item in col.items" :key="item.title" v-bind="item"></LayoutFooterItem>
      </LayoutFooterCol>
    </section>
    <section class="footer-bottom">
      <div>Made with ❤ by IDuxFE team</div>
    </section>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../../../context'

import { footerLocales } from './locales'

export default defineComponent({
  setup() {
    const { lang } = inject(appContextToken)!
    const locale = computed(() => footerLocales[lang.value])
    return { lang, locale }
  },
})
</script>
