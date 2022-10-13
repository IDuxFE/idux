<template>
  <div ref="dragRef" class="test-block">
    <IxSpace>
      <IxSwitch v-model:checked="checkedRef" :labels="['原生', '模拟']"></IxSwitch>
      <IxButton ref="dragHandleRef">通过把手拖动</IxButton>
    </IxSpace>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'

import { DnDBackendType, useDraggable } from '@idux/cdk/drag-drop'

const dragRef = ref(null)
const dragHandleRef = ref(null)
const checkedRef = ref(false)
const currBackend = computed<DnDBackendType>(() => (checkedRef.value ? 'native' : 'pointer'))

const options = reactive({
  handle: dragHandleRef,
  free: true,
  backend: currBackend.value,
})

useDraggable(dragRef, options)

watchEffect(() => {
  options.backend = currBackend.value
})
</script>

<style scoped lang="less">
.test-block {
  width: 180px;
  height: 130px;
  padding: 30px;
  border: 1px dashed;
}
</style>
