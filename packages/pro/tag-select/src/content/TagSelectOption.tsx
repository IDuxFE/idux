/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTagData } from '../composables/useTagData'

import { type PropType, computed, defineComponent, inject } from 'vue'

import { IxControlTriggerOverlay } from '@idux/components/control-trigger'
import { IxIcon } from '@idux/components/icon'
import { IxTag } from '@idux/components/tag'

import TagDataEditPanel from './TagDataEditPanel'
import { proTagSelectContext } from '../token'

export default defineComponent({
  props: {
    data: { type: Object as PropType<MergedTagData>, required: true },
  },
  setup(props, { slots }) {
    const {
      props: tagSelectProps,
      mergedPrefixCls,
      editPanelOpened,
      activeValue,
      dataToEdit,
      setDataToEdit,
      setEditPanelOpened,
      handleTagSelect,
      changeActiveValue,
    } = inject(proTagSelectContext)!

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-option`

      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: props.data.key === activeValue.value,
      }
    })
    const tagStyle = computed(() => {
      const {
        color: { labelColor, backgroundColor, borderColor },
      } = props.data
      return {
        '--ix-tag-color': labelColor,
        '--ix-tag-background-color': backgroundColor,
        '--ix-tag-border-color': borderColor ?? backgroundColor,
      }
    })

    const handleClick = () => {
      handleTagSelect(props.data)
    }
    const handleEditTriggerClick = (evt: Event) => {
      evt.preventDefault()
      evt.stopImmediatePropagation()

      if (dataToEdit.value?.key !== props.data.key) {
        setEditPanelOpened(true)
        setDataToEdit(props.data)
      } else {
        setEditPanelOpened(!editPanelOpened.value)
      }
    }
    const handleEditTriggerMousedown = (evt: MouseEvent) => {
      evt.preventDefault()
      evt.stopImmediatePropagation()
    }
    const handleMouseEnter = () => {
      changeActiveValue(props.data.key)
    }

    const renderOverlayContent = () => {
      return <TagDataEditPanel data={props.data} />
    }

    return () => {
      const prefixCls = mergedPrefixCls.value
      const { label } = props.data

      return (
        <div class={classes.value} onClick={handleClick} onMouseenter={handleMouseEnter}>
          {slots.optionLabel?.(props.data) ?? (
            <IxTag class={`${prefixCls}-option-tag`} shape="round" style={tagStyle.value}>
              {slots.tagLabel?.(props.data) ?? label}
            </IxTag>
          )}
          {tagSelectProps.dataEditable && (
            <IxControlTriggerOverlay
              placement="bottomEnd"
              trigger="manual"
              visible={editPanelOpened.value && dataToEdit.value?.key === props.data.key}
              v-slots={{ content: renderOverlayContent }}
            >
              <div
                class={`${prefixCls}-option-edit-trigger`}
                onClick={handleEditTriggerClick}
                onMousedown={handleEditTriggerMousedown}
              >
                <IxIcon name="ellipsis" />
              </div>
            </IxControlTriggerOverlay>
          )}
        </div>
      )
    }
  },
})
