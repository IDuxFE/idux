<template>
  <div class="empty-demo">
    <div class="empty-demo-item"><ix-empty /></div>
    <div class="empty-demo-item">
      <ix-empty description="抱歉，数据为空" />
    </div>
    <div class="empty-demo-item">
      <ix-empty>
        <img
          class="img"
          width="120"
          src="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        />
        <p class="text">No Data!</p>
      </ix-empty>
    </div>
    <div class="empty-demo-item">
      <ix-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.empty-demo {
  & > * {
    margin-right: 20px;
  }
  &-item {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    background: #fff;
    height: 200px;
    width: 200px;
    .text {
      text-align: center;
    }
  }
}
</style>
