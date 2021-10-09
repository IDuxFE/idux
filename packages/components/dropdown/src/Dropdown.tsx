/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DropdownProps } from './types'
import type { DropdownConfig } from '@idux/components/config'

import { computed, defineComponent, provide } from 'vue'

import { IxOverlay, ɵUseVisibility } from '@idux/components/_private'
import { useGlobalConfig } from '@idux/components/config'

import { dropdownToken } from './token'
import { dropdownProps } from './types'

const defaultDelay: [number, number] = [0, 100]

export default defineComponent({
  name: 'IxDropdown',
  props: dropdownProps,
  setup(props, { slots }) {
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
          class="ix-dropdown"
          delay={defaultDelay}
          disabled={props.disabled}
          transitionName="ix-fade"
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
