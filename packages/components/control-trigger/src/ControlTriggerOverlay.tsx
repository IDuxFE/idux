/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, onMounted, ref } from 'vue'

import { ɵOverlay, type ɵOverlayInstance } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'

import { controlTriggerToken } from './token'
import { controlTrigglerOverlayProps } from './types'

const defaultOffset: [number, number] = [0, 4]

export default defineComponent({
  name: 'IxControlTriggerOverlay',
  inheritAttrs: false,
  props: controlTrigglerOverlayProps,
  setup(props, { expose, slots, attrs }) {
    const common = useGlobalConfig('common')
    const { props: controlTriggerProps, mergedPrefixCls, bindOverlayMonitor } = inject(controlTriggerToken)!

    const overlayRef = ref<ɵOverlayInstance>()
    const updatePopper = () => {
      overlayRef.value?.updatePopper()
    }

    expose({ updatePopper })

    const overlayProps = computed(() => {
      return {
        clickOutside: false,
        container: controlTriggerProps.overlayContainer,
        containerFallback:
          controlTriggerProps.overlayContainerFallback ?? `.${mergedPrefixCls.value}-overlay-container`,
        disabled: controlTriggerProps.disabled || controlTriggerProps.readonly,
        offset: controlTriggerProps.offset ?? defaultOffset,
        placement: props.placement ?? 'bottomStart',
        transitionName: `${common.prefixCls}-slide-auto`,
        trigger: props.trigger ?? 'click',
        triggerId: attrs.id,
        visible: props.visible,
        'onUpdate:visible': props['onUpdate:visible'],
        onAfterLeave: props.onAfterLeave,
      } as const
    })

    const overlayOpened = computed(() => props.visible ?? false)

    onMounted(() => {
      bindOverlayMonitor(overlayRef, overlayOpened)
    })

    return () => <ɵOverlay ref={overlayRef} tabindex={-1} {...overlayProps.value} {...attrs} v-slots={slots} />
  },
})
