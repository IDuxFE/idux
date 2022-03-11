/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slot, type Slots, type VNode, type VNodeChild, createVNode } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

export function convertIconVNode(slot: Slot | undefined, prop: string | VNode | undefined): VNodeChild
export function convertIconVNode(slots: Slots | undefined, props: unknown, key: string): VNodeChild
export function convertIconVNode(slots: Slot | Slots | undefined, props: unknown, key?: string): VNodeChild {
  let iconSlot: Slot | undefined
  let iconName: string | VNode | undefined
  if (key) {
    iconSlot = (slots as Slots)[key]
    if (!iconSlot) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      iconName = (props as any)[key]
    }
  } else {
    iconSlot = slots as Slot | undefined
    iconName = props as string | VNode | undefined
  }

  if (iconSlot) {
    return iconSlot()
  }

  return isString(iconName) ? createVNode(IxIcon, { name: iconName }, null) : iconName
}

export function convertStringVNode(slot: Slot | undefined, prop: string | VNode | undefined): VNodeChild
export function convertStringVNode(slots: Slots | undefined, props: unknown, key: string): VNodeChild
export function convertStringVNode(slots: Slot | Slots | undefined, props: unknown, key?: string): VNodeChild {
  let labelSlot: Slot | undefined
  let label: string | VNode | undefined
  if (key) {
    labelSlot = (slots as Slots)[key]
    if (!labelSlot) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label = (props as any)[key]
    }
  } else {
    labelSlot = slots as Slot | undefined
    label = props as string | VNode | undefined
  }

  return labelSlot ? labelSlot() : label
}
