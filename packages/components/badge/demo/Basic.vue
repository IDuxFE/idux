<template>
  <div class="badge-demo">
    <IxBadge count="1000"></IxBadge>

    <IxBadge>
      <template #count>
        <IxIcon name="clock-circle"></IxIcon>
      </template>
    </IxBadge>

    <IxBadge count="100" color="#00f">
      <a href="#"></a>
    </IxBadge>

    <IxBadge count="1000" :overflowCount="999">
      <a href="#"></a>
    </IxBadge>

    <IxBadge dot>
      <a href="#"></a>
    </IxBadge>

    <IxBadge>
      <a href="#"></a>
      <template #count>
        <IxIcon name="clock-circle"></IxIcon>
      </template>
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
