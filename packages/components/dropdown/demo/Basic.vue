<template>
  <ix-dropdown icon="down">
    Hover me
    <template #overlay>
      <ix-menu>
        <ix-menu-item> Item 1 </ix-menu-item>
        <ix-menu-item> Item 2 </ix-menu-item>
        <ix-menu-divider />
        <ix-menu-item disabled> Item 3 </ix-menu-item>
      </ix-menu>
    </template>
  </ix-dropdown>
</template>
