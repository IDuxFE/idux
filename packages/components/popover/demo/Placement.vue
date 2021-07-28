<template>
  <div style="margin-left: 60px">
    <ix-popover title="Title" content="Content..." placement="topStart">
      <ix-button>TS</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="top">
      <ix-button>Top</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="topEnd">
      <ix-button>TE</ix-button>
    </ix-popover>
  </div>
  <div style="float: left; width: 60px">
    <ix-popover title="Title" content="Content..." placement="leftStart">
      <ix-button>LS</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="left">
      <ix-button>Left</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="leftEnd">
      <ix-button>LE</ix-button>
    </ix-popover>
  </div>
  <div style="margin-left: 270px; width: 60px">
    <ix-popover title="Title" content="Content..." placement="rightStart">
      <ix-button>RS</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="right">
      <ix-button>Right</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="rightEnd">
      <ix-button>RE</ix-button>
    </ix-popover>
  </div>
  <div style="margin-left: 60px; clear: both">
    <ix-popover title="Title" content="Content..." placement="bottomStart">
      <ix-button>BS</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="bottom">
      <ix-button>Bottom</ix-button>
    </ix-popover>
    <ix-popover title="Title" content="Content..." placement="bottomEnd">
      <ix-button>BE</ix-button>
    </ix-popover>
  </div>
</template>

<style scoped lang="less">
.ix-button {
  width: 80px;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
