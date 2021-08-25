<template>
  <IxMenu style="width: 256px" mode="inline" :openedIds="menu.openedIds" :selectedIds="menu.selectedIds">
    <IxMenuSub cid="docs" title="Docs">
      <IxMenuItem cid="introduce">
        <router-link :to="'/docs/introduce/' + menu.lang">
          <span>Introduce</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem cid="i18n">
        <router-link :to="'/docs/i18n/' + menu.lang">
          <span>I18n</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
    <IxMenuSub cid="components" title="Components">
      <IxMenuItem cid="button">
        <router-link :to="'/components/button/' + menu.lang">
          <span>Button</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem cid="icon">
        <router-link :to="'/components/icon/' + menu.lang">
          <span>Icon</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem cid="menu">
        <router-link :to="'/components/menu/' + menu.lang">
          <span>Menu</span>
        </router-link>
      </IxMenuItem>
    </IxMenuSub>
    <IxMenuSub cid="cdk" title="CDK">
      <IxMenuItem cid="breakpoint">
        <router-link :to="'/cdk/breakpoint/' + menu.lang">
          <span>Breakpoint</span>
        </router-link>
      </IxMenuItem>
      <IxMenuItem cid="click-outside">
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
      const [, openedId, selectedId, lang] = route.path.split('/')
      return { openedIds: [openedId], selectedIds: [selectedId], lang }
    })
    return { menu }
  },
})
</script>
