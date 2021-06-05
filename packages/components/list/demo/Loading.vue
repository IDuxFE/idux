<template>
  <ix-list :loading="loading" header="Header" footer="Footer">
    <ix-list-item v-for="item in listData" :key="item.title" :title="item.title" :content="item.content" />
  </ix-list>

  <ix-button @click="toggleLoading">切换加载状态</ix-button>
</template>

<script lang="ts">
const listData: Record<string, unknown>[] = []
for (let i = 0; i < 3; i++) {
  listData.push({
    title: `idux list part ${i}`,
    content:
      'Nisi tempor eiusmod sunt ipsum. Ipsum sunt mollit laborum voluptate. Adipisicing voluptate aliquip ipsum deserunt occaecat qui incididunt ullamco et. Tempor sunt ullamco ex cillum duis anim. Reprehenderit ex quis ullamco ullamco cillum fugiat.',
  })
}
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const loading = ref(true)

    const toggleLoading = () => {
      loading.value = !loading.value
    }
    return {
      listData,
      loading,
      toggleLoading,
    }
  },
})
</script>
