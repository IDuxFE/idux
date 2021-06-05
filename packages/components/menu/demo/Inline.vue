<template>
  <ix-menu style="width: 256px" mode="inline">
    <ix-menu-item icon="home"><a>Item 1</a></ix-menu-item>
    <ix-menu-item icon="mail"> Item 2 </ix-menu-item>
    <ix-menu-item disabled icon="appstore"> Item 3 </ix-menu-item>
    <ix-sub-menu title="Sub Menu 1" icon="setting">
      <ix-menu-item-group title="Item Group 1">
        <ix-menu-item>Item 4</ix-menu-item>
        <ix-menu-item>Item 5</ix-menu-item>
      </ix-menu-item-group>
      <ix-sub-menu>
        <template #title><span>Sub Menu 2</span></template>
        <ix-menu-item>Item 6</ix-menu-item>
        <ix-menu-item>Item 7</ix-menu-item>
      </ix-sub-menu>
      <ix-sub-menu title="Sub Menu 3">
        <ix-menu-item>Item 8</ix-menu-item>
        <ix-menu-item>Item 9</ix-menu-item>
      </ix-sub-menu>
    </ix-sub-menu>
    <ix-sub-menu disabled title="SubMenu 4" icon="github">
      <ix-menu-item>Item 10</ix-menu-item>
      <ix-menu-item>Item 11</ix-menu-item>
    </ix-sub-menu>
  </ix-menu>
</template>
