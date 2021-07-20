<template>
  <footer class="footer">
    <section class="footer-columns">
      <FooterCol v-for="col in locale" :key="col.title" :icon="col.icon" :title="col.title">
        <FooterItem v-for="item in col.items" :key="item.title" v-bind="item"></FooterItem>
      </FooterCol>
    </section>
    <section class="footer-bottom">
      <div>Made with ❤ by IduxFE team</div>
    </section>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../../../context'

import FooterCol from './Col.vue'
import FooterItem from './Item.vue'
import { footerLocales } from './locales'

export default defineComponent({
  components: { FooterCol, FooterItem },
  setup() {
    const { lang } = inject(appContextToken)!
    const locale = computed(() => footerLocales[lang.value])
    return { lang, locale }
  },
})
</script>
