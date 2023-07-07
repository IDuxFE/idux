/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { IxPopover } from '@idux/components/popover'
import { IxSpace } from '@idux/components/space'
import { TableSize } from '@idux/components/table'

import LayoutToolContent from './contents/LayoutToolContent'
import { proTableToken } from './token'
import { proTableLayoutToolProps } from './types'

const defaultOffset: [number, number] = [0, 4]
const defaultIconMap = {
  sm: 'grid-compact',
  md: 'grid-medium',
  lg: 'grid-loose',
} as const

export default defineComponent({
  name: 'IxProTableLayoutTool',
  props: proTableLayoutToolProps,
  setup(props, { slots }) {
    const { config, locale, mergedPrefixCls, mergedSize, setMergedSize } = inject(proTableToken)!

    const mergedChangeSize = computed(() => props.changeSize ?? config.layoutTool.changeSize)
    const mergedResetable = computed(() => props.resetable ?? config.layoutTool.resetable)
    const mergedSearchable = computed(() => props.searchable ?? config.layoutTool.searchable)

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-layout-tool`
      const layoutLocale = locale.table.layout

      const renderIcon = (type: TableSize) => {
        const name = defaultIconMap[type]
        const title = layoutLocale[type]
        return (
          <IxIcon
            key={name}
            class={normalizeClass([
              `${prefixCls}-header-icon`,
              mergedSize.value === type ? `${prefixCls}-header-icon-active` : '',
            ])}
            name={name}
            title={title}
            onClick={() => setMergedSize(type)}
          />
        )
      }
      const suffixNode = mergedChangeSize.value ? (
        <IxSpace>
          {renderIcon('sm')}
          {renderIcon('md')}
          {renderIcon('lg')}
        </IxSpace>
      ) : undefined

      const contentProps = {
        placeholder: props.placeholder,
        resetable: mergedResetable.value,
        searchable: mergedSearchable.value,
        searchValue: props.searchValue,
        'onUpdate:searchValue': props['onUpdate:searchValue'],
        onReset: props.onReset,
      }
      const popoverProps = {
        class: normalizeClass([prefixCls, props.className]),
        header: { title: layoutLocale.title, suffix: suffixNode },
        offset: defaultOffset,
        placement: 'bottomEnd',
        showArrow: false,
        trigger: 'click',
        visible: props.visible,
        'onUpdate:visible': props['onUpdate:visible'],
      } as const

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
            content: () => <LayoutToolContent {...contentProps} />,
          }}
          {...popoverProps}
        />
      )
    }
  },
})
