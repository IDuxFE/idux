import { flushPromises, mount } from '@vue/test-utils'
import { ComponentOptions } from 'vue'
import { AbstractControl } from '../src/controls/abstractControl'
import { useFormControl, useFormGroup } from '../src/useForms'
import { injectControl, provideControl } from '../src/utils'

const notFindText = 'not find control'

const getComp = () => {
  return {
    template: `<div>{{ valueRef }}</div>`,
    setup() {
      const { valueRef } = injectControl('control') || { valueRef: notFindText }
      return { valueRef }
    },
  }
}

const getApp = (Comp: ComponentOptions, control: AbstractControl) => {
  return mount({
    components: { Comp },
    template: `<Comp />`,
    setup() {
      provideControl(control)
    },
  })
}

describe('utils.ts', () => {
  test('basic work', async () => {
    const control = useFormControl('text')
    const group = useFormGroup({ control })
    const app = getApp(getComp(), group)

    expect(app.text()).toEqual('text')

    control.setValue('text1')
    await flushPromises()

    expect(app.text()).toEqual('text1')
  })

  test('not find control work', async () => {
    const group = useFormGroup({})
    const app = getApp(getComp(), group)

    expect(app.text()).toEqual(notFindText)
  })

  test('not provide work', async () => {
    const app = mount(getComp())

    expect(app.text()).toEqual(notFindText)
  })
})
