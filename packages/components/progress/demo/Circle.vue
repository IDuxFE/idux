<template>
  <div>
    <IxProgress type="circle" :percent="75" />
    <IxProgress type="circle" :percent="70" status="exception" />
    <IxProgress type="circle" :percent="100" />
  </div>
</template>
<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
