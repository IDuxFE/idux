<template>
  <ix-list
    header="Header"
    footer="Footer"
    :borderless="false"
    size="large"
    loadMore="加载更多"
    @loadMore="handleLoadMore"
  >
    <ix-list-item v-for="item in listData" :key="item.title" :title="item.title" :content="item.content" />
  </ix-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const listData: Record<string, unknown>[] = []
    for (let i = 0; i < 2; i++) {
      listData.push({
        title: `idux list size: ${i}`,
        content:
          'In sunt exercitation pariatur irure aliqua proident cillum velit laboris veniam. Pariatur ullamco est consequat ad nisi reprehenderit culpa magna id elit ut veniam.',
      })
    }
    const handleLoadMore = (done: () => void) => {
      setTimeout(() => {
        listData.push({
          title: new Date().getTime(),
          content: 'content',
        })
        done()
      }, 1000)
    }
    return {
      listData,
      handleLoadMore,
    }
  },
})
</script>

<style lang="less" scoped></style>
