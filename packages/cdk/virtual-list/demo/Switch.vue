<template>
  <ix-virtual-list :data="data" :height="height" itemKey="id" :itemHeight="20" :itemRender="itemRender">
  </ix-virtual-list>

  <ix-space>
    DataLength:
    <ix-radio-group v-model:value="dataLength">
      <ix-radio :value="0">0</ix-radio>
      <ix-radio :value="5">5</ix-radio>
      <ix-radio :value="20">20</ix-radio>
      <ix-radio :value="100">100</ix-radio>
    </ix-radio-group>
  </ix-space>
  <br />
  <ix-space>
    Height:
    <ix-radio-group v-model:value="height">
      <ix-radio :value="0">0</ix-radio>
      <ix-radio :value="100">100</ix-radio>
      <ix-radio :value="200">200</ix-radio>
    </ix-radio-group>
  </ix-space>
  <br />
  <ix-space>
    ItemRender:
    <ix-radio-group v-model:value="switchItemRender">
      <ix-radio :value="true">ID</ix-radio>
      <ix-radio :value="false">Index</ix-radio>
    </ix-radio-group>
  </ix-space>
</template>

<script lang="ts">
import { computed, defineComponent, h, ref } from 'vue'
import { VirtualListInstance, ItemRender } from '@idux/cdk/virtual-list'

const getData = (length: number, key = 'id') => {
  const data: { id: string }[] = []
  for (let index = 0; index < length; index++) {
    data.push({ id: `${key}-${index}` })
  }
  return data
}

export default defineComponent({
  setup() {
    const listRef = ref<VirtualListInstance>()
    const dataLength = ref(20)
    const data = computed(() => getData(dataLength.value))
    const height = ref(200)
    const switchItemRender = ref(false)
    const itemRender = computed<ItemRender>(() => {
      if (switchItemRender.value) {
        return ({ item }) => h('div', { style: { height: '20px', paddingLeft: '8px' } }, [`${item.id}`])
      } else {
        return ({ index }) => h('span', { style: { height: '20px', paddingLeft: '8px' } }, [`index-${index}`])
      }
    })

    return { listRef, dataLength, data, height, switchItemRender, itemRender }
  },
})
</script>

<style lang="less" scoped>
.ix-virtual-list {
  border: 1px solid red;
  margin-bottom: 8px;
}
</style>
