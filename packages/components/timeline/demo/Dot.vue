<template>
  <IxTimeline :pending="true">
    <IxTimelineItem>
      New issue in 2021-02-08
      <template #dot>
        <IxIcon name="clock-circle" />
      </template>
    </IxTimelineItem>
    <IxTimelineItem>Create IxTimeline in 2021-02-10</IxTimelineItem>
    <IxTimelineItem>Update component documentation in 2021-02-12</IxTimelineItem>
    <IxTimelineItem>Write test cases in 2021-02-14</IxTimelineItem>
  </IxTimeline>
</template>
