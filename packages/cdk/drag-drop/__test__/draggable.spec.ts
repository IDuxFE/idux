/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { MountingOptions, mount } from '@vue/test-utils'

import { describe, expect } from 'vitest'

import CdkDraggable from '../src/draggable/Draggable'
import { DraggableProps } from '../src/draggable/types'

describe('draggable', () => {
  const DraggableMount = (options?: MountingOptions<Partial<DraggableProps>>) =>
    mount(CdkDraggable, {
      slots: { default: `<div>content</div>` },
      ...(options as MountingOptions<DraggableProps>),
      attachTo: 'body',
    })

  test('render work', () => {
    const wrapper = DraggableMount()

    expect(document.body.querySelector('.cdk-draggable')).toBeDefined()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })

  test('drag free', async () => {
    const wrapper = DraggableMount({ props: { free: true } })
    const draggable = wrapper.find('.cdk-draggable')

    await wrapper.trigger('dragstart')
    await wrapper.trigger('dragover')
    await wrapper.trigger('dragend', { dataTransfer: {} })

    expect(draggable.attributes('style')).toContain('transform: translate')
  })
})
