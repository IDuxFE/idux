<template>
  <p>通过设置pending为true来展示幽灵节点</p>
  <IxTimeline :pending="true">
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>

  <p>通过设置pending为字符串来展示幽灵节点</p>
  <IxTimeline pending="Recoding...">
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>

  <p>通过设置插槽pending来展示幽灵节点</p>
  <IxTimeline>
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
    <template #pending>Recoding...</template>
  </IxTimeline>
</template>

<style lang="less" scoped>
p {
  margin: 20px 0;
}
</style>
