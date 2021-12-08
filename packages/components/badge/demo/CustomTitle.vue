<template>
  <div class="badge-demo">
    <IxBadge count="5" title="Custom hover text">
      <a href="#"></a>
    </IxBadge>
  </div>
</template>

<style lang="less" scoped>
.badge-demo {
  & > * {
    margin-right: 20px;
    a {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: gainsboro;
    }
  }
}
</style>
