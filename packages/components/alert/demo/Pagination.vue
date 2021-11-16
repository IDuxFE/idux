<template>
  <IxAlert>
    <div>
      上次见到你的时候还是在上次。
      <IxButton mode="link" size="sm">查看详情</IxButton>
    </div>
    <div>
      上次看到这么无语的话，还是在上次。
      <IxButton mode="link" size="sm">忽略</IxButton>
    </div>
    <div> 上次看到这么的发言还是上次。 </div>
  </IxAlert>
  <IxAlert closable show-pagination>
    <div v-for="(item, idx) in messageList" :key="idx">
      {{ `${idx + 1}. ${item}` }}
      <IxButton v-if="idx === 1" mode="link" size="sm">忽略</IxButton>
    </div>
  </IxAlert>
  <IxButton @click="onClick"> 添加提示 </IxButton>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const messageList = reactive(['上次看到这句话的时候还是上次。'])

const onClick = () => {
  messageList.push('上次看到这句话的时候还是上次。')
}
</script>
