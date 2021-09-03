<template>
  <IxMenu class="header-menu" :selectedIds="selectedIds">
    <IxMenuItem key="home">
      <router-link :to="'/'">
        <span>{{ lang == 'zh' ? '首页' : 'Home' }}</span>
      </router-link>
    </IxMenuItem>
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
    <IxMenuItem key="cdk">
      <router-link :to="'/cdk/breakpoint/' + lang">
        <span>{{ lang == 'zh' ? '开发套件' : 'CDK' }}</span>
      </router-link>
    </IxMenuItem>
    <IxMenuItem v-if="isXs">
      <a :href="githubUrl" target="_blank" rel="noopener noreferrer">Github</a>
    </IxMenuItem>
    <IxMenuSub v-else-if="isSm" overlayClass="header-menu-sub" icon="unordered-list">
      <IxMenuItem>
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer">Github</a>
      </IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../../../context'

export default defineComponent({
  setup() {
    const { lang, page, screens, org, repo } = inject(appContextToken)!
    const selectedIds = computed(() => [page.value])
    const isXs = computed(() => screens.xs)
    const isSm = computed(() => screens.sm)

    const githubUrl = computed(() => `https://github.com/${org}/${repo}`)
    return { lang, selectedIds, page, isXs, isSm, githubUrl }
  },
})
</script>
