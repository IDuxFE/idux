<template>
  <ix-steps :active="1" direction="vertical" size="small">
    <ix-step status="finish" title="Finished" description="This is a description."></ix-step>
    <ix-step title="In Progress" subTitle="20:20:01" description="This is a description."></ix-step>
    <ix-step title="Waiting" description="This is a description."></ix-step>
  </ix-steps>
</template>
