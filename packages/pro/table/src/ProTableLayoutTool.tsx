/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject, normalizeClass } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { IxPopover } from '@idux/components/popover'
import { TableSize } from '@idux/components/table'

import LayoutToolContent from './contents/LayoutToolContent'
import { proTableToken } from './token'
import { proTableLayoutToolProps } from './types'

const defaultOffset: [number, number] = [0, 4]
const defaultIconMap = {
  sm: 'layout-compact',
  md: 'layout-medium',
  lg: 'layout-large',
} as const

export default defineComponent({
  name: 'IxProTableLayoutTool',
  props: proTableLayoutToolProps,
  setup(props, { slots }) {
    const { locale, mergedPrefixCls, mergedSize, setMergedSize } = inject(proTableToken)!

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-layout-tool`
      const layoutLocale = locale.table.layout
      const size = mergedSize.value
      const renderIcon = (type: TableSize) => {
        const name = defaultIconMap[type]
        const title = layoutLocale[type]
        return (
          <IxIcon
            key={name}
            class={normalizeClass([`${prefixCls}-header-icon`, size === type ? `${prefixCls}-header-icon-active` : ''])}
            name={name}
            title={title}
            onClick={() => setMergedSize(type)}
          />
        )
      }
      const suffixNode = [renderIcon('sm'), renderIcon('md'), renderIcon('lg')]
      const popoverHeader = { title: layoutLocale.title, suffix: suffixNode }

      return (
        <IxPopover
          v-slots={{
            default:
              slots.default ??
              (() => (
                <span class={`${prefixCls}-trigger`}>
                  <IxIcon name="ellipsis" />
                </span>
              )),
            content: () => <LayoutToolContent {...props} />,
          }}
          class={prefixCls}
          header={popoverHeader}
          offset={defaultOffset}
          placement="bottomEnd"
          showArrow={false}
          trigger="click"
        ></IxPopover>
      )
    }
  },
})
