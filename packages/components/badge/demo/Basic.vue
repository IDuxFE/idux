<template>
  <IxSpace size="16px">
    <IxBadge count="5">
      <a href="#"></a>
    </IxBadge>
    <IxBadge count="0" showZero>
      <a href="#"></a>
    </IxBadge>
    <IxBadge>
      <a href="#"></a>
      <template #count>
        <IxIcon name="clock-circle" :size="16"></IxIcon>
      </template>
    </IxBadge>
  </IxSpace>
</template>

<style lang="less" scoped>
a {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid var(--ix-color-border);
  border-radius: var(--ix-border-radius-sm);
}
</style>
