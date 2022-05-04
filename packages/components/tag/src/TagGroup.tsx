/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent } from 'vue'

import { type VKey, callEmit, convertCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import Tag from './Tag'
import { tagGroupProps } from './types'

export default defineComponent({
  name: 'IxTagGroup',
  props: tagGroupProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tag-group`)
    const config = useGlobalConfig('tagGroup')
    const gap = computed(() => props.gap ?? config.gap)
    const wrap = computed(() => props.wrap ?? config.wrap)

    const containerCls = computed(() => {
      const prefixCls = mergedPrefixCls.value

      return {
        [prefixCls]: true,
        [`${prefixCls}-clickable`]: props.clickable,
        [`${prefixCls}-nowrap`]: !wrap.value,
      }
    })

    const containerStyle = computed(() => {
      const columnGap = convertCssPixel(gap.value)

      return {
        gap: `8px ${columnGap}`,
      }
    })

    const onTagClick = (key: VKey, evt: MouseEvent) => {
      if (props.clickable) {
        callEmit(props.onClick, key, evt)
        const activeKeys = props.activeKeys
        const targetIndex = activeKeys.findIndex(currentKey => currentKey === key)
        targetIndex === -1 ? activeKeys.push(key) : activeKeys.splice(targetIndex, 1)
        callEmit(props['onUpdate:activeKeys'], activeKeys)
      }
    }
    const onCloseIconClick = (key: VKey, evt: MouseEvent) => {
      callEmit(props.onClose, key, evt)
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const closeIconNode = slots.closeIcon?.() ?? <IxIcon name={props.closeIcon}></IxIcon>

      return (
        <div class={containerCls.value} style={containerStyle.value}>
          {props.dataSource?.map((tagData, index) => {
            const key = tagData.key ?? index
            const suffixSlot = {
              suffix: () => (
                <span class={`${prefixCls}-close-icon`} onClick={evt => onCloseIconClick(key, evt)}>
                  {closeIconNode}
                </span>
              ),
            }

            return (
              <Tag
                key={key}
                shape={props.shape}
                color={tagData.color}
                number={tagData.number}
                icon={tagData.icon}
                onClick={evt => onTagClick(key, evt)}
              >
                {{
                  default: () => tagData.label,
                  ...(props.closable && suffixSlot),
                }}
              </Tag>
            )
          })}
        </div>
      )
    }
  },
})
