<template>
  <IxSplitPanel>
    <IxSplitArea style="background: #eee" :onTouchedMinSizeChange="onTouchedMinSizeChange"> left </IxSplitArea>
    <IxSplitArea style="background: #ddd"> right </IxSplitArea>
  </IxSplitPanel>
</template>

<script setup lang="ts">
const onTouchedMinSizeChange = (touched: boolean) => {
  console.log(touched)
}
</script>

<style scoped lang="less">
.ix-split-panel {
  height: 400px;
}
</style>
