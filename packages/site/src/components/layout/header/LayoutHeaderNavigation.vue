<template>
  <IxMenu class="header-menu" :selectedKeys="selectedKeys">
    <!-- <IxMenuItem key="home">
      <router-link :to="'/'">
        <span>{{ lang == 'zh' ? '首页' : 'Home' }}</span>
      </router-link>
    </IxMenuItem> -->
    <IxMenuItem key="docs">
      <router-link :to="'/docs/introduce/' + lang">
        <span>{{ lang == 'zh' ? '文档' : 'Docs' }}</span>
      </router-link>
    </IxMenuItem>
    <IxMenuItem key="components">
      <router-link :to="'/components/button/' + lang">
        <span>{{ lang == 'zh' ? '基础组件' : 'Components' }}</span>
      </router-link>
    </IxMenuItem>
    <IxMenuItem key="pro">
      <router-link :to="'/pro/layout/' + lang">
        <span>{{ lang == 'zh' ? '高级组件' : 'Pro' }}</span>
      </router-link>
    </IxMenuItem>
    <IxMenuItem key="cdk">
      <router-link :to="'/cdk/a11y/' + lang">
        <span>{{ lang == 'zh' ? '开发套件' : 'CDK' }}</span>
      </router-link>
    </IxMenuItem>
    <IxMenuItem v-if="isXs" key="github">
      <a :href="githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
    </IxMenuItem>
    <IxMenuSub v-else-if="isSm" key="more-menu" overlayClass="header-menu-sub" icon="menu">
      <IxMenuItem>
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
      </IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { appContextToken } from '../../../context'

export default defineComponent({
  setup() {
    const { lang, page, breakpoints, org, repo } = inject(appContextToken)!
    const selectedKeys = computed(() => [page.value])
    const isXs = computed(() => breakpoints.xs)
    const isSm = computed(() => breakpoints.sm)

    const githubUrl = computed(() => `https://github.com/${org}/${repo}`)
    return { lang, selectedKeys, isXs, isSm, githubUrl }
  },
})
</script>
