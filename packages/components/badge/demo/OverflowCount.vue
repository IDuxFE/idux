<template>
  <IxSpace size="16px">
    <IxBadge count="99">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="100">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="10" :overflowCount="9">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="100" :overflowCount="49">
      <a href="#"></a>
    </IxBadge>
  </IxSpace>
</template>

<style lang="less" scoped>
a {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid var(--ix-border-color);
  border-radius: var(--ix-border-radius-sm);
}
</style>
