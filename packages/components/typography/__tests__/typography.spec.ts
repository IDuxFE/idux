import { renderWork } from '@tests'

import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { TypographyProps } from '../src/types'
import IxTypography from '../src/typography'

const TestComponent = defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['type'],
  template: `<p v-typography="type">Paragraph</p>`,
})

describe('typography.ts', () => {
  let typographyMount: (props?: { type: TypographyProps }) => VueWrapper<InstanceType<typeof TestComponent>>

  beforeEach(() => {
    typographyMount = props => {
      return mount(TestComponent, { global: { directives: { typography: IxTypography } }, props })
    }
  })

  renderWork(TestComponent, { global: { directives: { typography: IxTypography } } })

  test('type work', async () => {
    const wrapper = typographyMount()
    expect(wrapper.classes()).toEqual(['ix-typography'])

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-success'])

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-warning'])

    await wrapper.setProps({ type: 'secondary' })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-secondary'])

    await wrapper.setProps({ type: 'error' })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-error'])
  })

  test('option work', async () => {
    const wrapper = typographyMount({ type: { type: 'success' } })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-success'])

    await wrapper.setProps({ type: { type: 'warning' } })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-warning'])

    await wrapper.setProps({ type: { type: 'secondary' } })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-secondary'])

    await wrapper.setProps({ type: { type: 'error' } })
    expect(wrapper.classes()).toEqual(['ix-typography', 'ix-typography-error'])
  })

  test('disabled word', async () => {
    const wrapper = typographyMount()
    expect(wrapper.classes()).not.toContain('ix-typography-disabled')

    await wrapper.setProps({ type: { disabled: true } })
    expect(wrapper.classes()).toContain('ix-typography-disabled')

    await wrapper.setProps({ type: { disabled: false } })
    expect(wrapper.classes()).not.toContain('ix-typography-disabled')
  })

  test('dev warn work', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wrapper = typographyMount({ type: 'hello' })
    expect(wrapper.classes()).toEqual(['ix-typography'])
    expect(error).toBeCalled()
  })

  test('custom class work', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wrapper = typographyMount({ class: 'custom' })
    expect(wrapper.classes()).toEqual(['custom', 'ix-typography'])

    const wrapper2 = typographyMount()
    await wrapper2.setProps({ class: 'custom' })
    expect(wrapper.classes()).toEqual(['custom', 'ix-typography'])
  })

  test('directive position work', () => {
    const wrapper = mount(
      {
        template: `
      <div v-typography class='custom-class1' id='directive1'>Directive1</div>
      <div class='custom-class2' v-typography id='directive2'>Directive2</div>
      `,
      },
      { global: { directives: { typography: IxTypography } } },
    )
    expect(wrapper.get('#directive1').classes()).toEqual(['custom-class1', 'ix-typography'])
    expect(wrapper.get('#directive2').classes()).toEqual(['custom-class2', 'ix-typography'])
  })
})
