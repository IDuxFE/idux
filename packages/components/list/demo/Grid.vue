<template>
  <ix-list :grid="{ gutter: [30, 20], column: 3, xs: 2, sm: 3, md: 4, lg: 5, xl: 3 }">
    <ix-list-item v-for="item in listData" :key="item.title">
      <ix-card :title="item.title">
        <p>{{ item.content }}</p>
      </ix-card>
    </ix-list-item>
  </ix-list>
</template>

<script lang="ts">
const listData: Record<string, unknown>[] = []
for (let i = 0; i < 10; i++) {
  listData.push({
    title: `grid title ${i}`,
    content: 'content',
  })
}
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      listData,
    }
  },
})
</script>

<style lang="less" scoped></style>
