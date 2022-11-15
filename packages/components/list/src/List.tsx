/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { getFirstValidNode } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private/empty'
import { useGlobalConfig } from '@idux/components/config'
import { IxRow } from '@idux/components/grid'
import { IxSpin } from '@idux/components/spin'

import { listToken } from './token'
import { ListProps, listProps } from './types'

export default defineComponent({
  name: 'IxList',
  props: listProps,
  setup(props: ListProps, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-list`)
    const listConfig = useGlobalConfig('list')

    provide(listToken, {
      props,
      mergedPrefixCls,
    })

    const loadingProp = computed(() => {
      if (typeof props.loading === 'boolean') {
        return {
          spinning: props.loading,
        }
      }
      return props.loading
    })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const borderless = props.borderless ?? listConfig.borderless
      const size = props.size ?? listConfig.size
      return normalizeClass({
        [`${prefixCls}`]: true,
        [`${prefixCls}-split`]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-border`]: !borderless,
      })
    })

    return () => {
      const header = props.header ?? slots.header?.()
      const footer = props.footer ?? slots.footer?.()
      const children = slots.default ? slots.default() : []
      const content = getFirstValidNode(children) ? children : <ɵEmpty v-slots={slots} empty={props.empty} />

      const renderContent = () => {
        if (props.grid) {
          return <IxRow gutter={props.grid.gutter}>{content}</IxRow>
        }
        return <div>{content}</div>
      }

      return (
        <div class={classes.value}>
          {header && <div class={`${mergedPrefixCls.value}-header`}>{header}</div>}
          <IxSpin {...loadingProp.value}>{renderContent()}</IxSpin>
          {footer && <div class={`${mergedPrefixCls.value}-footer`}>{footer}</div>}
        </div>
      )
    }
  },
})
