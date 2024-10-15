import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import ColorPicker from '../src/ColorPicker'
import { ColorPickerProps } from '../src/types'

describe.skip('ColorPicker', () => {
  const ColorPickerMount = (options?: MountingOptions<Partial<ColorPickerProps>>) =>
    mount(ColorPicker, { ...(options as MountingOptions<ColorPickerProps>) })

  renderWork<ColorPickerProps>(ColorPicker, {
    props: {},
  })

  test('xxx work', async () => {
    const wrapper = ColorPickerMount({ props: { xxx: 'Xxx' } })

    expect(wrapper.classes()).toContain('ix-Xxx')

    await wrapper.setProps({ xxx: 'Yyy' })

    expect(wrapper.classes()).toContain('ix-Yyy')
  })
})
