<template>
  <ix-menu style="width: 256px" mode="inline" :openedIds="menu.openedIds" :selectedIds="menu.selectedIds">
    <ix-sub-menu cid="docs" title="Docs">
      <ix-menu-item cid="introduce">
        <router-link :to="'/docs/introduce/' + menu.lang">
          <span>Introduce</span>
        </router-link>
      </ix-menu-item>
      <ix-menu-item cid="i18n">
        <router-link :to="'/docs/i18n/' + menu.lang">
          <span>I18n</span>
        </router-link>
      </ix-menu-item>
    </ix-sub-menu>
    <ix-sub-menu cid="components" title="Components">
      <ix-menu-item cid="button">
        <router-link :to="'/components/button/' + menu.lang">
          <span>Button</span>
        </router-link>
      </ix-menu-item>
      <ix-menu-item cid="icon">
        <router-link :to="'/components/icon/' + menu.lang">
          <span>Icon</span>
        </router-link>
      </ix-menu-item>
      <ix-menu-item cid="menu">
        <router-link :to="'/components/menu/' + menu.lang">
          <span>Menu</span>
        </router-link>
      </ix-menu-item>
    </ix-sub-menu>
    <ix-sub-menu cid="cdk" title="CDK">
      <ix-menu-item cid="breakpoint">
        <router-link :to="'/cdk/breakpoint/' + menu.lang">
          <span>Breakpoint</span>
        </router-link>
      </ix-menu-item>
      <ix-menu-item cid="click-outside">
        <router-link :to="'/cdk/click-outside/' + menu.lang">
          <span>ClickOutside</span>
        </router-link>
      </ix-menu-item>
    </ix-sub-menu>
  </ix-menu>
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
