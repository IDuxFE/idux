import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { renderWork } from '@tests'
import IxMask from '../src/Mask.vue'
import { MaskProps } from '../src/types'

describe('Mask.vue', () => {
  let MaskMount: (options?: MountingOptions<Partial<MaskProps>>) => VueWrapper<InstanceType<typeof IxMask>>

  beforeEach(() => {
    MaskMount = options => mount(IxMask, { ...options })
  })

  renderWork(IxMask)

  test('mask work', async () => {
    const wrapper = MaskMount({ props: { mask: true } })

    expect(wrapper.find('.ix-mask').classes()).toContain('has-mask')

    await wrapper.setProps({ mask: false })
    expect(wrapper.find('.ix-mask').classes()).not.toContain('has-mask')
  })

  test('maskClass work', () => {
    const testClass = 'test-class'
    const wrapper = MaskMount({ props: { maskClass: testClass } })

    expect(wrapper.find(`.${testClass}`).exists())
  })
})
