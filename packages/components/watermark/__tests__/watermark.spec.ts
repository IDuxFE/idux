import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Watermark from '../src/Watermark'
import { WatermarkProps } from '../src/types'

describe('Watermark', () => {
  const WatermarkMount = (options?: MountingOptions<Partial<WatermarkProps>>) =>
    mount(Watermark, { ...(options as MountingOptions<WatermarkProps>) })

  renderWork<WatermarkProps>(Watermark, {
    props: {},
  })

  test('watermark work', async () => {
    const wrapper = WatermarkMount({ props: { content: 'Xxx' } })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
