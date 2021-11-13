/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedOption } from '../composables/useOptions'

import { defineComponent, inject, onMounted } from 'vue'

import { CdkVirtualScroll, VirtualItemRenderFn } from '@idux/cdk/scroll'
import { callEmit } from '@idux/cdk/utils'
import { ɵEmpty } from '@idux/components/_private'

import { selectToken } from '../token'
import ListBox from './ListBox'
import Option from './Option'
import OptionGroup from './OptionGroup'

export default defineComponent({
  setup() {
    const { props, slots, flattedOptions, virtualScrollRef, scrollToActivated } = inject(selectToken)!

    onMounted(() => scrollToActivated())

    const handleScrolledChange = (startIndex: number, endIndex: number, visibleOptions: MergedOption[]) => {
      const { onScrolledChange } = props
      if (onScrolledChange) {
        callEmit(
          onScrolledChange,
          startIndex,
          endIndex,
          visibleOptions.map(item => item.rawOption),
        )
      }
    }

    return () => {
      const { overlayHeight, overlayItemHeight, virtual, onScroll, onScrolledBottom, overlayRender } = props
      const options = flattedOptions.value
      const children = [<ListBox />]
      if (options.length > 0) {
        const itemRender: VirtualItemRenderFn<MergedOption> = ({ item, index }) => {
          const { type, ...rest } = item
          return type === 'group' ? <OptionGroup {...rest} /> : <Option index={index} {...rest} />
        }

        children.push(
          <CdkVirtualScroll
            ref={virtualScrollRef}
            dataSource={options}
            height={overlayHeight}
            itemHeight={overlayItemHeight}
            itemKey="key"
            itemRender={itemRender}
            virtual={virtual}
            onScroll={onScroll}
            onScrolledBottom={onScrolledBottom}
            onScrolledChange={handleScrolledChange}
          />,
        )
      } else {
        children.push(<ɵEmpty v-slots={slots} empty={props.empty} />)
      }

      return overlayRender ? overlayRender(children) : <div>{children}</div>
    }
  },
})
