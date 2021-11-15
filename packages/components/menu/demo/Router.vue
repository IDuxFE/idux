<template>
  <IxMenu v-model:expandedKeys="expandedKeys" :selectedKeys="selectedKeys" mode="inline" style="width: 256px">
    <IxMenuSub key="docs" label="Docs">
      <IxMenuItem key="introduce">
        <router-link :to="'/docs/introduce/' + lang">
          <span>Introduce</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="i18n">
        <router-link :to="'/docs/i18n/' + lang">
          <span>I18n</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
    <IxMenuSub key="components" label="Components">
      <IxMenuItem key="button">
        <router-link :to="'/components/button/' + lang">
          <span>Button</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="icon">
        <router-link :to="'/components/icon/' + lang">
          <span>Icon</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="menu">
        <router-link :to="'/components/menu/' + lang">
          <span>Menu</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
    <IxMenuSub key="cdk" label="CDK">
      <IxMenuItem key="breakpoint">
        <router-link :to="'/cdk/breakpoint/' + lang">
          <span>Breakpoint</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="click-outside">
        <router-link :to="'/cdk/click-outside/' + lang">
          <span>ClickOutside</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const lang = ref<string>()

watch(
  () => route.path,
  path => {
    const [, expandedKey, selectedKey, currLang] = path.split('/')
    expandedKeys.value = [expandedKey]
    selectedKeys.value = [selectedKey]
    lang.value = currLang
  },
  { immediate: true },
)
</script>
