<template>
  <IxSpace vertical>
    <CdkDndSortable :dataSource="dataSource" :preview="preview" :onSortChange="onSortChange">
      <div ref="listRef" class="dnd-list">
        <CdkDndSortableItem v-for="item in dataSource" :key="item.key" :itemKey="item.key" class="dnd-list__item">
          {{ item.label }}
        </CdkDndSortableItem>
      </div>
      <template #preview="{ key, data }">
        <div class="dnd-list__preview" :style="{ background: key === 'key-0' ? 'red' : 'blue' }">
          I am preview of {{ data.label }}
        </div>
      </template>
    </CdkDndSortable>
    <IxSwitch v-model:checked="preview">
      <template #label="{ checked }">
        {{ checked ? 'enable preview' : 'disable preview' }}
      </template>
    </IxSwitch>
  </IxSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ListData {
  key: string
  label: string
}

const preview = ref(true)
const dataSource = ref<ListData[]>(
  Array.from({ length: 2 }).map((_, idx) => {
    return {
      key: `key-${idx}`,
      label: `list item ${idx}`,
    }
  }),
)

const onSortChange = (newData: ListData[]) => {
  dataSource.value = newData
}
</script>

<style scoped lang="less">
.dnd-list {
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid red;

  &__item {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: 48px;
    padding: 0 16px;

    &:not(&:last-child) {
      border-bottom: 1px solid red;
    }
  }

  &__preview {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 50px;
    border-radius: 3px;
    font-size: 16px;
  }
}
</style>
