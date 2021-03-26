<template>
  <div>
    <ix-progress type="circle" :percent="75" :format="percent => `${percent} Days`" />
    <ix-progress type="circle" :percent="100" :format="() => 'Done'" />
    <ix-progress type="circle" :percent="75">
      <template #format="{ percent }">
        <span style="color: red">{{ percent }}</span>
      </template>
    </ix-progress>
  </div>
</template>
<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
