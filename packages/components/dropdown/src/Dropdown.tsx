/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, toRef } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { type DropdownConfig, useGlobalConfig } from '@idux/components/config'
import { useOverlayContainer } from '@idux/components/utils'

import { dropdownToken } from './token'
import { type DropdownProps, dropdownProps } from './types'

const defaultDelay: [number, number] = [0, 100]

export default defineComponent({
  name: 'IxDropdown',
  props: dropdownProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('dropdown')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-dropdown`)
    const mergedOverlayContainer = useOverlayContainer(props, config, common, mergedPrefixCls)

    const [visibility, setVisibility] = useControlledProp(props, 'visible', false)
    const configProps = useConfigProps(props, config, setVisibility)

    provide(dropdownToken, { hideOnClick: toRef(props, 'hideOnClick'), setVisibility })

    return () => {
      return (
        <ɵOverlay
          visible={visibility.value}
          v-slots={{ default: slots.default, content: slots.overlay }}
          class={mergedPrefixCls.value}
          container={mergedOverlayContainer.value}
          delay={defaultDelay}
          disabled={props.disabled}
          transitionName={`${common.prefixCls}-fade`}
          {...configProps.value}
        />
      )
    }
  },
})

function useConfigProps(props: DropdownProps, config: DropdownConfig, setVisibility: (value: boolean) => void) {
  return computed(() => {
    const trigger = props.trigger ?? config.trigger
    return {
      autoAdjust: props.autoAdjust ?? config.autoAdjust,
      clickOutside: trigger === 'click' || trigger === 'contextmenu',
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      offset: props.offset ?? config.offset,
      placement: props.placement ?? config.placement,
      showArrow: props.showArrow ?? config.showArrow,
      trigger: trigger,
      ['onUpdate:visible']: setVisibility,
    }
  })
}
