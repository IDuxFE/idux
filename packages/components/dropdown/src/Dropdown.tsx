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
    const { prefixCls } = useGlobalConfig('common')
    const config = useGlobalConfig('dropdown')
    const configProps = useConfigProps(props, config)
    const visibility = ɵUseVisibility(props)

    const changeVisible = (visible: boolean) => {
      visibility.value = visible
    }

    provide(dropdownToken, { changeVisible })

    return () => {
      return (
        <IxOverlay
          v-model={[visibility.value, 'visible']}
          v-slots={{ default: slots.default, content: slots.overlay }}
          class={`${prefixCls}-dropdown`}
          delay={defaultDelay}
          disabled={props.disabled}
          transitionName={`${prefixCls}-fade`}
          {...configProps.value}
        />
      )
    }
  },
})

function useConfigProps(props: DropdownProps, config: DropdownConfig) {
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
