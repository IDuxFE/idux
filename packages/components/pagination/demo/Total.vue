<template>
  <IxPagination :pageIndex="1" :total="500" :showTotal="false" />
  <br />
  <IxPagination :pageIndex="1" :total="500" :totalRender="totalRender" />
  <br />
  <IxPagination :pageIndex="1" :total="500">
    <template #total="{ total, range }">
      <span>{{ range[0] }}-{{ range[1] }} of {{ total }} items</span>
    </template>
  </IxPagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const totalRender = (options: { total: number; range: [number, number] }) => {
      const { total, range } = options
      return `${range[0]}-${range[1]} of ${total} items`
    }

    return { totalRender }
  },
})
</script>
