<template>
  <ix-popover trigger="hover" title="Title" content="Content">
    <ix-button>Hover</ix-button>
  </ix-popover>
  <ix-popover trigger="focus" title="Title" content="Content">
    <ix-button>Focus</ix-button>
  </ix-popover>
  <ix-popover title="Title" content="Content">
    <ix-button>Click</ix-button>
  </ix-popover>
</template>

<style scoped lang="less">
.ix-button {
  margin-right: 4px;
}
</style>
