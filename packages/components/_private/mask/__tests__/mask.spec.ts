import { mount, MountingOptions } from '@vue/test-utils'
import { renderWork } from '@tests'
import Mask from '../src/Mask'
import { MaskProps } from '../src/types'

describe('Mask', () => {
  const MaskMount = (options?: MountingOptions<Partial<MaskProps>>) =>
    mount(Mask, { ...(options as MountingOptions<MaskProps>) })

  renderWork<MaskProps>(Mask)

  test('mask work', async () => {
    const wrapper = MaskMount({ props: { mask: false } })

    expect(wrapper.find('.ix-mask').exists()).toBe(false)

    await wrapper.setProps({ mask: true })

    expect(wrapper.find('.ix-mask').exists()).toBe(true)
  })

  test('visible work', async () => {
    const wrapper = MaskMount({ props: { visible: false } })

    expect(wrapper.find<HTMLElement>('.ix-mask').element.style.display).toBe('none')

    await wrapper.setProps({ visible: true })

    expect(wrapper.find<HTMLElement>('.ix-mask').element.style.display).not.toBe('none')
  })

  test('zIndex work', async () => {
    const wrapper = MaskMount({ props: { zIndex: 1001 } })

    expect(wrapper.find<HTMLElement>('.ix-mask').element.style.zIndex).toBe('1001')

    await wrapper.setProps({ zIndex: 1002 })

    expect(wrapper.find<HTMLElement>('.ix-mask').element.style.zIndex).toBe('1002')
  })
})
