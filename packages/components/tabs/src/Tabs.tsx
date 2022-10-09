/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent } from 'vue'

import { type VKey, flattenNode, useControlledProp } from '@idux/cdk/utils'

import InternalTabs from './InternalTabs'
import { tabsProps } from './types'

export default defineComponent({
  name: 'IxTabs',
  inheritAttrs: false,
  props: tabsProps,
  setup(props, { attrs, slots }) {
    return () => {
      const tabVNodes = flattenNode(slots.default?.(), { key: '__IDUX_TAB' })

      const [, setSelectedKey] = useControlledProp(props, 'selectedKey')

      const handleChange = (key: VKey) => {
        setSelectedKey(key)
      }

      const internalTabsProps = {
        ...props,
        tabs: tabVNodes,
        'onUpdate:selectedKey': handleChange,
      }

      return <InternalTabs {...internalTabsProps} {...attrs} v-slots={slots} />
    }
  },
})
