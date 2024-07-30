/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ResolvedSearchField } from '../../types'

import { type VNodeChild, computed, defineComponent, inject, watch } from 'vue'

import { isNil } from 'lodash-es'

import { type VKey, isEmptyNode, isFocusable, useState } from '@idux/cdk/utils'

import QuickSelectPanelItem from './QuickSelectItem'
import QuickSelectPanelShortcut from './QuickSelectShortcut'
import { proSearchContext } from '../../token'

export default defineComponent({
  setup(_, { slots }) {
    const { mergedPrefixCls, resolvedSearchFields, tempSegmentInputRef } = inject(proSearchContext)!

    const separatedFields = computed(() => {
      const quickSelectFields: ResolvedSearchField[] = []
      const shortcutFields: ResolvedSearchField[] = []

      resolvedSearchFields.value.forEach(field => {
        if (!!field.quickSelect && !field.multiple) {
          quickSelectFields.push(field)
        } else {
          shortcutFields.push(field)
        }
      })

      return {
        quickSelectFields,
        shortcutFields,
      }
    })

    const [inputActiveFieldKey, setInputActiveFieldKey] = useState<VKey | undefined>(undefined)
    const setInputActive = (key: VKey, active: boolean) => {
      if (active) {
        setInputActiveFieldKey(key)
      } else if (inputActiveFieldKey.value === key) {
        setInputActiveFieldKey(undefined)
        tempSegmentInputRef.value?.focus()
      }
    }

    watch(separatedFields, fields => {
      const { quickSelectFields } = fields

      if (
        !isNil(inputActiveFieldKey.value) &&
        quickSelectFields.findIndex(field => field.key === inputActiveFieldKey.value) < 0
      ) {
        setInputActiveFieldKey(undefined)
      }
    })

    const handleMouseDown = (evt: MouseEvent) => {
      if (!isFocusable(evt.target)) {
        evt.preventDefault()
        tempSegmentInputRef.value?.focus()
      }
    }

    const renderShortcuts = (prefixCls: string) => {
      let content: VNodeChild
      if (slots.shortcuts) {
        content = slots.shortcuts?.(separatedFields.value.shortcutFields)
      } else if (separatedFields.value.shortcutFields.length) {
        const shortcutSlots = {
          default: slots.shortcut,
          label: slots.shortcutLabel,
          icon: slots.shortcutIcon,
        }
        content = separatedFields.value.shortcutFields.map(field => (
          <QuickSelectPanelShortcut fieldKey={field.key} icon={field.icon} v-slots={shortcutSlots} />
        ))
      }

      return !isEmptyNode(content) ? <div class={`${prefixCls}-shortcuts`}>{content}</div> : null
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-quick-select-panel`

      return (
        <div class={prefixCls} onMousedown={handleMouseDown}>
          {renderShortcuts(prefixCls)}
          {separatedFields.value.quickSelectFields.length && (
            <div class={`${prefixCls}-items`}>
              {separatedFields.value.quickSelectFields.map((field, idx) => {
                const nodes = [
                  <QuickSelectPanelItem
                    searchField={field}
                    searchInputActive={inputActiveFieldKey.value === field.key}
                    setSearchInputActive={(active: boolean) => {
                      setInputActive(field.key, active)
                    }}
                    v-slots={slots}
                  />,
                ]

                if (idx < separatedFields.value.quickSelectFields.length - 1) {
                  nodes.push(<div class={`${prefixCls}-item-separator`}></div>)
                }

                return nodes
              })}
            </div>
          )}
        </div>
      )
    }
  },
})
