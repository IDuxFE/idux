<template>
  <ix-card class="optionc-card" title="Small size card" :hoverable="true" size="small">
    <template v-slot:extra>
      <a href="#">More</a>
    </template>
    <p>card content</p>
    <p>card content</p>
    <template v-slot:footer>
      <div class="bottom-options"><ix-icon name="edit"></ix-icon>我是底部操作栏</div>
    </template>
  </ix-card>
</template>

<style lang="less" scoped>
.optionc-card {
  width: 60%;
  .bottom-options {
    text-align: center;
  }
}
</style>
