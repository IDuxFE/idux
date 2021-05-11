<template>
  <ix-row align="middle" gutter="16">
    <ix-col>
      <ix-radio-group v-model:value="mode">
        <ix-radio value="vertical">Vertical</ix-radio>
        <ix-radio value="horizontal">Horizontal</ix-radio>
        <ix-radio value="inline">Inline</ix-radio>
      </ix-radio-group>
    </ix-col>
    <ix-col>
      <ix-divider type="vertical" />
    </ix-col>
    <ix-col>
      <ix-radio-group v-model:value="theme">
        <ix-radio value="light">Light</ix-radio>
        <ix-radio value="dark">Dark</ix-radio>
      </ix-radio-group>
    </ix-col>
    <ix-col>
      <ix-divider type="vertical" />
    </ix-col>
    <ix-col>
      <ix-button mode="primary" @click="collapsed = !collapsed">
        <ix-icon :name="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </ix-button>
    </ix-col>
  </ix-row>

  <div :style="{ marginTop: '16px', width: mode !== 'horizontal' ? '256px' : null }">
    <ix-menu :mode="mode" :theme="theme" :collapsed="collapsed">
      <ix-menu-item cid="item1" icon="home"><a>Item 1</a></ix-menu-item>
      <ix-menu-item cid="item2" icon="mail"> Item 2 </ix-menu-item>
      <ix-menu-item cid="item3" disabled icon="appstore"> Item 3 </ix-menu-item>
      <ix-menu-divider />
      <ix-sub-menu cid="subMenu1" title="Sub Menu 1" icon="setting">
        <ix-menu-item-group title="Item Group 1">
          <ix-menu-item cid="item4">Item 4</ix-menu-item>
          <ix-menu-item cid="item5">Item 5</ix-menu-item>
        </ix-menu-item-group>
        <ix-menu-divider />
        <ix-sub-menu cid="subMenu2">
          <template #title><span>Sub Menu 2</span></template>
          <ix-menu-item cid="item6">Item 6</ix-menu-item>
          <ix-menu-item cid="item7">Item 7</ix-menu-item>
        </ix-sub-menu>
        <ix-sub-menu cid="subMenu3" title="Sub Menu 3">
          <ix-menu-item cid="item8">Item 8</ix-menu-item>
          <ix-menu-item cid="item9">Item 9</ix-menu-item>
        </ix-sub-menu>
      </ix-sub-menu>
      <ix-sub-menu cid="subMenu4" disabled title="SubMenu 4" icon="github">
        <ix-menu-item cid="item10">Item 10</ix-menu-item>
        <ix-menu-item cid="item11">Item 11</ix-menu-item>
      </ix-sub-menu>
    </ix-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const mode = ref('vertical')
    const theme = ref('light')
    const collapsed = ref(false)

    return { mode, theme, collapsed }
  },
})
</script>
