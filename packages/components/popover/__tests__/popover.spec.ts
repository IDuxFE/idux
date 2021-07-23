import type { MountingOptions, VueWrapper } from '@vue/test-utils'
import type { PopoverPublicProps } from '../src/types'

import { mount } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxPopover from '../src/Popover'

describe('Popover', () => {
  const popoverWrapper: (
    options?: MountingOptions<Partial<PopoverPublicProps>>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ) => VueWrapper<InstanceType<typeof IxPopover>> = (options = {}) => mount(IxPopover, { ...options })

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  renderWork(IxPopover, {
    props: { content: 'Content', title: 'Title' },
    slots: { default: () => '<span>Trigger</span>' },
  })

  test('visible work', async () => {
    const wrapper = popoverWrapper({
      props: { content: 'Content', title: 'Title', destroyOnHide: true, visible: false },
      slots: { default: () => '<span id="trigger">Trigger</span>' },
    })
    expect(!!document.querySelector('.ix-overlay')).toBeFalsy()
    await wrapper.setProps({ visible: true })
    expect(!!document.querySelector('.ix-overlay')).toBeTruthy()
  })
})
