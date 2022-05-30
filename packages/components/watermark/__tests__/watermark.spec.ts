import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Watermark from '../src/Watermark'
import { WatermarkProps } from '../src/types'

// jsDom 不支持 canvas
describe.skip('Watermark', () => {
  const WatermarkMount = (options?: MountingOptions<Partial<WatermarkProps>>) =>
    mount(Watermark, { ...(options as MountingOptions<WatermarkProps>) })

  renderWork<WatermarkProps>(Watermark, {
    props: { content: 'Content' },
  })

  test('watermark work', async () => {
    const wrapper = WatermarkMount({ props: { content: 'Xxx' } })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ content: 'Yyy' })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
