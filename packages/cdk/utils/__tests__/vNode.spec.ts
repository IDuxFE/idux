import type { VNode, VNodeChild } from 'vue'

import { Comment, Fragment, Slots, Text } from 'vue'

import { getFirstValidNode, getSlotNodes, isValidElementNode } from '../vNode'

const TEMPLATE = 'template'

type FakeVNode = Partial<Pick<VNode, 'type'>> & { children?: FakeVNode[] }

type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

const vNode: FakeVNode = {
  type: Comment,
}

vNode.children = [vNode]

describe('vNode.ts', () => {
  test('getFirstValidNode work', async () => {
    const undefinedValue = undefined
    expect(getFirstValidNode(undefinedValue)).toBeUndefined()

    const arrayValue: FakeVNode[] = [vNode]
    expect(getFirstValidNode(arrayValue as VNodeChild)).toBeUndefined()
    expect(getFirstValidNode(vNode as VNodeChild)).toBeUndefined()

    vNode.type = Fragment
    expect(getFirstValidNode(arrayValue as VNodeChild, 0)).toBeUndefined()
    expect(getFirstValidNode(vNode as VNodeChild, 0)).toBeUndefined()
    expect(getFirstValidNode(arrayValue as VNodeChild, 1)).toBeUndefined()
    expect(getFirstValidNode(vNode as VNodeChild, 1)).toBeUndefined()

    vNode.type = TEMPLATE
    expect(getFirstValidNode(arrayValue as VNodeChild, 0)).toBeUndefined()
    expect(getFirstValidNode(vNode as VNodeChild, 0)).toBeUndefined()
    expect(getFirstValidNode(arrayValue as VNodeChild, 1)).toBeUndefined()
    expect(getFirstValidNode(vNode as VNodeChild, 1)).toBeUndefined()

    vNode.type = Text
    expect(getFirstValidNode(arrayValue as VNodeChild, 0)).toEqual(vNode)
    expect(getFirstValidNode(vNode as VNodeChild, 0)).toEqual(vNode)
    expect(getFirstValidNode(arrayValue as VNodeChild, 1)).toEqual(vNode)
    expect(getFirstValidNode(vNode as VNodeChild, 1)).toEqual(vNode)
  })

  test('isValidElementNode work', async () => {
    vNode.type = Comment
    expect(isValidElementNode(vNode as VNodeChild)).toBeFalsy()

    vNode.type = Fragment
    expect(isValidElementNode(vNode as VNodeChild)).toBeFalsy()

    vNode.type = Text
    expect(isValidElementNode(vNode as VNodeChild)).toBeTruthy()
  })

  test('getSlotNodes work', () => {
    const slots: Writable<Slots> = {}
    expect(getSlotNodes(slots)).toEqual([])

    slots.default = () => [{ type: Fragment, dynamicChildren: [] as VNode[] }] as VNode[]
    expect(getSlotNodes(slots)).toEqual([])

    slots.default = () => [{ type: Fragment }] as VNode[]
    expect(getSlotNodes(slots)).toEqual([])

    const vNodes: VNode[] = [{ type: Text }] as VNode[]
    slots.default = () => vNodes
    expect(getSlotNodes(slots)).toEqual(vNodes)
  })
})
