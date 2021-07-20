<template>
  <ix-menu class="header-menu" :selectedIds="selectedIds">
    <ix-menu-item cid="home">
      <router-link :to="'/'">
        <span>{{ lang == 'zh' ? '首页' : 'Home' }}</span>
      </router-link>
    </ix-menu-item>
    <ix-menu-item cid="docs">
      <router-link :to="'/docs/introduce/' + lang">
        <span>{{ lang == 'zh' ? '文档' : 'Docs' }}</span>
      </router-link>
    </ix-menu-item>
    <ix-menu-item cid="components">
      <router-link :to="'/components/button/' + lang">
        <span>{{ lang == 'zh' ? '基础组件' : 'Components' }}</span>
      </router-link>
    </ix-menu-item>
    <ix-menu-item cid="cdk">
      <router-link :to="'/cdk/breakpoint/' + lang">
        <span>{{ lang == 'zh' ? '开发套件' : 'CDK' }}</span>
      </router-link>
    </ix-menu-item>
    <ix-menu-item v-if="isXs">
      <a :href="githubUrl" target="_blank" rel="noopener noreferrer">Github</a>
    </ix-menu-item>
    <ix-sub-menu v-else-if="isSm" overlayClass="header-menu-sub" icon="unordered-list">
      <ix-menu-item>
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer">Github</a>
      </ix-menu-item>
    </ix-sub-menu>
  </ix-menu>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../../../context'

export default defineComponent({
  setup() {
    const { lang, page, screens, org, repo } = inject(appContextToken)!
    const selectedIds = computed(() => [page.value])
    const isXs = computed(() => screens.value.xs)
    const isSm = computed(() => screens.value.sm)

    const githubUrl = computed(() => `https://github.com/${org}/${repo}`)
    return { lang, selectedIds, page, isXs, isSm, githubUrl }
  },
})
</script>
