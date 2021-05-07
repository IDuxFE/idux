<template>
  <ix-steps :active="1" status="error">
    <ix-step status="finish" title="Finished" subTitle="20:20:01" description="This is a description."></ix-step>
    <ix-step title="In Progress" description="This is a description."></ix-step>
    <ix-step title="Waiting" description="This is a description."></ix-step>
  </ix-steps>
</template>
