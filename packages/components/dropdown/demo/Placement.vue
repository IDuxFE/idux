<template>
  <ix-space>
    <ix-dropdown placement="bottom-start">
      <ix-button>bottom-start</ix-button>
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
    <ix-dropdown placement="bottom">
      <ix-button>bottom</ix-button>
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
    <ix-dropdown placement="bottom-end">
      <ix-button>bottom-end</ix-button>
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
  </ix-space>
  <br /><br />
  <ix-space>
    <ix-dropdown placement="top-start">
      <ix-button>top-start</ix-button>
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
    <ix-dropdown placement="top">
      <ix-button>top</ix-button>
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
    <ix-dropdown placement="top-end">
      <ix-button>top-end</ix-button>
      <template #overlay>
        <ix-menu>
          <ix-menu-item> Item 1 </ix-menu-item>
          <ix-menu-item> Item 2 </ix-menu-item>
          <ix-menu-divider />
          <ix-menu-item disabled> Item 3 </ix-menu-item>
        </ix-menu>
      </template>
    </ix-dropdown>
  </ix-space>
</template>

<style lang="less" scoped>
.ix-button {
  width: 120px;
}
</style>
