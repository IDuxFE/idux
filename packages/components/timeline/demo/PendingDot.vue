<template>
  <p>默认幽灵节点的时间轴点</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>

  <p>自定义幽灵节点的时间轴点</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
    <template #pendingDot>
      <ix-icon name="sync" rotate />
    </template>
  </ix-timeline>
</template>

<style lang="less" scoped>
p {
  margin: 20px 0;
}
</style>
