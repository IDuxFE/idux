<template>
  <div>
    <ix-tooltip title="3 done / 3 in progress / 4 to do">
      <ix-progress :percent="60" :success="{ percent: 30 }" />
    </ix-tooltip>
    <ix-tooltip title="3 done / 3 in progress / 4 to do">
      <ix-progress :percent="60" :success="{ percent: 30 }" type="circle" />
    </ix-tooltip>
    <ix-tooltip title="3 done / 3 in progress / 4 to do">
      <ix-progress :percent="60" :success="{ percent: 30, strokeColor: 'red' }" type="dashboard" />
    </ix-tooltip>
  </div>
</template>
<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
