<template>
  <section class="demo-pro-textarea-resize__wrapper">
    <IxProTextarea resize="vertical" placeholder="Resize is set as 'vertical'"></IxProTextarea>
    <IxProTextarea resize="horizontal" placeholder="Resize is set as 'horizontal'"></IxProTextarea>
    <IxProTextarea resize="both" placeholder="Resize is set as 'both'"></IxProTextarea>
  </section>
</template>
<style lang="less">
.demo-pro-textarea-resize__wrapper {
  .ix-pro-textarea {
    width: 300px;
    height: 230px;
    display: flex;

    &:not(&:first-child) {
      margin-top: 16px;
    }
  }
}
</style>
