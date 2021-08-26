<template>
  <div>
    <IxProgress type="circle" :percent="30" :width="80" />
    <IxProgress type="circle" :percent="70" :width="80" status="exception" />
    <IxProgress type="circle" :percent="100" :width="80" />
  </div>
</template>

<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
