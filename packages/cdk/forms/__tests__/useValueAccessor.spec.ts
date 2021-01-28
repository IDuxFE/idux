import { flushPromises, mount } from '@vue/test-utils'
import { ComponentOptions, ref, Ref } from 'vue'
import { AbstractControl } from '../src/controls/abstractControl'
import { FormControl } from '../src/controls/formControl'
import { useFormControl, useFormGroup } from '../src/useForms'
import { useValueAccessor } from '../src/useValueAccessor'
import { provideControl } from '../src/utils'

const getInputComponent = () => {
  return {
    template: `<input
    :value="valueAccessor.value"
    @input="onInput"
    @blur="onBlur" />
    `,
    props: ['value', 'control'],
    emits: ['update:value'],
    setup() {
      const valueAccessor = useValueAccessor()
      const onInput = (evt: Event) => {
        valueAccessor.setValue?.((evt.target as HTMLInputElement).value)
      }
      const onBlur = () => {
        valueAccessor.markAsBlurred?.()
      }
      return { valueAccessor, onInput, onBlur }
    },
  }
}

const getApp = (
  Comp: ComponentOptions,
  options: {
    group: AbstractControl
    valueRef?: Ref<string>
    control?: string | AbstractControl
  },
) => {
  return mount({
    components: { Comp },
    template: `<Comp v-model:value="valueRef" :control="control"/>`,
    setup() {
      const { group, valueRef, control } = options
      provideControl(group)
      return { valueRef, control }
    },
  })
}

describe('useValueAccessor.ts', () => {
  let valueRef: Ref<string>
  let control: FormControl
  let group: AbstractControl

  beforeEach(() => {
    valueRef = ref('valueRef')
    control = useFormControl('control')
    group = useFormGroup({ control })
  })

  test('valueRef work', async () => {
    const wrapper = getApp(getInputComponent(), { group, valueRef })
    const input = wrapper.find('input')

    expect(input.element.value).toEqual('valueRef')

    valueRef.value = 'valueRef change'
    await flushPromises()

    expect(input.element.value).toEqual('valueRef change')

    await input.setValue('input change')

    expect(valueRef.value).toEqual('input change')

    await input.trigger('blur')

    expect(group.getValue()).toEqual({ control: 'control' })
    expect(group.blurred.value).toEqual(false)
  })

  test('control work', async () => {
    const wrapper = getApp(getInputComponent(), { group, control, valueRef })
    const input = wrapper.find('input')

    expect(input.element.value).toEqual('control')

    control.setValue('control change')
    await flushPromises()

    expect(input.element.value).toEqual('control change')

    await input.setValue('input change')

    expect(control.getValue()).toEqual('input change')

    await input.trigger('blur')

    expect(group.getValue()).toEqual({ control: 'input change' })
    expect(group.blurred.value).toEqual(true)
    expect(valueRef.value).toEqual('valueRef')
  })

  test('string control work', async () => {
    const wrapper = getApp(getInputComponent(), { group, control: 'control', valueRef })
    const input = wrapper.find('input')

    expect(input.element.value).toEqual('control')

    control.setValue('control change')
    await flushPromises()

    expect(input.element.value).toEqual('control change')

    await input.setValue('input change')

    expect(control.getValue()).toEqual('input change')

    await input.trigger('blur')

    expect(group.getValue()).toEqual({ control: 'input change' })
    expect(group.blurred.value).toEqual(true)
    expect(valueRef.value).toEqual('valueRef')
  })

  test('not find control work', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    const wrapper = getApp(getInputComponent(), { group, control: 'not find', valueRef })

    expect(error).toBeCalled()

    const input = wrapper.find('input')

    expect(input.element.value).toEqual('')

    await input.setValue('input change')
    await input.trigger('blur')

    expect(group.getValue()).toEqual({ control: 'control' })
    expect(group.blurred.value).toEqual(false)
    expect(valueRef.value).toEqual('valueRef')
  })
})
