<template>
  <div class="scroll-wrapper">
    <IxVirtualScroll ref="listRef" :data="data" :height="200" :itemHeight="20" itemKey="key" @scroll="onScroll">
      <template #item="{ item, index }">
        <span class="virtual-item" @click="onItemClick(item.key)">{{ item.key }} - {{ index }}</span>
      </template>
    </IxVirtualScroll>

    <IxSpace>
      <IxButton @click="scrollTo(100)"> Scroll To 100px </IxButton>
      <IxButton @click="scrollTo({ key: 'key-50', align: 'top' })"> Scroll To key-50(top) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'top' })"> Scroll To 40(top) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'bottom' })"> Scroll To 40(bottom) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'auto' })"> Scroll To 40(auto) </IxButton>
      <IxButton @click="scrollTo({ index: 40, align: 'top', offset: 15 })"> Scroll To 40(top) + 15 offset </IxButton>
    </IxSpace>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VirtualScrollInstance, VirtualScrollToOptions } from '@idux/cdk/scroll'

export default defineComponent({
  setup() {
    const listRef = ref<VirtualScrollInstance>()
    const data: { key: string }[] = []
    for (let index = 0; index < 1000; index++) {
      data.push({ key: `key-${index}` })
    }

    const onScroll = (evt: Event) => {
      console.log('scroll:', evt.currentTarget!.scrollTop)
    }

    const onItemClick = (key: string) => {
      console.log('click:', key)
    }

    const scrollTo = (value: number | VirtualScrollToOptions) => listRef.value?.scrollTo(value)

    return { listRef, data, onScroll, onItemClick, scrollTo }
  },
})
</script>

<style lang="less" scoped>
.scroll-wrapper {
  height: 240px;
}

.ix-virtual-scroll {
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
