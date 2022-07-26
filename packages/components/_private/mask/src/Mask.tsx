/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Transition, computed, defineComponent } from 'vue'

import { useGlobalConfig } from '@idux/components/config'

import { maskProps } from './types'

export default defineComponent({
  name: 'ɵMask',
  props: maskProps,
  setup(props) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-mask`)

    return () => {
      const { mask, transitionName, visible, zIndex } = props
      if (!mask) {
        return null
      }
      return (
        <Transition appear name={transitionName ?? `${common.prefixCls}-fade`}>
          <div v-show={visible} class={mergedPrefixCls.value} style={{ zIndex }}></div>
        </Transition>
      )
    }
  },
})
