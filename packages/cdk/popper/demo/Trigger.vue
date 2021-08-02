<template>
  <ix-space>
    <ix-button ref="hoverTriggerRef" v-bind="hoverTriggerEvents">Hover</ix-button>
    <ix-button ref="focusTriggerRef" v-bind="focusTriggerEvents">Focus</ix-button>
    <ix-button ref="clickTriggerRef" v-bind="clickTriggerEvents">Click</ix-button>
    <ix-button ref="contextmenuTriggerRef" v-bind="contextmenuTriggerEvents">Contextmenu</ix-button>
    <ix-button ref="manualTriggerRef" @click="manualUpdate({ visible: !manualVisibility })">Manual</ix-button>
  </ix-space>
  <ix-portal target="ix-popper">
    <div v-if="hoverVisibility" ref="hoverPopperRef" class="popper popper-hover" v-bind="hoverPopperEvents">Hover</div>
    <div v-if="focusVisibility" ref="focusPopperRef" class="popper popper-focus">Focus</div>
    <div v-if="clickVisibility" ref="clickPopperRef" class="popper popper-click">Click</div>
    <div v-if="contextmenuVisibility" ref="contextmenuPopperRef" class="popper popper-contextmenu">Contextmenu</div>
    <div v-if="manualVisibility" ref="manualPopperRef" class="popper popper-manual">Manual</div>
  </ix-portal>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { usePopper } from '@idux/cdk/popper'
import { IxPortal } from '@idux/cdk/portal'
import { IxButton } from '@idux/components/button'
import { IxSpace } from '@idux/components/space'

export default defineComponent({
  name: 'Trigger',
  components: { IxSpace, IxButton, IxPortal },
  setup() {
    const hoverPopper = usePopper({ delay: 100 })
    const focusPopper = usePopper({ trigger: 'focus' })
    const clickPopper = usePopper({ trigger: 'click' })
    const contextmenuPopper = usePopper({ trigger: 'contextmenu' })
    const manualPopper = usePopper({ trigger: 'manual' })

    const instances = [hoverPopper, focusPopper, clickPopper, contextmenuPopper, manualPopper]

    onMounted(() => {
      instances.forEach(item => item.initialize())
    })
    onBeforeUnmount(() => {
      instances.forEach(item => item.destroy())
    })

    return {
      /* hover */
      hoverTriggerRef: hoverPopper.triggerRef,
      hoverTriggerEvents: hoverPopper.triggerEvents,
      hoverPopperRef: hoverPopper.popperRef,
      hoverPopperEvents: hoverPopper.popperEvents,
      hoverVisibility: hoverPopper.visibility,
      /* focus */
      focusTriggerRef: focusPopper.triggerRef,
      focusTriggerEvents: focusPopper.triggerEvents,
      focusPopperRef: focusPopper.popperRef,
      focusVisibility: focusPopper.visibility,
      /* click */
      clickTriggerRef: clickPopper.triggerRef,
      clickTriggerEvents: clickPopper.triggerEvents,
      clickPopperRef: clickPopper.popperRef,
      clickVisibility: clickPopper.visibility,
      /* contextmenu */
      contextmenuTriggerRef: contextmenuPopper.triggerRef,
      contextmenuTriggerEvents: contextmenuPopper.triggerEvents,
      contextmenuPopperRef: contextmenuPopper.popperRef,
      contextmenuVisibility: contextmenuPopper.visibility,
      /* manual */
      manualTriggerRef: manualPopper.triggerRef,
      manualPopperRef: manualPopper.popperRef,
      manualVisibility: manualPopper.visibility,
      manualUpdate: manualPopper.update,
    }
  },
})
</script>

<style lang="less" scoped>
.popper {
  padding: 8px 16px;
  color: @white;

  &-hover {
    background: @red;
  }
  &-click {
    background: @orange;
  }
  &-focus {
    background: @gold;
  }
  &-contextmenu {
    background: @yellow;
  }
  &-manual {
    background: @primary;
  }
}
</style>
