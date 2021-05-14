<template>
  <div class="list-wrapper">
    <ix-virtual-list
      ref="listRef"
      component="ul"
      :data="data"
      :height="200"
      :itemHeight="20"
      itemKey="id"
      @scroll="onScroll"
    >
      <template #item="{ item, index }">
        <span class="virtual-item" @click="onItemClick(item.id)">{{ item.id }} - {{ index }}</span>
      </template>
    </ix-virtual-list>

    <ix-space>
      <ix-button @click="scrollTo(100)"> Scroll To 100px </ix-button>
      <ix-button @click="scrollTo({ key: 'id-50', align: 'top' })"> Scroll To id-50(top) </ix-button>
      <ix-button @click="scrollTo({ index: 40, align: 'top' })"> Scroll To 40(top) </ix-button>
      <ix-button @click="scrollTo({ index: 40, align: 'bottom' })"> Scroll To 40(bottom) </ix-button>
      <ix-button @click="scrollTo({ index: 40, align: 'auto' })"> Scroll To 40(auto) </ix-button>
      <ix-button @click="scrollTo({ index: 40, align: 'top', offset: 15 })"> Scroll To 40(top) + 15 offset </ix-button>
    </ix-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VirtualListInstance, ScrollToOptions } from '@idux/cdk/virtual-list'

export default defineComponent({
  setup() {
    const listRef = ref<VirtualListInstance>()
    const data: { id: string }[] = []
    for (let index = 0; index < 1000; index++) {
      data.push({ id: `id-${index}` })
    }

    const onScroll = (evt: Event) => {
      console.log('scroll:', evt.currentTarget!.scrollTop)
    }

    const onItemClick = (id: string) => {
      console.log('click:', id)
    }

    const scrollTo = (value: number | ScrollToOptions) => listRef.value?.scrollTo(value)

    return { listRef, data, onScroll, onItemClick, scrollTo }
  },
})
</script>

<style lang="less" scoped>
.list-wrapper {
  height: 240px;
}

.ix-virtual-list {
  border: 1px solid red;
  margin-bottom: 8px;
}

.virtual-item {
  padding-left: 16px;
  border: 1px solid gray;
  height: 20px;
  line-height: 18px;
}
</style>
