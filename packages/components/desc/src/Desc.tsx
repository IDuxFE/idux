/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide } from 'vue'

import { ɵHeader } from '@idux/components/_private/header'
import { useGlobalConfig } from '@idux/components/config'
import { IxRow } from '@idux/components/grid'

import { descToken } from './token'
import { descProps } from './types'

export default defineComponent({
  name: 'IxDesc',
  props: descProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('desc')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-desc`)
    const mergedCol = computed(() => props.col ?? config.col)
    const mergedColonless = computed(() => props.colonless ?? config.colonless)
    const mergedLabelAlign = computed(() => props.labelAlign ?? config.labelAlign)
    const mergedLabelWidth = computed(() => props.labelWidth)
    const mergedSize = computed(() => props.size ?? config.size)

    provide(descToken, { mergedPrefixCls, mergedCol, mergedColonless, mergedLabelAlign, mergedLabelWidth })

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      const { layout = config.layout } = props
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${mergedSize.value}`]: true,
        [`${prefixCls}-vertical`]: layout === 'vertical',
      })
    })

    return () => {
      return (
        <IxRow class={classes.value}>
          <ɵHeader
            v-slots={{ header: slots.header, closeIcon: slots.suffix }}
            header={props.header}
            size={mergedSize.value === 'lg' ? 'md' : 'sm'}
          />
          {slots.default && slots.default()}
        </IxRow>
      )
    }
  },
})
