<template>
  <IxMenu style="width: 256px" mode="inline" :expandedKeys="menu.expandedKeys" :selectedKeys="menu.selectedKeys">
    <IxMenuSub key="docs" label="Docs">
      <IxMenuItem key="introduce">
        <router-link :to="'/docs/introduce/' + menu.lang">
          <span>Introduce</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="i18n">
        <router-link :to="'/docs/i18n/' + menu.lang">
          <span>I18n</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
    <IxMenuSub key="components" label="Components">
      <IxMenuItem key="button">
        <router-link :to="'/components/button/' + menu.lang">
          <span>Button</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="icon">
        <router-link :to="'/components/icon/' + menu.lang">
          <span>Icon</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="menu">
        <router-link :to="'/components/menu/' + menu.lang">
          <span>Menu</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
    <IxMenuSub key="cdk" label="CDK">
      <IxMenuItem key="breakpoint">
        <router-link :to="'/cdk/breakpoint/' + menu.lang">
          <span>Breakpoint</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem key="click-outside">
        <router-link :to="'/cdk/click-outside/' + menu.lang">
          <span>ClickOutside</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
  </IxMenu>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const menu = computed(() => {
      const [, expandedKey, selectedKey, lang] = route.path.split('/')
      return { expandedKeys: [expandedKey], selectedKeys: [selectedKey], lang }
    })
    return { menu }
  },
})
</script>
