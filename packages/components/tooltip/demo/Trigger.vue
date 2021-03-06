<template>
  <ix-tooltip title="prompt text">
    <ix-button>Hover</ix-button>
  </ix-tooltip>
  <ix-tooltip trigger="focus" title="prompt text">
    <ix-button>Focus</ix-button>
  </ix-tooltip>
  <ix-tooltip trigger="click" title="prompt text">
    <ix-button>Click</ix-button>
  </ix-tooltip>
</template>

<style scoped lang="less">
.ix-button {
  margin-right: 4px;
}
</style>
