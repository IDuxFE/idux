<template>
  <div class="capping">
    <IxBadge count="99">
      <a href="#"></a>
    </IxBadge>

    <IxBadge count="100">
      <a href="#"></a>
    </IxBadge>

    <IxBadge count="1000" :overflowCount="10">
      <a href="#"></a>
    </IxBadge>

    <IxBadge count="1000" :overflowCount="999">
      <a href="#"></a>
    </IxBadge>
  </div>
</template>

<style lang="less" scoped>
.capping {
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
