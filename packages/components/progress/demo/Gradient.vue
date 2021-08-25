<template>
  <div>
    <IxProgress
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }"
      :percent="99.9"
    />
    <IxProgress
      :stroke-color="{
        from: '#108ee9',
        to: '#87d068',
      }"
      :percent="99.9"
      status="active"
    />
    <IxProgress
      type="circle"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }"
      :percent="90"
    />
    <IxProgress
      type="circle"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }"
      :percent="100"
    />
  </div>
</template>
<style scoped>
.ix-progress-circle {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
