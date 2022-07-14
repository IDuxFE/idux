import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { provide } from 'vue'

import { Validators } from '..'
import { FormGroup } from '../src/controls'
import { useFormGroup } from '../src/useForms'
import { FORMS_CONTROL_TOKEN, useAccessorAndControl, useControl } from '../src/utils'

interface BasicGroup {
  name: string
  age: string
  email: string
}

const InputComponent = {
  template: `<input :value="accessor.value" :disabled="accessor.disabled" @input="onInput" @blur="onBlur" />`,
  props: ['value', 'control', 'disabled'],
  emits: ['update:value'],
  setup() {
    const { accessor } = useAccessorAndControl()
    const onInput = (evt: Event) => accessor.setValue((evt.target as HTMLInputElement).value)
    const onBlur = () => accessor.markAsBlurred()
    return { accessor, onInput, onBlur }
  },
}

const FormComponent = {
  template: `<form><slot /></form>`,
  props: ['control'],
  setup() {
    const control = useControl()
    provide(FORMS_CONTROL_TOKEN, control)
  },
}

const MountForm = (group: FormGroup<BasicGroup>) => {
  return mount({
    components: { FormComponent, InputComponent },
    template: `
    <FormComponent :control="group">
      <InputComponent id="name" control="name" />
      <InputComponent id="age" control="age" />
      <InputComponent id="email" control="email" />
    </FormComponent>
    `,
    setup() {
      return { group }
    },
  })
}

describe('utils.ts', () => {
  let group: FormGroup<BasicGroup>

  test('basic work', async () => {
    const { required, min, max, email } = Validators
    group = useFormGroup({
      name: ['tom', required],
      age: ['18', [required, min(1), max(99)]],
      email: ['', [email]],
    })
    const wrapper = MountForm(group)
    const nameInput = wrapper.find('#name') as DOMWrapper<HTMLInputElement>
    const nameControl = group.get('name')!

    expect(nameInput.element.value).toEqual('tom')

    nameControl.setValue('jerry')
    await flushPromises()

    expect(nameInput.element.value).toEqual('jerry')
    expect(group.getValue()).toEqual({ name: 'jerry', age: '18', email: '' })

    await nameInput.setValue('spike')

    expect(nameControl.getValue()).toEqual('spike')
    expect(group.getValue()).toEqual({ name: 'spike', age: '18', email: '' })

    await nameInput.trigger('blur')

    expect(nameControl.blurred.value).toEqual(true)
    expect(group.blurred.value).toEqual(true)
  })

  test('not find work', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { required, min, max, email } = Validators
    group = useFormGroup({
      age: ['18', [required, min(1), max(99)]],
      email: ['', [email]],
    }) as unknown as FormGroup<BasicGroup>
    const wrapper = MountForm(group)
    const nameInput = wrapper.find('#name') as DOMWrapper<HTMLInputElement>

    expect(warn).toBeCalled()

    expect(nameInput.element.value).toEqual('')

    await nameInput.setValue('input change')
    await nameInput.trigger('blur')

    expect(group.getValue()).toEqual({ age: '18', email: '' })
    expect(group.blurred.value).toEqual(false)
  })
})
