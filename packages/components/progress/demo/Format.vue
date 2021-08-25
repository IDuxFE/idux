<template>
  <div>
    <IxProgress type="circle" :percent="75" :format="percent => `${percent} Days`" />
    <IxProgress type="circle" :percent="100" :format="() => 'Done'" />
    <IxProgress type="circle" :percent="75">
      <template #format="{ percent }">
        <span style="color: red">{{ percent }}</span>
      </template>
    </IxProgress>
  </div>
</template>
<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
