import { renderWork } from '@tests'
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils'
import { DefineComponent, nextTick, ref } from 'vue'
import IxInput from '../src/Input.vue'
import { InputProps } from '../src/types'

describe('Input.vue', () => {
  let InputMount: (
    options?: MountingOptions<Partial<InputProps>>,
  ) => VueWrapper<InstanceType<DefineComponent<InputProps>>>

  beforeEach(() => {
    InputMount = (options = {}) => {
      return mount<InputProps>(IxInput, {
        ...options,
      })
    }
  })

  renderWork(IxInput)

  test('v-model work', async () => {
    const valueRef = ref('init value')
    const wrapper = mount({
      components: { IxInput },
      template: `<ix-input v-model:value="valueRef" />`,
      setup() {
        return { valueRef }
      },
    })
    const input = wrapper.find('input')

    expect(input.element.value).toBe('init value')

    await input.setValue('input setValue')

    expect(valueRef.value).toBe('input setValue')

    valueRef.value = 'valueRef change'

    await nextTick()

    expect(input.element.value).toBe('valueRef change')

    input.element.value = '使用拼音'
    await input.trigger('compositionstart')

    expect(wrapper.emitted()).toHaveProperty('compositionstart')
    expect(valueRef.value).toBe('valueRef change')

    await input.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(valueRef.value).toBe('valueRef change')

    await input.trigger('compositionend')

    expect(wrapper.emitted()).toHaveProperty('compositionend')
    expect(valueRef.value).toBe('使用拼音')
  })

  test('disabled work', async () => {
    const wrapper = InputMount({ props: { disabled: true } })
    await wrapper.find('input').trigger('focus')

    expect(wrapper.classes()).toContain('ix-input-disabled')
    expect(wrapper.classes()).not.toContain('ix-input-focused')
    expect(wrapper.emitted()).not.toHaveProperty('focus')

    await wrapper.find('input').trigger('blur')

    expect(wrapper.emitted()).not.toHaveProperty('blur')

    await wrapper.setProps({ disabled: false })
    await wrapper.find('input').trigger('focus')

    expect(wrapper.classes()).not.toContain('ix-input-disabled')
    expect(wrapper.classes()).toContain('ix-input-focused')
    expect(wrapper.emitted()).toHaveProperty('focus')

    await wrapper.find('input').trigger('blur')

    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  test('readonly work', async () => {
    const wrapper = InputMount({ props: { readonly: true } })
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')

    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  test('addonAfter and addonBefore work', async () => {
    const wrapper = InputMount({ props: { addonAfter: 'addonAfter', addonBefore: 'addonBefore' } })

    expect(wrapper.classes()).toContain('ix-input-with-addon-after')
    expect(wrapper.classes()).toContain('ix-input-with-addon-before')

    const addons = wrapper.findAll('.ix-input-addon')

    expect(addons[0].text()).toBe('addonBefore')
    expect(addons[1].text()).toBe('addonAfter')

    await wrapper.setProps({ addonAfter: 'addonAfter change' })

    expect(addons[1].text()).toBe('addonAfter change')

    await wrapper.setProps({ addonBefore: 'addonBefore change' })

    expect(addons[0].text()).toBe('addonBefore change')

    await wrapper.setProps({ addonAfter: '' })

    expect(wrapper.classes()).not.toContain('ix-input-with-addon-after')
    expect(wrapper.findAll('.ix-input-addon').length).toBe(1)

    await wrapper.setProps({ addonBefore: '' })

    expect(wrapper.classes()).not.toContain('ix-input-with-addon-before')
    expect(wrapper.findAll('.ix-input-addon').length).toBe(0)
  })

  test('addonAfter and addonBefore slots work', async () => {
    const wrapper = InputMount({
      props: { addonAfter: 'addonAfter', addonBefore: 'addonBefore' },
      slots: { addonAfter: 'addonAfter slot', addonBefore: 'addonBefore slot' },
    })

    expect(wrapper.classes()).toContain('ix-input-with-addon-after')
    expect(wrapper.classes()).toContain('ix-input-with-addon-before')

    const addons = wrapper.findAll('.ix-input-addon')

    expect(addons[0].text()).toBe('addonBefore slot')
    expect(addons[1].text()).toBe('addonAfter slot')
  })

  test('suffix and prefix work', async () => {
    const wrapper = InputMount({ props: { suffix: 'up', prefix: 'down' } })

    const suffix = wrapper.find('.ix-input-suffix')
    const prefix = wrapper.find('.ix-input-prefix')

    expect(suffix.find('.ix-icon-up').exists()).toBe(true)
    expect(prefix.find('.ix-icon-down').exists()).toBe(true)

    await suffix.find('.ix-icon-up').trigger('click')
    await prefix.find('.ix-icon-down').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('suffixClick')
    expect(wrapper.emitted()).toHaveProperty('prefixClick')

    await wrapper.setProps({ suffix: 'left' })

    expect(suffix.find('.ix-icon-left').exists()).toBe(true)

    await wrapper.setProps({ prefix: 'right' })

    expect(prefix.find('.ix-icon-right').exists()).toBe(true)

    await wrapper.setProps({ suffix: '' })

    expect(wrapper.find('.ix-input-suffix').exists()).toBe(false)

    await wrapper.setProps({ prefix: '' })

    expect(wrapper.find('.ix-input-prefix').exists()).toBe(false)
  })

  test('suffix and prefix slots work', async () => {
    const wrapper = InputMount({
      props: { suffix: 'up', prefix: 'down' },
      slots: { suffix: 'suffix slot', prefix: 'prefix slot' },
    })

    const suffix = wrapper.find('.ix-input-suffix')
    const prefix = wrapper.find('.ix-input-prefix')

    expect(suffix.find('.ix-icon-up').exists()).toBe(false)
    expect(prefix.find('.ix-icon-down').exists()).toBe(false)

    expect(suffix.text()).toBe('suffix slot')
    expect(prefix.text()).toBe('prefix slot')
  })

  test('size work', async () => {
    const wrapper = InputMount({ props: { size: 'large' } })

    expect(wrapper.classes()).toContain('ix-input-large')

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.classes()).toContain('ix-input-small')

    await wrapper.setProps({ size: undefined })
    expect(wrapper.classes()).toContain('ix-input-medium')
  })

  test('clearable work', async () => {
    const wrapper = InputMount({ props: { clearable: true } })

    expect(wrapper.find('.ix-icon-close-circle').exists()).toBe(true)
    expect(wrapper.find('.ix-input-clear-icon-hidden').exists()).toBe(true)

    await wrapper.find('.ix-icon-close-circle').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('afterClear')

    await wrapper.setProps({ value: 'value' })

    expect(wrapper.find('.ix-input-clear-icon-hidden').exists()).toBe(false)

    await wrapper.setProps({ disabled: true })

    expect(wrapper.find('.ix-input-clear-icon-hidden').exists()).toBe(true)

    await wrapper.setProps({ disabled: false, readonly: true })

    expect(wrapper.find('.ix-input-clear-icon-hidden').exists()).toBe(true)

    await wrapper.setProps({ clearable: false })

    expect(wrapper.find('.ix-icon-close-circle').exists()).toBe(false)
  })

  test('borderless work', async () => {
    const wrapper = InputMount({ props: { borderless: true } })

    expect(wrapper.classes()).toContain('ix-input-borderless')

    await wrapper.setProps({ borderless: false })

    expect(wrapper.classes()).not.toContain('ix-input-borderless')
  })
})
