<template>
  <IxSpace vertical block>
    <p>默认幽灵节点的时间轴点</p>
    <IxTimeline :pending="true">
      <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
      <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
      <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
      <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
    </IxTimeline>

    <p>自定义幽灵节点的时间轴点</p>
    <IxTimeline :pending="true">
      <IxTimelineItem>New issue in 2021-02-08</IxTimelineItem>
      <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
      <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
      <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
      <template #pendingDot>
        <IxIcon name="sync" rotate />
      </template>
    </IxTimeline>
  </IxSpace>
</template>
