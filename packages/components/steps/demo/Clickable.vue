<template>
  <ix-steps clickable>
    <ix-step title="Finished" subTitle="20:20:01" description="This is a description."></ix-step>
    <ix-step title="In Progress" description="This is a description."></ix-step>
    <ix-step :disabled="true" title="Waiting" description="This is a description."></ix-step>
  </ix-steps>
</template>
