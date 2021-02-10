<template>
  <ix-timeline :pending="true">
    <ix-timeline-item>
      New issue in 2021-02-08
      <template #dot>
        <ix-icon name="clock-circle" />
      </template>
    </ix-timeline-item>
    <ix-timeline-item>Create IxTimeline in 2021-02-10</ix-timeline-item>
    <ix-timeline-item>Update component documentation in 2021-02-12</ix-timeline-item>
    <ix-timeline-item>Write test cases in 2021-02-14</ix-timeline-item>
  </ix-timeline>
</template>
