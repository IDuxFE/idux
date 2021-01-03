import type { TypographyOptions, TypographyType } from '../src/types'

import { defineComponent, PropType } from 'vue'
import { mount } from '@vue/test-utils'
import IxTypography from '../src/typography'

describe('typography.ts', () => {
  test('render work', () => {
    const TestComponent = defineComponent({
      template: `
      <article v-typography>
        <h1 v-typography>Title</h1>
        <p v-typography>
          In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.
        </p>
        <div v-typography>
          <ul>
            <li><a href="/docs/spec/proximity">Principles</a></li>
            <li><a href="/docs/pattern/navigation">Patterns</a></li>
            <li><a href="/docs/resource/download">Resource Download</a></li>
          </ul>
        </div>
        <p v-typography>
          Press <span v-typography><kbd>Esc</kbd></span> to exist...
        </p>
      </article>
      `,
    })
    const wrapper = mount(TestComponent, { global: { directives: { typography: IxTypography } } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('type work', async () => {
    const TestComponent = defineComponent({
      props: {
        type: {
          type: String as PropType<TypographyType>,
          default: undefined,
        },
      },
      template: `<p v-typography="type">Paragraph</p>`,
    })
    const wrapper = mount(TestComponent, { global: { directives: { typography: IxTypography } } })
    expect(wrapper.classes()).toEqual(['ix-typography'])

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.classes()).toContain('ix-typography-success')

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.classes()).toContain('ix-typography-warning')

    await wrapper.setProps({ type: 'error' })
    expect(wrapper.classes()).toContain('ix-typography-error')

    await wrapper.setProps({ type: 'secondary' })
    expect(wrapper.classes()).toContain('ix-typography-secondary')
  })

  test('option work', async () => {
    const TestComponent = defineComponent({
      props: {
        type: {
          type: Object as PropType<TypographyOptions>,
          default: undefined,
        },
      },
      template: `<p v-typography="type">Paragraph</p>`,
    })
    const wrapper = mount(TestComponent, { global: { directives: { typography: IxTypography } } })
    expect(wrapper.classes()).toEqual(['ix-typography'])

    await wrapper.setProps({ type: {} })
    expect(wrapper.classes()).toEqual(['ix-typography'])

    await wrapper.setProps({ type: { type: 'success' } })
    expect(wrapper.classes()).toContain('ix-typography-success')

    await wrapper.setProps({ type: { type: 'warning' } })
    expect(wrapper.classes()).toContain('ix-typography-warning')

    await wrapper.setProps({ type: { type: 'error' } })
    expect(wrapper.classes()).toContain('ix-typography-error')

    await wrapper.setProps({ type: { type: 'secondary' } })
    expect(wrapper.classes()).toContain('ix-typography-secondary')

    await wrapper.setProps({ type: { disabled: true } })
    expect(wrapper.classes()).toContain('ix-typography-disabled')

    await wrapper.setProps({ type: { disabled: false } })
    expect(wrapper.classes()).not.toContain('ix-typography-disabled')
  })

  test('dev warn work', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    const TestComponent = defineComponent({
      template: `<p v-typography="'hello'">Paragraph</p>`,
    })
    const wrapper = mount(TestComponent, {
      global: {
        directives: {
          typography: IxTypography,
        },
      },
    })
    expect(wrapper.classes()).toEqual(['ix-typography'])
    expect(error).toBeCalled()
  })
})
