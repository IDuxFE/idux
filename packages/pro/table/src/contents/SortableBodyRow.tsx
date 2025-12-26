/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type PropType, computed, defineComponent, inject } from 'vue'

import { CDK_DND_SORTABLE_TOKEN, CdkDndSortableItem, type ListInstruction, type TreeInstruction } from '@idux/cdk/dnd'
import { type VKey, convertCssPixel } from '@idux/cdk/utils'
import { TABLE_TOKEN } from '@idux/components/table'

import { proTableToken } from '../token'

type IndicatorStates = [string | undefined, Record<string, string> | undefined]

export default defineComponent({
  props: {
    itemKey: {
      type: [String, Number, Symbol] as PropType<VKey>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { draggingOverState } = inject(CDK_DND_SORTABLE_TOKEN)!
    const { isTreeData } = inject(TABLE_TOKEN)!
    const { mergedPrefixCls } = inject(proTableToken)!

    const states = computed(() => {
      const state = draggingOverState.value
      const instruction = state?.instruction

      if (!instruction) {
        return [undefined, undefined] as IndicatorStates
      }

      if (isTreeData.value) {
        return getTreeIndicatorStates({
          instruction: instruction as TreeInstruction,
          key: state.key,
          itemKey: props.itemKey,
          prefixCls: mergedPrefixCls.value,
        })
      }

      return getListIndicatorStates({
        instruction: instruction as ListInstruction,
        key: state.key,
        itemKey: props.itemKey,
        prefixCls: mergedPrefixCls.value,
      })
    })
    const classes = computed(() => states.value[0])
    const styles = computed(() => states.value[1])

    return () => {
      return (
        <CdkDndSortableItem class={classes.value} style={styles.value} itemKey={props.itemKey!} tag="tr">
          {slots.default?.()}
        </CdkDndSortableItem>
      )
    }
  },
})

function getListIndicatorStates({
  instruction,
  key,
  itemKey,
  prefixCls,
}: {
  instruction: ListInstruction
  key: VKey
  itemKey: VKey
  prefixCls: string
}) {
  if (key === itemKey) {
    const edge = instruction.edge
    return [`${prefixCls}-row-dragging-over-${edge}`, undefined] as IndicatorStates
  }

  return [undefined, undefined] as IndicatorStates
}

function getTreeIndicatorStates({
  instruction,
  key,
  itemKey,
  prefixCls,
}: {
  instruction: TreeInstruction
  key: VKey
  itemKey: VKey
  prefixCls: string
}) {
  if (instruction.type === 'instruction-blocked') {
    return [undefined, undefined] as IndicatorStates
  }

  if (key === itemKey) {
    return [
      `${prefixCls}-row-dragging-over-tree-${instruction.type}`,
      { '--pro-table-dnd-tree-item-indent': getIndent(instruction) },
    ] as IndicatorStates
  }

  return [undefined, undefined] as IndicatorStates
}

function getIndent(instruction: TreeInstruction) {
  if (instruction.type === 'instruction-blocked') {
    return
  }

  if (instruction.type === 'reparent') {
    return convertCssPixel(instruction.desiredLevel * instruction.indentPerLevel)
  }

  return convertCssPixel(instruction.currentLevel * instruction.indentPerLevel)
}
