<template>
  <div>
    <IxTooltip title="3 done / 3 in progress / 4 to do">
      <IxProgress :percent="60" :success="{ percent: 30, strokeColor: 'green' }" />
    </IxTooltip>
    <IxTooltip title="3 done / 3 in progress / 4 to do">
      <IxProgress :percent="60" :success="{ percent: 30, strokeColor: 'green' }" type="circle" />
    </IxTooltip>
    <IxTooltip title="3 done / 3 in progress / 4 to do">
      <IxProgress :percent="60" :success="{ percent: 30, strokeColor: 'red' }" type="dashboard" />
    </IxTooltip>
  </div>
</template>
<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
