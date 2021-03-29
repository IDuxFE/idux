import { renderWork } from '@tests'
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import IxTextarea from '../src/Textarea.vue'
import { TextareaProps } from '../src/types'

describe('Textarea.vue', () => {
  let TextareaMount: (options?: MountingOptions<Partial<TextareaProps>>) => VueWrapper<InstanceType<typeof IxTextarea>>
  beforeEach(() => {
    TextareaMount = options => mount(IxTextarea, { ...options })
  })

  renderWork(IxTextarea)

  test('v-model work', async () => {
    const valueRef = ref('init value')
    const wrapper = mount({
      components: { IxTextarea },
      template: `<ix-textarea v-model:value="valueRef" />`,
      setup() {
        return { valueRef }
      },
    })
    const textarea = wrapper.find('textarea')

    expect(textarea.element.value).toBe('init value')

    await textarea.setValue('textarea setValue')

    expect(valueRef.value).toBe('textarea setValue')

    valueRef.value = 'valueRef change'

    await nextTick()

    expect(textarea.element.value).toBe('valueRef change')

    textarea.element.value = '使用拼音'
    await textarea.trigger('compositionstart')

    expect(wrapper.emitted()).toHaveProperty('compositionstart')
    expect(valueRef.value).toBe('valueRef change')

    await textarea.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(valueRef.value).toBe('valueRef change')

    await textarea.trigger('compositionend')

    expect(wrapper.emitted()).toHaveProperty('compositionend')
    expect(valueRef.value).toBe('使用拼音')
  })

  test('disabled work', async () => {
    const wrapper = TextareaMount({ props: { disabled: true } })
    await wrapper.find('textarea').trigger('focus')

    expect(wrapper.classes()).toContain('ix-textarea-disabled')
    expect(wrapper.classes()).not.toContain('ix-textarea-focused')
    expect(wrapper.emitted()).not.toHaveProperty('focus')

    await wrapper.find('textarea').trigger('blur')

    expect(wrapper.emitted()).not.toHaveProperty('blur')

    await wrapper.setProps({ disabled: false })
    await wrapper.find('textarea').trigger('focus')

    expect(wrapper.classes()).not.toContain('ix-textarea-disabled')
    expect(wrapper.classes()).toContain('ix-textarea-focused')
    expect(wrapper.emitted()).toHaveProperty('focus')

    await wrapper.find('textarea').trigger('blur')

    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  test('readonly work', async () => {
    const wrapper = TextareaMount({ props: { readonly: true } })
    await wrapper.find('textarea').trigger('focus')
    await wrapper.find('textarea').trigger('blur')

    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  test('size work', async () => {
    const wrapper = TextareaMount({ props: { size: 'large' } })

    expect(wrapper.classes()).toContain('ix-textarea-large')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.classes()).toContain('ix-textarea-small')

    await wrapper.setProps({ size: undefined })
    expect(wrapper.classes()).toContain('ix-textarea-medium')
  })

  test('clearable work', async () => {
    const wrapper = TextareaMount({ props: { clearable: true } })

    expect(wrapper.find('.ix-icon-close-circle').exists()).toBe(true)
    expect(wrapper.find('.ix-textarea-clear-icon-hidden').exists()).toBe(true)

    await wrapper.find('.ix-icon-close-circle').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('afterClear')

    await wrapper.setProps({ value: 'value' })

    expect(wrapper.find('.ix-textarea-clear-icon-hidden').exists()).toBe(false)

    await wrapper.setProps({ disabled: true })

    expect(wrapper.find('.ix-textarea-clear-icon-hidden').exists()).toBe(true)

    await wrapper.setProps({ disabled: false, readonly: true })

    expect(wrapper.find('.ix-textarea-clear-icon-hidden').exists()).toBe(true)

    await wrapper.setProps({ clearable: false })

    expect(wrapper.find('.ix-icon-close-circle').exists()).toBe(false)
  })

  test('resize and autoRows work', async () => {
    const wrapper = TextareaMount({ props: { resize: 'none' } })

    const textarea = wrapper.find('textarea')
    let previousHeight = textarea.element.clientHeight

    expect(textarea.element.style.resize).toBe('none')

    await wrapper.setProps({ resize: 'both' })

    expect(textarea.element.style.resize).toBe('both')

    await wrapper.setProps({ resize: 'horizontal' })

    expect(textarea.element.style.resize).toBe('horizontal')

    await wrapper.setProps({ autoRows: true })

    await wrapper.setProps({ resize: 'vertical' })
    expect(textarea.element.style.resize).toBe('none')

    expect(textarea.element.clientHeight).toBe(previousHeight)

    await wrapper.setProps({ value: `1\n2\n3\n4\n` })

    // TODO: switch to e2e, jest doesn't do inline styles
    // expect(textarea.element.clientHeight).toBeGreaterThan(previousHeight)
    // expect(textarea.element.clientHeight).toBe(textarea.element.scrollHeight)
    expect(wrapper.html()).toMatchSnapshot()

    previousHeight = textarea.element.clientHeight

    await wrapper.setProps({ value: `1\n2\n3\n4\n5\n6\n` })

    // jest doesn't do inline styles
    // expect(textarea.element.clientHeight).toBeGreaterThan(previousHeight)
    // expect(textarea.element.clientHeight).toBe(textarea.element.scrollHeight)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ autoRows: { minRows: 2, maxRows: 4 } })

    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({ value: `1\n` })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('showCount, maxCount and computeCount  work', async () => {
    const wrapper = TextareaMount({ props: { showCount: true } })

    expect(wrapper.classes()).toContain('ix-textarea-with-count')
    expect(wrapper.attributes('data-count')).toBe('0')

    await wrapper.setProps({ value: 'test' })

    expect(wrapper.attributes('data-count')).toBe('4')

    await wrapper.setProps({ maxCount: '100' })

    expect(wrapper.attributes('data-count')).toBe('4 / 100')

    await wrapper.setProps({ computeCount: (value: string) => `${value.length * 2} - 100` })

    expect(wrapper.attributes('data-count')).toBe('8 - 100')
  })
})
