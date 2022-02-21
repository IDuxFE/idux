/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass, provide } from 'vue'

import { type VKey, callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { ɵDropdownToken } from '@idux/components/dropdown'

import { useDataSource } from './composables/useDataSource'
import { useExpanded } from './composables/useExpanded'
import { useSelected } from './composables/useSelected'
import { coverChildren } from './contents/Utils'
import { menuToken } from './token'
import { menuProps } from './types'

export default defineComponent({
  name: 'IxMenu',
  props: menuProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-menu`)
    const config = useGlobalConfig('menu')

    const indent = computed(() => props.indent ?? config.indent)
    const mode = computed(() => props.mode)

    const theme = computed(() => props.theme ?? config.theme)

    const dropdownContext = inject(ɵDropdownToken, null)
    const { expandedKeys, handleExpand } = useExpanded(props)
    const { selectedKeys, handleSelected } = useSelected(props, dropdownContext)

    const handleClick = (key: VKey, type: 'item' | 'itemGroup' | 'sub', evt: Event) => {
      callEmit(props.onClick, { key, type, event: evt })
    }

    provide(menuToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      indent,
      mode,
      theme,
      expandedKeys,
      handleExpand,
      selectedKeys,
      handleSelected,
      handleClick,
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true,
        [`${prefixCls}-${mode.value}`]: true,
        [`${prefixCls}-collapsed`]: props.collapsed,
        [`${prefixCls}-dropdown`]: !!dropdownContext,
      })
    })
    const dateSource = useDataSource(props, slots)

    return () => {
      return <ul class={classes.value}>{coverChildren(dateSource.value)}</ul>
    }
  },
})
