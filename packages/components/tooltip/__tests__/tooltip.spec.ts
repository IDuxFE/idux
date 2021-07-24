import type { MountingOptions, VueWrapper } from '@vue/test-utils'
import type { TooltipPublicProps } from '../src/types'

import { mount } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxTooltip from '../src/Tooltip'

describe('Tooltip', () => {
  const tooltipWrapper: (
    options?: MountingOptions<Partial<TooltipPublicProps>>,
  ) => VueWrapper<InstanceType<typeof IxTooltip>> = (options = {}) => mount(IxTooltip, { ...options })

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  renderWork(IxTooltip, { props: { title: 'Title' }, slots: { default: () => '<span>Trigger</span>' } })

  test('visible work', async () => {
    const wrapper = tooltipWrapper({
      props: { title: 'Title', destroyOnHide: true, visible: false },
      slots: { default: () => '<span id="trigger">Trigger</span>' },
    })
    expect(!!document.querySelector('.ix-overlay')).toBeFalsy()
    await wrapper.setProps({ visible: true })
    expect(!!document.querySelector('.ix-overlay')).toBeTruthy()
  })
})
