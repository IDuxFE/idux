<template>
  <ul class="navigation">
    <li :class="{ selected: page === 'docs' }">
      <router-link :to="'/docs/contributing/' + language">
        <span>{{ language == 'zh' ? '文档' : 'Docs' }}</span>
      </router-link>
    </li>
    <li :class="{ selected: page === 'components' }">
      <router-link :to="'/components/button/' + language">
        <span>{{ language == 'zh' ? '组件' : 'Components' }}</span>
      </router-link>
    </li>
    <li :class="{ selected: page === 'cdk' }">
      <router-link :to="'/cdk/clipboard/' + language">
        <span>{{ language == 'zh' ? '开发套件' : 'CDK' }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue'

export default defineComponent({
  props: {
    page: { type: String, required: true },
  },
  setup() {
    const language = inject('language') as Ref<string>
    const changeLanguage = (lang: string) => {
      language.value = lang
    }
    return { language, changeLanguage }
  },
})
</script>
