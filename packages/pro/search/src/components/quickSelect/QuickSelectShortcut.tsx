/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slot, computed, defineComponent, inject } from 'vue'

import { isNil } from 'lodash-es'

import { callEmit, isEmptyNode } from '@idux/cdk/utils'
import { IxIcon } from '@idux/components/icon'

import { proSearchContext } from '../../token'
import { type SearchField, quickSelectPanelShortcutProps } from '../../types'

export default defineComponent({
  name: 'IxProSearchShortcut',
  props: quickSelectPanelShortcutProps,
  setup(props, { slots }) {
    const {
      props: proSearchProps,
      mergedPrefixCls,
      resolvedSearchFields,
      convertStateToValue,
      createSearchState,
      updateSearchValues,
      getSearchStatesByFieldKey,
      setActiveSegment,
    } = inject(proSearchContext)!

    const searchField = computed(() => resolvedSearchFields.value.find(field => field.key === props.fieldKey))

    const handleClick = () => {
      if (!searchField.value?.multiple && getSearchStatesByFieldKey(props.fieldKey).length) {
        return
      }

      const state = createSearchState(props.fieldKey)

      if (state) {
        updateSearchValues()
        callEmit(proSearchProps.onItemCreate, {
          ...convertStateToValue(state.key),
          nameInput: searchField.value?.label,
        })

        const segmentStates = state.segmentStates
        setActiveSegment({
          itemKey: state.key,
          name: segmentStates.find(state => isNil(state.value))?.name ?? segmentStates[segmentStates.length - 1].name,
        })
      }
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-quick-select-shortcut`

      return (
        <span class={prefixCls} onClick={handleClick}>
          {slots.default?.() ?? [
            renderIcon(prefixCls, props.icon ?? searchField.value?.icon, slots.icon, searchField.value),
            renderLabel(slots.label, searchField.value),
          ]}
        </span>
      )
    }
  },
})

function renderIcon(prefixCls: string, icon: string | undefined, iconSlot: Slot | undefined, field?: SearchField) {
  const content = iconSlot ? iconSlot(field) : icon ? <IxIcon class={`${prefixCls}-icon`} name={icon} /> : null

  return !isEmptyNode(content) ? <span class={`${prefixCls}-icon`}>{content}</span> : null
}

function renderLabel(labelSlot: Slot | undefined, field?: SearchField) {
  if (labelSlot) {
    return labelSlot(field)
  }

  return field?.label
}
