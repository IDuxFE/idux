/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTagData } from '../composables/useTagData'
import type { TagSelectColor } from '../types'

import { type PropType, defineComponent, inject, onMounted, ref, watch } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { type InputInstance, IxInput } from '@idux/components/input'
import { useThemeToken } from '@idux/pro/theme'

import { proTagSelectContext } from '../token'

export default defineComponent({
  props: {
    data: { type: Object as PropType<MergedTagData>, required: true },
  },
  setup(props) {
    const {
      locale,
      mergedPrefixCls,
      mergedTagSelectColors,
      editPanelOpened,
      dataToEdit,
      triggerRef,
      focused,
      handleTagDataLabelInput,
      handleTagDataRemove,
      handleTagDataColorChange,
    } = inject(proTagSelectContext)!

    const { globalHashId, hashId } = useThemeToken('proTagSelect')

    const inputRef = ref<InputInstance>()

    const handleInputChange = (input: string) => {
      handleTagDataLabelInput(input, props.data)
    }

    const handleDeleteClick = () => {
      handleTagDataRemove(props.data)
    }

    const handlePanelMousedown = (evt: MouseEvent) => {
      if (!(evt.target instanceof HTMLInputElement)) {
        evt.preventDefault()
      }
    }

    const renderColorItem = (prefixCls: string, color: TagSelectColor) => {
      const isSelected = color.key === props.data.color.key
      const colorItemPrefixCls = `${prefixCls}-item`
      const classes = {
        [colorItemPrefixCls]: true,
        [`${colorItemPrefixCls}-selected`]: isSelected,
      }
      const colorIndicatorStyle = {
        background: color.backgroundColor,
      }
      const handleClick = () => {
        handleTagDataColorChange(color.key, props.data)
      }

      return (
        <div class={classes} onClick={handleClick}>
          <div class={`${colorItemPrefixCls}-indicator`} style={colorIndicatorStyle}></div>
          <span>{color.name}</span>
          {isSelected && <IxIcon class={`${colorItemPrefixCls}-check`} name="check" />}
        </div>
      )
    }

    onMounted(() => {
      watch(
        [editPanelOpened, dataToEdit],
        ([opened, editData]) => {
          if (opened && editData?.key === props.data.key) {
            setTimeout(() => {
              inputRef.value?.focus()
            })
          } else if (!opened && focused.value) {
            triggerRef.value?.focus()
          }
        },
        {
          immediate: true,
        },
      )
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-edit-panel`

      return (
        <div class={[prefixCls, globalHashId.value, hashId.value]} onMousedown={handlePanelMousedown}>
          <div class={`${prefixCls}-input`}>
            <IxInput
              ref={inputRef}
              class={`${prefixCls}-input-inner`}
              value={props.data.label}
              size="sm"
              onChange={handleInputChange}
            />
          </div>
          <div class={`${prefixCls}-delete`} onClick={handleDeleteClick}>
            <IxIcon class={`${prefixCls}-delete-icon`} name="delete" />
            <span class={`${prefixCls}-delete-label`}>{locale.remove}</span>
          </div>
          <div class={`${prefixCls}-colors`}>
            {mergedTagSelectColors.value.map(color => renderColorItem(`${prefixCls}-colors`, color))}
          </div>
        </div>
      )
    }
  },
})
