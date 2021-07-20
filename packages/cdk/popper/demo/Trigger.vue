<template>
  <ix-button ref="hoverTriggerRef" v-bind="hoverTriggerEvents">Hover</ix-button>
  <ix-button ref="clickTriggerRef" v-bind="clickTriggerEvents">Click</ix-button>
  <ix-button ref="focusTriggerRef" v-bind="focusTriggerEvents">Focus</ix-button>
  <ix-button ref="contextmenuTriggerRef" v-bind="contextmenuTriggerEvents">Contextmenu</ix-button>
  <ix-button ref="manualTriggerRef">Manual</ix-button>
  <ix-portal target="ix-overlay">
    <div v-if="hoverVisibility" ref="hoverOverlayRef" class="overlay overlay-hover" v-bind="hoverOverlayEvents">
      Hover
    </div>
    <div v-if="clickVisibility" ref="clickOverlayRef" class="overlay overlay-click" v-bind="clickOverlayEvents">
      Click
    </div>
    <div v-if="focusVisibility" ref="focusOverlayRef" class="overlay overlay-focus" v-bind="focusOverlayEvents">
      Focus
    </div>
    <div
      v-if="contextmenuVisibility"
      ref="contextmenuOverlayRef"
      class="overlay overlay-contextmenu"
      v-bind="contextmenuOverlayEvents"
    >
      Contextmenu
    </div>
    <div ref="manualOverlayRef" class="overlay overlay-manual">Manual</div>
  </ix-portal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { IxButton } from '@idux/components/button'
import { usePopper } from '@idux/cdk/popper'
import { IxPortal } from '@idux/cdk/portal'
export default defineComponent({
  name: 'Trigger',
  components: { IxButton, IxPortal },
  setup() {
    const hoverOverlay = usePopper({ trigger: 'hover', visible: false, allowEnter: true, hideDelay: 100 })
    const clickOverlay = usePopper({ trigger: 'click', visible: false })
    const focusOverlay = usePopper({ trigger: 'focus', visible: false })
    const contextmenuOverlay = usePopper({ trigger: 'contextmenu', visible: false })
    const manualOverlay = usePopper()
    onMounted(manualOverlay.initialize)
    return {
      /* hover */
      hoverTriggerRef: hoverOverlay.triggerRef,
      hoverTriggerEvents: hoverOverlay.triggerEvents,
      hoverOverlayRef: hoverOverlay.popperRef,
      hoverOverlayEvents: hoverOverlay.popperEvents,
      hoverVisibility: hoverOverlay.visibility,
      /* click */
      clickTriggerRef: clickOverlay.triggerRef,
      clickTriggerEvents: clickOverlay.triggerEvents,
      clickOverlayRef: clickOverlay.popperRef,
      clickOverlayEvents: clickOverlay.popperEvents,
      clickVisibility: clickOverlay.visibility,
      /* focus */
      focusTriggerRef: focusOverlay.triggerRef,
      focusTriggerEvents: focusOverlay.triggerEvents,
      focusOverlayRef: focusOverlay.popperRef,
      focusOverlayEvents: focusOverlay.popperEvents,
      focusVisibility: focusOverlay.visibility,
      /* contextmenu */
      contextmenuTriggerRef: contextmenuOverlay.triggerRef,
      contextmenuTriggerEvents: contextmenuOverlay.triggerEvents,
      contextmenuOverlayRef: contextmenuOverlay.popperRef,
      contextmenuOverlayEvents: contextmenuOverlay.popperEvents,
      contextmenuVisibility: contextmenuOverlay.visibility,
      /* manual */
      manualTriggerRef: manualOverlay.triggerRef,
      manualOverlayRef: manualOverlay.popperRef,
    }
  },
})
</script>

<style lang="less" scoped>
.ix-button {
  margin-right: 4px;
}
.overlay {
  display: inline-flex;
  width: 100px;
  height: 40px;
  align-items: center;
  justify-content: center;
  position: absolute;
  &-hover {
    background: pink;
  }
  &-click {
    background: purple;
    color: #fff;
  }
  &-focus {
    background: darkblue;
    color: #fff;
  }
  &-contextmenu {
    background: #eb4688;
    color: #fff;
  }
  &-manual {
    background: #008dff;
    color: #fff;
  }
}
</style>
