import type { Slots, VNode } from 'vue'

import { getFirstValidNode, getSlotNodes } from '@idux/cdk/utils'

export function useChildren(slots: Slots, key?: string): VNode | undefined {
  return getFirstValidNode(getSlotNodes(slots, key), 1)
}
