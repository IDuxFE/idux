/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type PropType, type VNode, computed, defineComponent, inject, normalizeClass } from 'vue'

import { CdkVirtualScroll, type VirtualItemRenderFn } from '@idux/cdk/scroll'
import { ɵEmpty } from '@idux/components/_private/empty'

import { type MergedData } from '../composables/useDataSource'
import { cascaderToken } from '../token'
import OverlayOption from './OverlayOption'

export default defineComponent({
  props: {
    dataSource: { type: Array as PropType<MergedData[]>, required: true },
  },
  setup(props) {
    const { props: cascaderProps, slots, mergedPrefixCls } = inject(cascaderToken)!

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-option-group`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-empty`]: props.dataSource.length === 0,
      })
    })

    return () => {
      const { dataSource } = props
      let children: VNode
      if (dataSource.length > 0) {
        const { overlayHeight, overlayItemHeight, virtual } = cascaderProps
        const itemRender: VirtualItemRenderFn<MergedData> = ({ item, index }) => (
          <OverlayOption index={index} {...item} />
        )
        children = (
          <CdkVirtualScroll
            dataSource={dataSource}
            getKey="key"
            height={overlayHeight}
            itemHeight={overlayItemHeight}
            itemRender={itemRender}
            virtual={virtual}
          />
        )
      } else {
        children = <ɵEmpty v-slots={slots} empty={cascaderProps.empty} />
      }

      return <div class={classes.value}>{children}</div>
    }
  },
})
