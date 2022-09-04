import type { VNode, VNodeChild } from 'vue'

import { Comment, Fragment, Text } from 'vue'

import { getFirstValidNode } from '../src/vNode'

const TEMPLATE = 'template'

type FakeVNode = Partial<Pick<VNode, 'type'>> & { children?: FakeVNode[] }

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

    vNode.type = Comment
    const textvNode: FakeVNode = {
      type: Text,
    }
    const startCommentNodeArrayValue: FakeVNode[] = [vNode, textvNode]
    expect(getFirstValidNode(startCommentNodeArrayValue as VNodeChild, 0)).toEqual(textvNode)
    expect(getFirstValidNode(vNode as VNodeChild, 0)).toBeUndefined()
    expect(getFirstValidNode(startCommentNodeArrayValue as VNodeChild, 1)).toEqual(textvNode)
    expect(getFirstValidNode(vNode as VNodeChild, 1)).toBeUndefined()

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
})
