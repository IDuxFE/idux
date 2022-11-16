<template>
  <IxAlert pagination type="warning">
    <div v-for="(item, index) in titles" :key="index">
      {{ item }}
      <IxButton mode="link">{{ index === 0 ? '查看详情' : '忽略' }}</IxButton>
    </div>
  </IxAlert>
</template>

<script lang="ts" setup>
const titles = ['上次看到这句话的时候还是上次。', '上次看到这么无语的话，还是在上次。', '上次看到这么的发言还是上次。']
</script>
