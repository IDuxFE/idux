/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type Slot, type Slots, type VNode, type VNodeChild, createVNode } from 'vue'

import { isString } from 'lodash-es'

import { IxIcon } from '@idux/components/icon'

export function convertIconVNode(
  slot: Slot | undefined,
  prop: string | VNode | undefined,
  slotParams?: Record<string, unknown>,
): VNodeChild
export function convertIconVNode(
  slots: Slots | undefined,
  props: Record<string, unknown>,
  key: string,
  slotParams?: Record<string, unknown>,
): VNodeChild
export function convertIconVNode(
  slots: Slot | Slots | undefined,
  props: unknown,
  keyOrParams?: string | Record<string, unknown>,
  slotParams?: Record<string, unknown>,
): VNodeChild {
  let iconSlot: Slot | undefined
  let iconName: string | VNode | undefined
  const isKey = isString(keyOrParams)
  const params = isKey ? slotParams : keyOrParams
  if (isKey) {
    iconSlot = (slots as Slots)[keyOrParams]
    if (!iconSlot) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      iconName = (props as any)[keyOrParams]
    }
  } else {
    iconSlot = slots as Slot | undefined
    iconName = props as string | VNode | undefined
  }

  if (iconSlot) {
    return iconSlot(params)
  }

  return isString(iconName) ? createVNode(IxIcon, { name: iconName }, null) : iconName
}

export function convertStringVNode(
  slot: Slot | undefined,
  prop: string | VNode | undefined,
  slotParams?: Record<string, unknown>,
): VNodeChild
export function convertStringVNode(
  slots: Slots | undefined,
  props: Record<string, unknown>,
  key: string,
  slotParams?: Record<string, unknown>,
): VNodeChild
export function convertStringVNode(
  slots: Slot | Slots | undefined,
  props: unknown,
  keyOrParams?: string | Record<string, unknown>,
  slotParams?: Record<string, unknown>,
): VNodeChild {
  let labelSlot: Slot | undefined
  let label: string | VNode | undefined
  const isKey = isString(keyOrParams)
  const params = isKey ? slotParams : keyOrParams
  if (isKey) {
    labelSlot = (slots as Slots)[keyOrParams]
    if (!labelSlot) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label = (props as any)[keyOrParams]
    }
  } else {
    labelSlot = slots as Slot | undefined
    label = props as string | VNode | undefined
  }

  return labelSlot ? labelSlot(params) : label
}
