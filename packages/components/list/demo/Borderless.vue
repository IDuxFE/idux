<template>
  <IxList header="Header" footer="Footer" :borderless="false">
    <IxList-item v-for="item in listData" :key="item.title" :title="item.title" :content="item.content" />
  </IxList>
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
