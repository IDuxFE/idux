import { renderWork } from '@tests'
import { mount, VueWrapper } from '@vue/test-utils'
import { ComponentOptions } from 'vue'
import IxTypography from '../src/typography'

const TestComponent = {
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
}

describe('typography.ts', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let typographyMount: (options: ComponentOptions) => VueWrapper<any>

  beforeEach(() => {
    typographyMount = (options: ComponentOptions) => {
      return mount(options, { global: { directives: { typography: IxTypography } } })
    }
  })

  renderWork(TestComponent, { global: { directives: { typography: IxTypography } } })

  test('type work', async () => {
    const TestComponent = {
      props: ['type'],
      template: `<p v-typography="type">Paragraph</p>`,
    }
    const wrapper = typographyMount(TestComponent)
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
    const TestComponent = {
      props: ['type'],
      template: `<p v-typography="type">Paragraph</p>`,
    }
    const wrapper = typographyMount(TestComponent)
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
    const TestComponent = {
      template: `<p v-typography="'hello'">Paragraph</p>`,
    }
    const wrapper = typographyMount(TestComponent)
    expect(wrapper.classes()).toEqual(['ix-typography'])
    expect(error).toBeCalled()
  })

  test('custom class', async () => {
    const TestComponent = {
      props: ['type'],
      template: `
      <p v-typography="type">Paragraph</p>
      `,
    }
    const wrapper = typographyMount(TestComponent)
    expect(wrapper.classes()).toEqual(['ix-typography'])

    await wrapper.setProps({ class: 'custom-paragraph' })
    expect(wrapper.classes()).toEqual(['custom-paragraph', 'ix-typography'])

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.classes()).toEqual(['custom-paragraph', 'ix-typography', 'ix-typography-success'])
  })
})
