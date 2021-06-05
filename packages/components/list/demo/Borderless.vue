<template>
  <ix-list header="Header" footer="Footer" :borderless="false">
    <ix-list-item v-for="item in listData" :key="item.title" :title="item.title" :content="item.content" />
  </ix-list>
</template>

<script lang="ts">
const listData: Record<string, unknown>[] = []
for (let i = 0; i < 5; i++) {
  listData.push({
    title: `idux list border ${i}`,
    content: 'Id magna ullamco eiusmod exercitation Lorem sint occaecat do consectetur culpa adipisicing.',
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
