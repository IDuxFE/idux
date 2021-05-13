import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxOverlay from '../src/overlay'
import { OverlayProps } from '../src/types'

describe('Overlay.vue', () => {
  let OverlayMount: (options?: MountingOptions<Partial<OverlayProps>>) => VueWrapper<InstanceType<typeof IxOverlay>>

  beforeEach(() => {
    OverlayMount = options => mount(IxOverlay, { ...options })
  })

  renderWork(IxOverlay)

  test('no slots', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    OverlayMount()
    expect(error).toBeCalled()
  })
})
