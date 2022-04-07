<template>
  <IxList :header="`${listData.length} replies`">
    <li v-for="(item, index) in listData" :key="index">
      <IxComment :author="item.author" :avatar="item.avatar" :datetime="item.datetime">
        <template #content>
          <p>{{ item.content }}</p>
        </template>
      </IxComment>
    </li>
  </IxList>
  <IxComment>
    <template #avatar>
      <IxAvatar src="/images/avatar/0.png" />
    </template>
    <template #content>
      <IxForm>
        <IxFormItem>
          <IxTextarea v-model:value="commentValue" placeholder="Basic usage"></IxTextarea>
        </IxFormItem>
        <IxFormItem>
          <IxButton mode="primary" :loading="submitting" @click="handleSubmit">submit</IxButton>
        </IxFormItem>
      </IxForm>
    </template>
  </IxComment>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { format } from 'date-fns'

interface listDataNode {
  author: string
  avatar: string
  content: string
  datetime: string
}

const submitting = ref(false)
const commentValue = ref('')
const listData: listDataNode[] = reactive([])

const handleSubmit = () => {
  if (!commentValue.value) {
    return
  }
  submitting.value = true

  setTimeout(() => {
    listData.push({
      author: 'Han Solo',
      avatar: '/images/avatar/0.png',
      content: commentValue.value,
      datetime: format(new Date(), 'yyyy-MM-dd HH:mm'),
    })
    commentValue.value = ''
    submitting.value = false
  }, 1000)
}
</script>
