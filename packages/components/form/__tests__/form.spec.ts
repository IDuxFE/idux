import { MountingOptions, mount } from '@vue/test-utils'
import { h } from 'vue'

import { renderWork } from '@tests'

import { Validators, useFormControl, useFormGroup } from '@idux/cdk/forms'
import { IxButton } from '@idux/components/button'
import { IxCheckbox } from '@idux/components/checkbox'
import { IxInput } from '@idux/components/input'

import Form from '../src/Form'
import FormItem from '../src/FormItem'
import FormWrapper from '../src/FormWrapper'
import { FormItemProps, FormProps } from '../src/types'

describe('Form', () => {
  describe('basic work', () => {
    const FormMount = (options?: MountingOptions<Partial<FormProps>>) => mount(Form, { ...options })

    renderWork(Form, {
      slots: {
        default: () => [
          h(FormItem, { label: 'Username' }, () => h(IxInput)),
          h(FormItem, { label: 'Password' }, () => h(IxInput)),
          h(FormItem, { label: 'Remember' }, () => h(IxCheckbox)),
          h(FormItem, null, () => h(IxButton, null, () => 'Click')),
        ],
      },
    })

    test('colonless work', async () => {
      const wrapper = FormMount({
        props: { colonless: true },
        slots: {
          default: () => [
            h(FormItem, { label: 'Username' }, () => h(IxInput)),
            h(FormItem, { label: 'Password', colonless: true }, () => h(IxInput)),
            h(FormItem, { label: 'Remember', colonless: false }, () => h(IxCheckbox)),
          ],
        },
      })

      const items = wrapper.findAll('.ix-form-item')

      expect(items[0].find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-colon')
      expect(items[1].find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-colon')
      expect(items[2].find('.ix-form-item-label').classes()).toContain('ix-form-item-label-colon')

      await wrapper.setProps({ colonless: false })

      expect(items[0].find('.ix-form-item-label').classes()).toContain('ix-form-item-label-colon')
      expect(items[1].find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-colon')
      expect(items[2].find('.ix-form-item-label').classes()).toContain('ix-form-item-label-colon')
    })

    // TODO: FIX
    test('control work', async () => {
      const { required, minLength, maxLength } = Validators

      const formGroup = useFormGroup({
        username: ['name', required],
        password: ['123456', [required, minLength(6), maxLength(18)]],
        remember: [true],
      })

      FormMount({
        props: { control: formGroup },
        slots: {
          default: () => [
            // h(FormItem, { label: 'Username' }, { default: () => h(IxInput, { control: 'username' }) }),
            // h(FormItem, { label: 'Password' }, { default: () => h(IxInput, { control: 'password' }) }),
            // h(FormItem, { label: 'Remember' }, { default: () => h(IxCheckbox, { control: 'remember' }) }),
          ],
        },
      })

      //const items = wrapper.findAll('.ix-form-item')

      // expect(items[0].find('input').element.value).toBe('name')
      // expect(items[1].find('input').element.value).toBe('123456')
      // expect(items[2].find('input').element.checked).toBe(true)

      // formGroup.setValue({ username: 'username', remember: false })

      // await wrapper.setProps({ control: formGroup })

      // expect(items[0].find('input').element.value).toBe('username')
      // expect(items[1].find('input').element.value).toBe('123456')
      // expect(items[2].find('input').element.checked).toBe(false)
    })

    test('controlCol work', async () => {
      const wrapper = FormMount({
        props: { controlCol: 4 },
        slots: {
          default: () => [
            h(FormItem, { label: 'Username' }, () => h(IxInput)),
            h(FormItem, { label: 'Password', controlCol: 6 }, () => h(IxInput)),
            h(FormItem, { label: 'Remember', controlCol: { span: 8 } }, () => h(IxCheckbox)),
          ],
        },
      })

      const items = wrapper.findAll('.ix-form-item')

      expect(items[0].find('.ix-form-item-control').classes()).toContain('ix-col-span-4')
      expect(items[1].find('.ix-form-item-control').classes()).toContain('ix-col-span-6')
      expect(items[2].find('.ix-form-item-control').classes()).toContain('ix-col-span-8')

      await wrapper.setProps({ controlCol: { span: 5 } })

      expect(items[0].find('.ix-form-item-control').classes()).toContain('ix-col-span-5')
      expect(items[1].find('.ix-form-item-control').classes()).toContain('ix-col-span-6')
      expect(items[2].find('.ix-form-item-control').classes()).toContain('ix-col-span-8')
    })

    test('labelTooltipIcon and controlTooltipIcon work', async () => {
      const wrapper = FormMount({
        props: {
          labelTooltipIcon: 'info',
          controlTooltipIcon: 'info',
        },
        slots: {
          default: () => [
            h(
              FormItem,
              {
                label: 'Username',
                labelTooltip: 'labelTooltip',
                labelTooltipIcon: 'up',
                controlTooltip: 'controlTooltip',
                controlTooltipIcon: 'up',
              },
              () => h(IxInput),
            ),
          ],
        },
      })

      const items = wrapper.findAll('.ix-form-item')

      expect(items[0].find('.ix-form-item-label .ix-icon').classes()).not.toContain('ix-icon-info')
      expect(items[0].find('.ix-form-item-control-input .ix-icon').classes()).not.toContain('ix-icon-info')
    })

    test('labelAlign work', async () => {
      const wrapper = FormMount({
        props: { labelAlign: 'start' },
        slots: {
          default: () => [
            h(FormItem, { label: 'Username' }, () => h(IxInput)),
            h(FormItem, { label: 'Password', labelAlign: 'start' }, () => h(IxInput)),
            h(FormItem, { label: 'Remember', labelAlign: 'end' }, () => h(IxCheckbox)),
          ],
        },
      })

      const items = wrapper.findAll('.ix-form-item')

      expect(items[0].find('.ix-form-item-label').classes()).toContain('ix-form-item-label-start')
      expect(items[1].find('.ix-form-item-label').classes()).toContain('ix-form-item-label-start')
      expect(items[2].find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-start')

      await wrapper.setProps({ labelAlign: 'end' })

      expect(items[0].find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-start')
      expect(items[1].find('.ix-form-item-label').classes()).toContain('ix-form-item-label-start')
      expect(items[2].find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-start')
    })

    test('labelCol work', async () => {
      const wrapper = FormMount({
        props: { labelCol: 4 },
        slots: {
          default: () => [
            h(FormItem, { label: 'Username' }, () => h(IxInput)),
            h(FormItem, { label: 'Password', labelCol: 6 }, () => h(IxInput)),
            h(FormItem, { label: 'Remember', labelCol: { span: 8 } }, () => h(IxCheckbox)),
          ],
        },
      })

      const items = wrapper.findAll('.ix-form-item')

      expect(items[0].find('.ix-form-item-label').classes()).toContain('ix-col-span-4')
      expect(items[1].find('.ix-form-item-label').classes()).toContain('ix-col-span-6')
      expect(items[2].find('.ix-form-item-label').classes()).toContain('ix-col-span-8')

      await wrapper.setProps({ labelCol: { span: 5 } })

      expect(items[0].find('.ix-form-item-label').classes()).toContain('ix-col-span-5')
      expect(items[1].find('.ix-form-item-label').classes()).toContain('ix-col-span-6')
      expect(items[2].find('.ix-form-item-label').classes()).toContain('ix-col-span-8')
    })

    test('layout work', async () => {
      const wrapper = FormMount({
        props: { layout: 'vertical' },
      })

      expect(wrapper.classes()).toContain('ix-form-vertical')

      await wrapper.setProps({ layout: 'horizontal' })

      expect(wrapper.classes()).toContain('ix-form-horizontal')

      await wrapper.setProps({ layout: 'inline' })

      expect(wrapper.classes()).toContain('ix-form-inline')
    })

    test('size work', async () => {
      const wrapper = FormMount({
        props: { size: 'sm' },
      })

      expect(wrapper.classes()).toContain('ix-form-sm')

      await wrapper.setProps({ size: 'md' })

      expect(wrapper.classes()).toContain('ix-form-md')

      await wrapper.setProps({ size: 'lg' })

      expect(wrapper.classes()).toContain('ix-form-lg')
    })

    test('statusIcon work', async () => {
      const wrapper = FormMount({
        props: { statusIcon: true },
        slots: {
          default: () => [
            h(FormItem, { label: 'Username', status: 'valid' }, () => h(IxInput)),
            h(FormItem, { label: 'Password', status: 'invalid' }, () => h(IxInput)),
            h(FormItem, { label: 'Remember', status: 'validating' }, () => h(IxCheckbox)),
          ],
        },
      })

      const items = wrapper.findAll('.ix-form-item')

      expect(items[0].classes()).toContain('ix-form-item-with-status-icon')
      expect(items[0].find('.ix-form-item-status-icon').find('.ix-icon-check-circle-filled').exists()).toBe(true)
      expect(items[1].classes()).toContain('ix-form-item-with-status-icon')
      expect(items[1].find('.ix-form-item-status-icon').find('.ix-icon-close-circle-filled').exists()).toBe(true)
      expect(items[2].classes()).toContain('ix-form-item-with-status-icon')
      expect(items[2].find('.ix-form-item-status-icon').find('.ix-icon-loading').exists()).toBe(true)

      await wrapper.setProps({ statusIcon: { valid: 'up', invalid: 'down' } })

      expect(items[0].find('.ix-form-item-status-icon').find('.ix-icon-up').exists()).toBe(true)
      expect(items[1].find('.ix-form-item-status-icon').find('.ix-icon-down').exists()).toBe(true)
      expect(items[2].find('.ix-form-item-status-icon').find('.ix-icon-loading').exists()).toBe(true)
    })
  })

  describe('item work', () => {
    const FormItemMount = (options?: MountingOptions<Partial<FormItemProps>>) => mount(FormItem, { ...options })

    renderWork(FormItem, {
      props: { label: 'Username' },
      slots: { default: () => h(IxInput) },
    })

    test('colonless work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username', colonless: true },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-colon')

      await wrapper.setProps({ colonless: false })

      expect(wrapper.find('.ix-form-item-label').classes()).toContain('ix-form-item-label-colon')
    })

    test('control work', async () => {
      const { required, minLength, maxLength } = Validators
      const control = useFormControl('name', { validators: [required, minLength(6), maxLength(12)] })

      const wrapper = FormItemMount({
        props: { control },
        slots: { default: () => h(IxInput, { control }) },
      })

      expect(wrapper.find('input').element.value).toBe('name')

      // await wrapper.setProps({ control: formGroup })

      //   expect(wrapper.find('input').element.value).toBe('name')
    })

    test('controlCol work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username', controlCol: 4 },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-control').classes()).toContain('ix-col-span-4')

      await wrapper.setProps({ controlCol: { span: 5 } })

      expect(wrapper.find('.ix-form-item-control').classes()).toContain('ix-col-span-5')
    })

    test('controlTooltip work', async () => {
      const wrapper = FormItemMount({
        props: { controlTooltip: 'controlTooltip', controlTooltipIcon: 'info' },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-control-tooltip').exists()).toBe(true)
    })

    test('controlTooltip slot work', async () => {
      const wrapper = FormItemMount({
        slots: { default: () => h(IxInput), controlTooltip: () => 'controlTooltip slot' },
      })

      expect(wrapper.find('.ix-form-item-control-tooltip').exists()).toBe(true)
    })

    test('controlTooltipIcon work', async () => {
      const wrapper = FormItemMount({
        props: { controlTooltip: 'controlTooltip', controlTooltipIcon: 'info-circle' },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-control-tooltip .ix-icon-info-circle').exists()).toBe(true)

      await wrapper.setProps({ controlTooltipIcon: 'up' })

      expect(wrapper.find('.ix-form-item-control-tooltip .ix-icon-up').exists()).toBe(true)
    })

    test('description work', async () => {
      let description = 'extraMessage'
      const wrapper = FormItemMount({
        props: { label: 'Username', description },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-description').text()).toBe(description)

      description = 'extraMessage2'
      await wrapper.setProps({ description })

      expect(wrapper.find('.ix-form-item-description').text()).toBe(description)
    })

    test('extraMessage slot work', async () => {
      const description = 'extraMessage'
      const wrapper = FormItemMount({
        props: { label: 'Username', description },
        slots: { default: () => h(IxInput), description: () => 'description slot' },
      })

      expect(wrapper.find('.ix-form-item-description').text()).toBe('description slot')
    })

    test('label work', async () => {
      let label = 'label'
      const wrapper = FormItemMount({
        props: { label },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-label').text()).toBe(label)

      label = 'label2'
      await wrapper.setProps({ label })

      expect(wrapper.find('.ix-form-item-label').text()).toBe(label)
    })

    test('label slot work', async () => {
      const label = 'label'
      const wrapper = FormItemMount({
        props: { label },
        slots: { default: () => h(IxInput), label: () => 'label slot' },
      })

      expect(wrapper.find('.ix-form-item-label').text()).toBe('label slot')
    })

    test('labelAlign work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username', labelAlign: 'start' },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-label').classes()).toContain('ix-form-item-label-start')

      await wrapper.setProps({ labelAlign: 'end' })

      expect(wrapper.find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-start')
    })

    test('labelCol work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username', labelCol: 4 },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-label').classes()).toContain('ix-col-span-4')

      await wrapper.setProps({ labelCol: { span: 5 } })

      expect(wrapper.find('.ix-form-item-label').classes()).toContain('ix-col-span-5')
    })

    // TODO: FIX
    test.skip('labelFor work', async () => {
      const onFocus = vi.fn()
      const wrapper = FormItemMount({
        props: { label: 'Username', labelFor: 'test-input' },
        slots: { default: () => h(IxInput, { id: 'test-input', onFocus }) },
      })

      await wrapper.find('.ix-form-item-label').find('label').trigger('click')

      expect(onFocus).toBeCalledTimes(1)
    })

    test('labelTooltip work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username', labelTooltip: 'labelTooltip', labelTooltipIcon: 'info' },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-label-tooltip').exists()).toBe(true)
    })

    test('labelTooltip slot work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username' },
        slots: { default: () => h(IxInput), labelTooltip: () => 'labelTooltip slot' },
      })

      expect(wrapper.find('.ix-form-item-label-tooltip').exists()).toBe(true)
    })

    test('labelTooltipIcon work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username', labelTooltip: 'labelTooltipIcon', labelTooltipIcon: 'info-circle' },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-label-tooltip .ix-icon-info-circle').exists()).toBe(true)

      await wrapper.setProps({ labelTooltipIcon: 'up' })

      expect(wrapper.find('.ix-form-item-label-tooltip .ix-icon-up').exists()).toBe(true)
    })

    test('required work', async () => {
      const wrapper = FormItemMount({
        props: { label: 'Username', required: true },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-label').classes()).toContain('ix-form-item-label-required')

      await wrapper.setProps({ required: false })

      expect(wrapper.find('.ix-form-item-label').classes()).not.toContain('ix-form-item-label-required')
    })

    test('message work', async () => {
      let message: string | Record<string, string> = 'message'
      const wrapper = FormItemMount({
        props: { label: 'Username', message },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.find('.ix-form-item-message-valid').exists()).toBe(false)

      await wrapper.setProps({ status: 'valid' })

      expect(wrapper.find('.ix-form-item-message-valid').exists()).toBe(false)

      await wrapper.setProps({ status: 'invalid' })

      expect(wrapper.find('.ix-form-item-message-invalid').text()).toBe(message)

      message = 'message2'
      await wrapper.setProps({ message })

      expect(wrapper.find('.ix-form-item-message-invalid').text()).toBe(message)

      message = { valid: 'valid message', invalid: 'invalid message', validating: 'validating message' }
      await wrapper.setProps({ message })

      expect(wrapper.find('.ix-form-item-message-invalid').text()).toBe(message.invalid)

      await wrapper.setProps({ status: 'valid' })

      expect(wrapper.find('.ix-form-item-message-valid').text()).toBe(message.valid)

      await wrapper.setProps({ status: 'validating' })

      expect(wrapper.find('.ix-form-item-message-validating').text()).toBe(message.validating)
    })

    test('status work', async () => {
      const wrapper = FormItemMount({
        props: { status: 'valid' },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.classes()).toContain('ix-form-item-valid')

      await wrapper.setProps({ status: 'invalid' })

      expect(wrapper.classes()).toContain('ix-form-item-invalid')

      await wrapper.setProps({ status: 'validating' })

      expect(wrapper.classes()).toContain('ix-form-item-validating')
    })

    test('statusIcon work', async () => {
      const wrapper = FormItemMount({
        props: { statusIcon: true },
        slots: { default: () => h(IxInput) },
      })

      expect(wrapper.classes()).not.toContain('ix-form-item-with-status-icon')

      await wrapper.setProps({ status: 'valid' })

      expect(wrapper.classes()).toContain('ix-form-item-with-status-icon')

      expect(wrapper.find('.ix-form-item-status-icon').find('.ix-icon-check-circle-filled').exists()).toBe(true)

      await wrapper.setProps({ statusIcon: { valid: 'up', invalid: 'down' } })

      expect(wrapper.find('.ix-form-item-status-icon').find('.ix-icon-up').exists()).toBe(true)

      await wrapper.setProps({ status: 'invalid' })

      expect(wrapper.find('.ix-form-item-status-icon').find('.ix-icon-down').exists()).toBe(true)
    })
  })

  describe('wrapper work', () => {
    // const FormWrapperMount = (options?: MountingOptions<Partial<FormItemProps>>) => mount(FormWrapper, { ...options })

    renderWork(FormWrapper, {
      slots: {
        default: () => [
          h(FormItem, { label: 'Username' }, () => h(IxInput)),
          h(FormItem, { label: 'Password', labelCol: 6 }, () => h(IxInput)),
          h(FormItem, { label: 'Remember', labelCol: { span: 8 } }, () => h(IxCheckbox)),
        ],
      },
    })
  })
})
