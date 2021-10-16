import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { computed, provide } from 'vue'

import { Validators } from '..'
import { FormGroup } from '../src/controls'
import { useFormGroup } from '../src/useForms'
import { controlToken, useValueAccessor, useValueControl } from '../src/utils'

const InputComponent = {
  template: `<input :value="valueRef" @input="onInput" @blur="onBlur" />`,
  props: ['value', 'control'],
  emits: ['update:value'],
  setup() {
    const { accessor } = useValueAccessor()
    const valueRef = computed(() => accessor.valueRef.value)
    const onInput = (evt: Event) => accessor.setValue((evt.target as HTMLInputElement).value)
    const onBlur = () => accessor.markAsBlurred()
    return { valueRef, onInput, onBlur }
  },
}

const FormComponent = {
  template: `<form><slot /></form>`,
  props: ['control'],
  setup() {
    const control = useValueControl()
    provide(controlToken, control)
  },
}

const MountForm = (group: FormGroup) => {
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
  let group: FormGroup

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
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const { required, min, max, email } = Validators
    group = useFormGroup({
      age: ['18', [required, min(1), max(99)]],
      email: ['', [email]],
    })
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
