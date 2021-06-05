<template>
  <ix-list header="Header" footer="Footer">
    <ix-list-item v-for="item in listData" :key="item.title" :content="item.content" />
  </ix-list>
</template>

<script lang="ts">
const listData: Record<string, unknown>[] = []
for (let i = 0; i < 5; i++) {
  listData.push({
    title: `idux list part ${i}`,
    content: 'Adipisicing pariatur cupidatat deserunt sint dolor sint proident anim voluptate dolore.',
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
