<template>
  <IxCollapse expandIcon="caret-right-filled" class="demo-collapse">
    <IxCollapsePanel key="1" header="Francis Bacon's saying" class="demo-collapse-panel">
      <span>A wise man will make more opportunities than he finds.</span>
    </IxCollapsePanel>
    <IxCollapsePanel key="2" header="Francis Bacon's saying" class="demo-collapse-panel">
      If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
      shall end in certainties.
    </IxCollapsePanel>
    <IxCollapsePanel key="3" header="Francis Bacon's saying" class="demo-collapse-panel">
      A wise man will make more opportunities than he finds.
    </IxCollapsePanel>
  </IxCollapse>

  <IxCollapse>
    <template #expandIcon="{ key, expanded }">
      <IxIcon v-if="key !== '3'" name="right" :rotate="expanded ? 90 : 0"></IxIcon>
    </template>
    <IxCollapsePanel key="1" header="Francis Bacon's saying">
      <span>A wise man will make more opportunities than he finds.</span>
    </IxCollapsePanel>
    <IxCollapsePanel key="2" header="Francis Bacon's saying">
      If a man will begin with certainties, he shall end in doubts; but if he will be content to begin with doubts, he
      shall end in certainties.
    </IxCollapsePanel>
    <IxCollapsePanel key="3" header="Francis Bacon's saying">
      A wise man will make more opportunities than he finds.
    </IxCollapsePanel>
  </IxCollapse>
</template>

<style lang="less" scoped>
.demo-collapse .demo-collapse-panel {
  background: @color-grey-l40;
  margin-bottom: @spacing-lg;
}
</style>
