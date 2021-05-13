import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxOverlay from '../src/overlay'
import { OverlayProps } from '../src/types'

describe('Overlay.vue', () => {
  let OverlayMount: (options?: MountingOptions<Partial<OverlayProps>>) => VueWrapper<InstanceType<typeof IxOverlay>>

  beforeEach(() => {
    OverlayMount = options => mount(IxOverlay, { ...options })
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

  test('arrow offset', async () => {
    const overlayWrapper = OverlayMount({
      props: {
        arrowOffset: 4,
        placement: 'top',
        visible: true,
      },
      slots: {
        trigger: '',
        overlay: '',
      },
    })
    expect(overlayWrapper.vm.arrowStyle).toEqual({ left: '4px' })

    await overlayWrapper.setProps({ placement: 'bottom' })
    expect(overlayWrapper.vm.arrowStyle).toEqual({ left: '4px' })

    await overlayWrapper.setProps({ placement: 'left' })
    expect(overlayWrapper.vm.arrowStyle).toEqual({ top: '4px' })

    await overlayWrapper.setProps({ placement: 'right' })
    expect(overlayWrapper.vm.arrowStyle).toEqual({ top: '4px' })

    await overlayWrapper.setProps({ arrowOffset: 0 })
    expect(overlayWrapper.vm.arrowStyle).toEqual({})
  })
})
