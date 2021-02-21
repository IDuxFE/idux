<template>
  <p>内容在时间轴右边 position: right</p>
  <ix-timeline :pending="true">
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>

  <p>内容在时间轴两侧轮流出现 position: alternate</p>
  <ix-timeline :pending="true" position="alternate">
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>

  <p>内容在时间轴左边 position: left</p>
  <ix-timeline :pending="true" position="left">
    <ix-timeline-item>New issue in 2021-02-08</ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>
</template>

<style lang="less" scoped>
p {
  margin: 20px 0;
}
</style>
