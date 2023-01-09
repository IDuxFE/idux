<template>
  <IxSpace size="16px">
    <IxBadge count="9">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="9" status="success">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="9" status="info">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="9" status="warning">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="9" style="--ix-badge-background-color: #000">
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
