<template>
  <div style="margin-left: 60px">
    <ix-tooltip title="This is a very long prompt text." placement="topStart">
      <ix-button>TS</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="top">
      <ix-button>Top</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="topEnd">
      <ix-button>TE</ix-button>
    </ix-tooltip>
  </div>
  <div style="float: left; width: 60px">
    <ix-tooltip title="This is a very long prompt text." placement="leftStart">
      <ix-button>LS</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="left">
      <ix-button>Left</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="leftEnd">
      <ix-button>LE</ix-button>
    </ix-tooltip>
  </div>
  <div style="margin-left: 270px; width: 60px">
    <ix-tooltip title="This is a very long prompt text." placement="rightStart">
      <ix-button>RS</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="right">
      <ix-button>Right</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="rightEnd">
      <ix-button>RE</ix-button>
    </ix-tooltip>
  </div>
  <div style="margin-left: 60px; clear: both">
    <ix-tooltip title="This is a very long prompt text." placement="bottomStart">
      <ix-button>BS</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="bottom">
      <ix-button>Bottom</ix-button>
    </ix-tooltip>
    <ix-tooltip title="This is a very long prompt text." placement="bottomEnd">
      <ix-button>BE</ix-button>
    </ix-tooltip>
  </div>
</template>

<style scoped lang="less">
.ix-button {
  width: 80px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
