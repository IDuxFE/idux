import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { ShallowRef, provide, shallowRef } from 'vue'

import { AbstractControl, Validators } from '..'
import { FormGroup } from '../src/models/formGroup'
import { useFormControl, useFormGroup } from '../src/useForms'
import { FORMS_CONTROL_TOKEN, useAccessor, useAccessorAndControl, useControl } from '../src/utils'

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
    provide(FORMS_CONTROL_TOKEN, control as ShallowRef<AbstractControl>)
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

  test('useAccessor work', async () => {
    const control = useFormControl('initial', Validators.required)
    const controlRef = shallowRef(control)

    const TestComponent = {
      template: `<div>{{ accessor.value }} - {{ accessor.disabled }}</div>`,
      setup() {
        const accessor = useAccessor(controlRef)
        return { accessor }
      },
    }

    const wrapper = mount(TestComponent)

    // 等待 watch 执行
    await flushPromises()

    expect(wrapper.text()).toContain('initial')
    expect(wrapper.text()).toContain('false')

    control.setValue('updated')
    await flushPromises()

    expect(wrapper.text()).toContain('updated')

    control.disable()
    await flushPromises()

    expect(wrapper.text()).toContain('true')
  })

  test('useAccessor with props work', async () => {
    const TestComponent = {
      template: `<div>{{ accessor.value }} - {{ accessor.disabled }}</div>`,
      props: ['value', 'disabled'],
      emits: ['update:value'],
      setup() {
        const accessor = useAccessor(undefined, 'value', 'disabled')
        return { accessor }
      },
    }

    const wrapper = mount(TestComponent, {
      props: {
        value: 'propValue',
        disabled: false,
      },
    })

    expect(wrapper.text()).toContain('propValue')
    expect(wrapper.text()).toContain('false')

    await wrapper.setProps({ value: 'newPropValue', disabled: true })
    await flushPromises()

    expect(wrapper.text()).toContain('newPropValue')
    expect(wrapper.text()).toContain('true')
  })

  test('useAccessorAndControl with custom keys work', async () => {
    const group = useFormGroup({
      customName: ['test', Validators.required],
    })

    const TestComponent = {
      template: `<div>{{ accessor.value || 'undefined' }}</div>`,
      props: ['customControl', 'customValue'],
      setup() {
        const { accessor } = useAccessorAndControl({
          controlKey: 'customControl',
          valueKey: 'customValue',
        })
        return { accessor }
      },
    }

    const FormWrapper = {
      components: { FormComponent, TestComponent },
      template: `<FormComponent :control="group"><TestComponent custom-control="customName" /></FormComponent>`,
      setup() {
        const control = useControl()
        provide(FORMS_CONTROL_TOKEN, control as ShallowRef<AbstractControl>)
        return { group, control }
      },
    }

    const wrapper = mount(FormWrapper)

    await flushPromises()

    // 使用更通用的查找方式
    const testComponent = wrapper.findComponent(TestComponent)
    if (testComponent.exists()) {
      await flushPromises()
      expect(testComponent.text()).toContain('test')
    } else {
      // 如果找不到组件，检查模板是否正确渲染
      const text = wrapper.text()
      expect(text).toContain('test')
    }
  })
})
