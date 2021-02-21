<template>
  <p>通过设置pending为true来展示幽灵节点</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>

  <p>通过设置pending为字符串来展示幽灵节点</p>
  <ix-timeline pending="Recoding...">
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>

  <p>通过设置插槽pending来展示幽灵节点</p>
  <ix-timeline>
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
    <template #pending>Recoding...</template>
  </ix-timeline>
</template>

<style lang="less" scoped>
p {
  margin: 20px 0;
}
</style>
