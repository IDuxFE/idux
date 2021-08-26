<template>
  <p>内容在时间轴右边 position: right</p>
  <IxTimeline :pending="true">
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>

  <p>内容在时间轴两侧轮流出现 position: alternate</p>
  <IxTimeline :pending="true" position="alternate">
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>

  <p>内容在时间轴左边 position: left</p>
  <IxTimeline :pending="true" position="left">
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>
</template>

<style lang="less" scoped>
p {
  margin: 20px 0;
}
</style>
