<template>
  <p>内容在时间轴右边</p>
  <IxTimeline :pending="true" placement="end">
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>

  <p>内容在时间轴两侧轮流出现</p>
  <IxTimeline :pending="true" placement="alternate">
    <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>

  <p>内容在时间轴左边</p>
  <IxTimeline :pending="true" placement="start">
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
