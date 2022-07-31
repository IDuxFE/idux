import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxTextarea, { renderSuffix } from '../src/Textarea'
import { TextareaProps } from '../src/types'

describe('Textarea', () => {
  const TextareaMount = (options?: MountingOptions<Partial<TextareaProps>>) => mount(IxTextarea, { ...options })

  renderWork(IxTextarea)

  test('v-model work', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = TextareaMount({ props: { value: 'init value', 'onUpdate:value': onUpdateValue } })
    const textarea = wrapper.find('textarea')

    expect(textarea.element.value).toBe('init value')

    await textarea.setValue('input setValue')

    expect(onUpdateValue).toBeCalledTimes(1)
    expect(onUpdateValue).toBeCalledWith('input setValue')

    await wrapper.setProps({ value: 'wrapper setProps' })

    expect(textarea.element.value).toBe('wrapper setProps')

    textarea.element.value = '使用拼音'
    await textarea.trigger('compositionstart')

    expect(wrapper.emitted()).toHaveProperty('compositionstart')
    expect(onUpdateValue).toBeCalledTimes(1)

    await textarea.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(onUpdateValue).toBeCalledTimes(1)

    await textarea.trigger('compositionend')

    expect(wrapper.emitted()).toHaveProperty('compositionend')
    expect(onUpdateValue).toBeCalledTimes(2)
    expect(onUpdateValue).toBeCalledWith('使用拼音')
  })

  test('disabled work', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const wrapper = TextareaMount({ props: { disabled: true, onFocus, onBlur } })
    //await wrapper.find('textarea').trigger('focus')

    expect(wrapper.classes()).toContain('ix-textarea-disabled')
    // expect(wrapper.classes()).not.toContain('ix-textarea-focused')
    // expect(onFocus).not.toBeCalled()

    // await wrapper.find('textarea').trigger('blur')

    // expect(onBlur).not.toBeCalled()

    await wrapper.setProps({ disabled: false })
    //await wrapper.find('textarea').trigger('focus')

    expect(wrapper.classes()).not.toContain('ix-textarea-disabled')
    //expect(wrapper.classes()).toContain('ix-textarea-focused')
    //expect(onFocus).toBeCalled()

    // await wrapper.find('textarea').trigger('blur')

    // expect(onBlur).toBeCalled()
  })

  // test('readonly work', async () => {
  //   const onFocus = vi.fn()
  //   const onBlur = vi.fn()
  //   const wrapper = TextareaMount({ props: { readonly: true, onFocus, onBlur } })
  //   await wrapper.find('textarea').trigger('focus')

  //   expect(onFocus).toBeCalled()

  //   await wrapper.find('textarea').trigger('blur')

  //   expect(onBlur).toBeCalled()
  // })

  test('size work', async () => {
    const wrapper = TextareaMount({ props: { size: 'lg' } })

    expect(wrapper.classes()).toContain('ix-textarea-lg')

    await wrapper.setProps({ size: 'sm' })
    expect(wrapper.classes()).toContain('ix-textarea-sm')

    await wrapper.setProps({ size: undefined })
    expect(wrapper.classes()).toContain('ix-textarea-md')
  })

  test('clearable work', async () => {
    const onClear = vi.fn()
    const wrapper = TextareaMount({ props: { clearable: true, onClear } })
    const renderSuffixFn = vi.fn(renderSuffix)

    expect(wrapper.find('.ix-icon-close-circle').exists()).toBe(true)
    expect(wrapper.find('.ix-textarea-suffix-hidden').exists()).toBe(true)

    await wrapper.find('.ix-icon-close-circle').trigger('click')

    expect(onClear).toBeCalled()

    await wrapper.setProps({ value: 'value' })

    expect(wrapper.find('.ix-textarea-suffix-hidden').exists()).toBe(false)

    const res = (renderSuffixFn(true, undefined, '', true, onClear, '', true)?.props as { class: '' }).class

    expect(res).toBe('-suffix -suffix-scroll')

    await wrapper.setProps({ disabled: true })

    expect(wrapper.find('.ix-textarea-suffix-hidden').exists()).toBe(true)

    await wrapper.setProps({ disabled: false, readonly: true })

    expect(wrapper.find('.ix-textarea-suffix-hidden').exists()).toBe(true)

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
