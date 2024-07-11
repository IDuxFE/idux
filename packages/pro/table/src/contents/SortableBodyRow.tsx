/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VKey } from '@idux/cdk/utils'

import { type PropType, computed, defineComponent, inject } from 'vue'

import { CDK_DND_SORTABLE_TOKEN, CdkDndSortableItem, type ListDraggingOverState } from '@idux/cdk/dnd'

import { proTableToken } from '../token'

export default defineComponent({
  props: {
    itemKey: {
      type: [String, Number, Symbol] as PropType<VKey>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { draggingOverState } = inject(CDK_DND_SORTABLE_TOKEN)!
    const { mergedPrefixCls } = inject(proTableToken)!

    const classes = computed(() => {
      const state = draggingOverState.value as ListDraggingOverState | undefined
      const edge = state?.instruction?.edge

      if (!edge || state.key !== props.itemKey) {
        return
      }

      return `${mergedPrefixCls.value}-row-dragging-over-${edge}`
    })

    return () => {
      return (
        <CdkDndSortableItem class={classes.value} itemKey={props.itemKey!} tag="tr">
          {slots.default?.()}
        </CdkDndSortableItem>
      )
    }
  },
})
