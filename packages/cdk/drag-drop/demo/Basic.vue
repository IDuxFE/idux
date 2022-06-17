<template>
  <div id="testBlock" ref="contextRef">
    <!-- use composition api-->
    <IxButton ref="dragRef1">局部拖放</IxButton>
    <IxButton ref="dragRef2">全屏拖放</IxButton>

    <!--or use component -->
    <CdkDraggable free>
      <IxButton> 局部拖放(组件方式）</IxButton>
    </CdkDraggable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { useDraggable } from '@idux/cdk/drag-drop'

const dragRef1 = ref()
const dragRef2 = ref()

useDraggable(dragRef1, { free: true })
useDraggable(dragRef2, { free: true, boundary: document.documentElement })
</script>
<style>
#testBlock {
  width: 400px;
  height: 200px;
  border: 1px dashed;
}
</style>
