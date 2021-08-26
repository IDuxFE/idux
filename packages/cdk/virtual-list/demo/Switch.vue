<template>
  <IxVirtualList :data="data" :height="height" itemKey="id" :itemHeight="20" :itemRender="itemRender"> </IxVirtualList>

  <IxSpace>
    DataLength:
    <IxRadioGroup v-model:value="dataLength">
      <IxRadio :value="0">0</IxRadio>
      <IxRadio :value="5">5</IxRadio>
      <IxRadio :value="20">20</IxRadio>
      <IxRadio :value="100">100</IxRadio>
    </IxRadioGroup>
  </IxSpace>
  <br />
  <IxSpace>
    Height:
    <IxRadioGroup v-model:value="height">
      <IxRadio :value="0">0</IxRadio>
      <IxRadio :value="100">100</IxRadio>
      <IxRadio :value="200">200</IxRadio>
    </IxRadioGroup>
  </IxSpace>
  <br />
  <IxSpace>
    ItemRender:
    <IxRadioGroup v-model:value="switchItemRender">
      <IxRadio :value="true">ID</IxRadio>
      <IxRadio :value="false">Index</IxRadio>
    </IxRadioGroup>
  </IxSpace>
</template>

<script lang="ts">
import { computed, defineComponent, h, ref } from 'vue'
import { VirtualListInstance, VirtualItemRenderFn } from '@idux/cdk/virtual-list'

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
    const itemRender = computed<VirtualItemRenderFn>(() => {
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
