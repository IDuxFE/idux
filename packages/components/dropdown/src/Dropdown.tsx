import type { DropdownConfig } from '@idux/components/config'
import type { DropdownProps } from './types'

import { computed, defineComponent, provide } from 'vue'
import { IxOverlay, ɵUseVisibility } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'
import { dropdownProps } from './types'
import { dropdownToken } from './token'

const defaultDelay: [number, number] = [0, 100]

export default defineComponent({
  name: 'IxDropdown',
  props: dropdownProps,
  setup(props, { slots }) {
    const config = useGlobalConfig('dropdown')
    const configProps = useConfigProps(props, config)
    const visibility = ɵUseVisibility(props)

    const onMouseOverlayChang = (open: boolean) => {
      if (configProps.value.target === 'hover') {
        visibility.value = open
      }
    }

    const setMenuOpenState = (open: boolean) => {
      visibility.value = open
    }

    provide(dropdownToken, { setMenuOpenState, onMouseOverlayChang })

    return () => {
      return (
        <IxOverlay
          v-model={[visibility.value, 'visible']}
          v-slots={{ default: slots.default, content: slots.overlay }}
          class="ix-dropdown"
          delay={defaultDelay}
          transitionName="ix-fade"
          {...configProps.value}
        />
      )
    }
  },
})

export function useConfigProps(props: DropdownProps, config: DropdownConfig) {
  return computed(() => {
    const trigger = props.trigger ?? config.trigger
    return {
      autoAdjust: props.autoAdjust ?? config.autoAdjust,
      clickOutside: trigger === 'click' || trigger === 'contextmenu',
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      offset: props.offset ?? config.offset,
      placement: props.placement ?? config.placement,
      showArrow: props.showArrow ?? config.showArrow,
      target: props.target ?? config.target,
      trigger: trigger,
    }
  })
}
