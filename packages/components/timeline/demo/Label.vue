<template>
  <IxSpace vertical block>
    <p>1.标签的一般用法</p>
    <IxTimeline>
      <IxTimelineItem key="0" label="2021-02-08">New issue</IxTimelineItem>
      <IxTimelineItem key="1" label="2021-02-10">Create IxTimeline</IxTimelineItem>
      <IxTimelineItem key="2" label="2021-02-12">Update component documentation</IxTimelineItem>
      <IxTimelineItem key="3" label="2021-02-14">Write test cases</IxTimelineItem>
    </IxTimeline>

    <p>2.标签的一般用法</p>
    <IxTimeline placement="start">
      <IxTimelineItem key="0" label="2021-02-08">New issue</IxTimelineItem>
      <IxTimelineItem key="1" label="2021-02-10">Create IxTimeline</IxTimelineItem>
      <IxTimelineItem key="2" label="2021-02-12">Update component documentation</IxTimelineItem>
      <IxTimelineItem key="3" label="2021-02-14">Write test cases</IxTimelineItem>
    </IxTimeline>

    <p>3.标签的一般用法</p>
    <IxTimeline placement="alternate">
      <IxTimelineItem key="0" label="2021-02-08">New issue</IxTimelineItem>
      <IxTimelineItem key="1" label="2021-02-10">Create IxTimeline</IxTimelineItem>
      <IxTimelineItem key="2" label="2021-02-12">Update component documentation</IxTimelineItem>
      <IxTimelineItem key="3" label="2021-02-14">Write test cases</IxTimelineItem>
    </IxTimeline>

    <p>4.标签跟内容分开</p>
    <IxTimeline :both="false">
      <IxTimelineItem key="0" label="2021-02-08">New issue</IxTimelineItem>
      <IxTimelineItem key="1" label="2021-02-10">Create IxTimeline</IxTimelineItem>
      <IxTimelineItem key="2" label="2021-02-12">Update component documentation</IxTimelineItem>
      <IxTimelineItem key="3" label="2021-02-14">Write test cases</IxTimelineItem>
    </IxTimeline>

    <p>5.标签跟内容分开</p>
    <IxTimeline :both="false" placement="start">
      <IxTimelineItem key="0" label="2021-02-08">New issue</IxTimelineItem>
      <IxTimelineItem key="1" label="2021-02-10">Create IxTimeline</IxTimelineItem>
      <IxTimelineItem key="2" label="2021-02-12">Update component documentation</IxTimelineItem>
      <IxTimelineItem key="3" label="2021-02-14">Write test cases</IxTimelineItem>
    </IxTimeline>

    <p>6.标签跟内容分开</p>
    <IxTimeline :both="false" placement="alternate">
      <IxTimelineItem key="0" label="2021-02-08">New issue</IxTimelineItem>
      <IxTimelineItem key="1" label="2021-02-10">Create IxTimeline</IxTimelineItem>
      <IxTimelineItem key="2" label="2021-02-12">Update component documentation</IxTimelineItem>
      <IxTimelineItem key="3" label="2021-02-14">Write test cases</IxTimelineItem>
    </IxTimeline>
  </IxSpace>
</template>
