import type { MountingOptions, VueWrapper } from '@vue/test-utils'
import type { OverlayProps } from '../src/types'

import { mount } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxOverlay from '../src/Overlay'

describe('Overlay', () => {
  const OverlayMount: (options?: MountingOptions<Partial<OverlayProps>>) => VueWrapper<InstanceType<typeof IxOverlay>> =
    (options = {}) => mount(IxOverlay, { ...options })

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  renderWork(IxOverlay)

  test('no slots', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    OverlayMount()
    expect(error).toBeCalled()
  })

  test('show arrow', async () => {
    const overlayWrapper = OverlayMount({
      slots: {
        trigger: '',
        overlay: '',
      },
      props: { showArrow: true, visible: true },
    })
    expect(overlayWrapper.vm.showArrow).toBeTruthy()
    expect(document.querySelector('.ix-overlay')?.querySelector('.ix-overlay-arrow')).toBeDefined()
  })
})
