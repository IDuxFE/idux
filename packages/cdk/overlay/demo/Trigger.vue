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
import { useOverlay } from '@idux/cdk/overlay'
import { IxPortal } from '@idux/cdk/portal'

export default defineComponent({
  name: 'Trigger',
  components: { IxButton, IxPortal },
  setup() {
    const hoverOverlay = useOverlay({ trigger: 'hover', visible: false, allowEnter: true, hideDelay: 100 })
    const clickOverlay = useOverlay({ trigger: 'click', visible: false })
    const focusOverlay = useOverlay({ trigger: 'focus', visible: false })
    const contextmenuOverlay = useOverlay({ trigger: 'contextmenu', visible: false })
    const manualOverlay = useOverlay()

    onMounted(manualOverlay.initialize)

    return {
      /* hover */
      hoverTriggerRef: hoverOverlay.triggerRef,
      hoverTriggerEvents: hoverOverlay.triggerEvents,
      hoverOverlayRef: hoverOverlay.overlayRef,
      hoverOverlayEvents: hoverOverlay.overlayEvents,
      hoverVisibility: hoverOverlay.visibility,
      /* click */
      clickTriggerRef: clickOverlay.triggerRef,
      clickTriggerEvents: clickOverlay.triggerEvents,
      clickOverlayRef: clickOverlay.overlayRef,
      clickOverlayEvents: clickOverlay.overlayEvents,
      clickVisibility: clickOverlay.visibility,
      /* focus */
      focusTriggerRef: focusOverlay.triggerRef,
      focusTriggerEvents: focusOverlay.triggerEvents,
      focusOverlayRef: focusOverlay.overlayRef,
      focusOverlayEvents: focusOverlay.overlayEvents,
      focusVisibility: focusOverlay.visibility,
      /* contextmenu */
      contextmenuTriggerRef: contextmenuOverlay.triggerRef,
      contextmenuTriggerEvents: contextmenuOverlay.triggerEvents,
      contextmenuOverlayRef: contextmenuOverlay.overlayRef,
      contextmenuOverlayEvents: contextmenuOverlay.overlayEvents,
      contextmenuVisibility: contextmenuOverlay.visibility,
      /* manual */
      manualTriggerRef: manualOverlay.triggerRef,
      manualOverlayRef: manualOverlay.overlayRef,
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
