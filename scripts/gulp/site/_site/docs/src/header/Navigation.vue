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
import { defineComponent } from 'vue'

export default defineComponent({
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
