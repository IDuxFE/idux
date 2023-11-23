<template>
  <IxTimeline>
    <IxTimelineItem color="error">Set error color</IxTimelineItem>
    <IxTimelineItem color="warning">Set warning color</IxTimelineItem>
    <IxTimelineItem color="success">
      Set success color
      <template #dot>
        <IxIcon name="check" />
      </template>
    </IxTimelineItem>
    <IxTimelineItem>The default color</IxTimelineItem>
  </IxTimeline>
</template>
