<template>
  <IxAlert :pagination="pagination" @mouseenter="stopTimer" @mouseleave="startTimer">
    <div v-for="(item, index) in titles" :key="index">
      {{ item }}
      <IxButton mode="link" size="xs">{{ index === 0 ? '查看详情' : '忽略' }}</IxButton>
    </div>
  </IxAlert>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

const titles = ['上次看到这句话的时候还是上次。', '上次看到这么无语的话，还是在上次。', '上次看到这么的发言还是上次。']

const pagination = reactive({
  pageIndex: 1,
  onChange: (index: number) => {
    pagination.pageIndex = index
  },
})

let timer: number
const startTimer = () => {
  stopTimer()

  timer = setTimeout(() => {
    if (pagination.pageIndex < titles.length) {
      pagination.pageIndex++
    } else {
      pagination.pageIndex = 1
    }
    startTimer()
  }, 3000)
}

const stopTimer = () => {
  clearTimeout(timer)
}

onMounted(() => startTimer())
</script>
