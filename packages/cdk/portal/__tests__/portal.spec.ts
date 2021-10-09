import { MountingOptions, mount } from '@vue/test-utils'

import IxPortal from '../src/Portal'
import { PortalProps } from '../src/types'

describe('Portal', () => {
  const PortalMount = (options?: MountingOptions<Partial<PortalProps>>) =>
    mount(IxPortal, {
      slots: { default: `<div id='content'>content</div>` },
      ...(options as MountingOptions<PortalProps>),
      attachTo: 'body',
    })

  afterEach(() => {
    document.body.childNodes.forEach(node => node.remove())
  })

  test('render work', () => {
    const wrapper = PortalMount({ props: { target: 'render-container' } })
    expect(document.body.querySelector('.render-container')!.querySelector('#content')).toBeDefined()

    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.unmount()
    }).not.toThrow()
  })

  test('disabled work', async () => {
    const wrapper = PortalMount({ props: { target: 'disabled-container', disabled: true } })
    const container = document.body.querySelector('.disabled-container')!
    expect(container.querySelector('#content')).toBeNull()

    await wrapper.setProps({ disabled: false })

    expect(container.querySelector('#content')).not.toBeNull()
  })

  test('target work', async () => {
    const wrapper = PortalMount({ props: { target: 'target-container1' } })
    const container1 = document.body.querySelector('.target-container1')!
    expect(container1.querySelector('#content')).not.toBeNull()

    const container = document.createElement('div')
    container.classList.add('target-container2')
    document.body.appendChild(container)

    await wrapper.setProps({ target: container })
    expect(container1.querySelector('#content')).toBeNull()
    expect(container.querySelector('#content')).not.toBeNull()
  })

  test('load work', async () => {
    const wrapper = PortalMount({ props: { target: 'test-container', load: false } })
    expect(document.body.querySelector('.test-container')).toBeNull()

    await wrapper.setProps({ load: true })

    expect(document.body.querySelector('.test-container')).not.toBeNull()
  })
})
