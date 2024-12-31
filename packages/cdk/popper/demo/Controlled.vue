<template>
  <IxSpace align="center">
    <IxButton ref="triggerRef" v-bind="triggerEvents">Trigger</IxButton>
    <IxButton @click="toggleVisible">Toggle Visible</IxButton>
    <IxRadioGroup v-model:value="trigger">
      <IxRadio value="hover">hover</IxRadio>
      <IxRadio value="click">click</IxRadio>
      <IxRadio value="focus">focus</IxRadio>
      <IxRadio value="contextmenu">contextmenu</IxRadio>
    </IxRadioGroup>
  </IxSpace>
  <div v-if="visibility" ref="popperRef" class="popper" v-bind="popperEvents">
    <div>Popper Element</div>
    <br />
    <IxButton @click="toggleLocked">{{ visibleLocked ? 'Unlock' : 'Lock' }}</IxButton>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { PopperTrigger, usePopper } from '@idux/cdk/popper'

const visibleRef = ref(false)
const trigger = ref<PopperTrigger>('hover')
const visibleLocked = ref(false)

const toggleLocked = () => {
  visibleLocked.value = !visibleLocked.value
}

const onVisibleChange = (v: boolean) => {
  if (visibleLocked.value) {
    return
  }

  visibleRef.value = v
}
const toggleVisible = () => {
  onVisibleChange(!visibleRef.value)
}

const { initialize, destroy, popperRef, popperEvents, triggerRef, triggerEvents, visibility } = usePopper({
  visible: visibleRef,
  trigger,
  onVisibleChange,
})
onMounted(() => initialize())
onBeforeUnmount(() => destroy())
</script>

<style lang="less" scoped>
.popper {
  padding: 8px;
  color: #fff;
  background: #7824ff;
}
</style>
