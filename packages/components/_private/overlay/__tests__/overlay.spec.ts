import type { MountingOptions } from '@vue/test-utils'
import type { OverlayProps } from '../src/types'

import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { renderWork } from '@tests'
import Overlay from '../src/Overlay'

describe('Overlay', () => {
  const OverlayMount = (options?: MountingOptions<Partial<OverlayProps>>) => mount(Overlay, { ...options })

  renderWork(Overlay, {
    slots: {
      trigger: () => h('div', 'trigger'),
      overlay: () => h('div', 'overlay'),
    },
  })

  test('no slots work', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    OverlayMount()
    expect(error).toBeCalled()
  })
})
