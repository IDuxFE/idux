<template>
  <h3 style="margin: 16px 0">Large</h3>
  <IxList header="Header" footer="Footer" :borderless="false" size="lg">
    <IxList-item v-for="item in listData" :key="item.title" :title="item.title" :content="item.content" />
  </IxList>
  <h3 style="margin: 16px 0">Medium (default)</h3>
  <IxList header="Header" footer="Footer" :borderless="false">
    <IxList-item v-for="item in listData" :key="item.title" :title="item.title" :content="item.content" />
  </IxList>
  <h3 style="margin: 16px 0">Small</h3>
  <IxList header="Header" footer="Footer" :borderless="false" size="sm">
    <IxList-item v-for="item in listData" :key="item.title" :title="item.title" :content="item.content" />
  </IxList>
</template>

<script lang="ts">
const listData: Record<string, unknown>[] = []
for (let i = 0; i < 3; i++) {
  listData.push({
    title: `idux list size: ${i}`,
    content:
      'In sunt exercitation pariatur irure aliqua proident cillum velit laboris veniam. Pariatur ullamco est consequat ad nisi reprehenderit culpa magna id elit ut veniam.',
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
