<template>
  <div>
    <ix-progress type="circle" :percent="75" />
    <ix-progress type="circle" :percent="70" status="exception" />
    <ix-progress type="circle" :percent="100" />
  </div>
</template>
<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
