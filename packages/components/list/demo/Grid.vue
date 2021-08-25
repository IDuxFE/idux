<template>
  <IxList :grid="{ gutter: [30, 20], column: 3, xs: 2, sm: 3, md: 4, lg: 5, xl: 3 }">
    <IxList-item v-for="item in listData" :key="item.title">
      <IxCard :title="item.title">
        <p>{{ item.content }}</p>
      </IxCard>
    </IxList-item>
  </IxList>
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
