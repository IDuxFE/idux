/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, provide, toRef } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'
import { useThemeToken } from '@idux/components/theme'

import { dropdownToken } from './token'
import { dropdownProps } from './types'
import { getThemeTokens } from '../theme'

const defaultDelay: [number, number] = [0, 100]

export default defineComponent({
  name: 'IxDropdown',
  props: dropdownProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const { globalHashId, hashId, registerToken } = useThemeToken('dropdown')
    registerToken(getThemeTokens)

    const config = useGlobalConfig('dropdown')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-dropdown`)

    const [visibility, setVisibility] = useControlledProp(props, 'visible', false)

    provide(dropdownToken, { hideOnClick: toRef(props, 'hideOnClick'), setVisibility })

    return () => {
      const { trigger = config.trigger, placement = config.placement } = props

      const overlayProps = {
        class: [mergedPrefixCls.value, globalHashId.value, hashId.value],
        autoAdjust: props.autoAdjust ?? config.autoAdjust,
        clickOutside: trigger === 'click' || trigger === 'contextmenu',
        container: props.overlayContainer ?? config.overlayContainer,
        containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
        delay: defaultDelay,
        destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
        disabled: props.disabled,
        offset: props.offset ?? config.offset,
        placement,
        showArrow: props.showArrow ?? config.showArrow,
        transitionName: `${common.prefixCls}-slide-auto`,
        trigger,
        visible: visibility.value,
        ['onUpdate:visible']: setVisibility,
      } as const

      return <ɵOverlay v-slots={{ default: slots.default, content: slots.overlay }} {...overlayProps} />
    }
  },
})
