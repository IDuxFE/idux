import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork, wait } from '@tests'
import IxTooltip from '../src/Tooltip.vue'
import { TooltipProps } from '../src/types'

describe('Tooltip.vue', () => {
  let TooltipMount: (options?: MountingOptions<Partial<TooltipProps>>) => VueWrapper<InstanceType<typeof IxTooltip>>

  beforeEach(() => {
    TooltipMount = options => mount(IxTooltip, { ...options })
  })

  renderWork(IxTooltip)

  test('placement', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    const tooltipWrapper = TooltipMount({
      slots: {
        default: <span id="trigger">Hello world</span>,
      },
      props: {
        title: 'prompt text',
      },
    })
    await tooltipWrapper.get('#trigger').trigger('mouseenter')
    await wait(100)
    expect(document.querySelector('.ix-tooltip')!.getAttribute('placement')).toEqual('top')

    await tooltipWrapper.setProps({ placement: 'bottom' })
    expect(document.querySelector('.ix-tooltip')!.getAttribute('placement')).toEqual('bottom')

    await tooltipWrapper.setProps({ placement: 'left' })
    expect(document.querySelector('.ix-tooltip')!.getAttribute('placement')).toEqual('left')

    await tooltipWrapper.setProps({ placement: 'right' })
    expect(document.querySelector('.ix-tooltip')!.getAttribute('placement')).toEqual('right')
  })
})
