/* eslint-disable vue/one-component-per-file */

import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

import IxLoadingBarProvider from '../src/LoadingBarProvider'
import { LoadingBarProviderInstance } from '../src/types'
import { useLoadingBar } from '../src/useLoadingBar'

describe('LoadingBarProvider', () => {
  test('no provider', async () => {
    const Test = defineComponent({
      setup() {
        useLoadingBar()
      },
    })
    expect(() => mount(Test)).toThrowError(/IxLoadingBarProvider/)
  })

  test('provider', async () => {
    const Test = defineComponent({
      setup(props, { expose }) {
        expose(useLoadingBar())
      },
      render() {
        return null
      },
    })
    const wrapper = mount({
      template: '<IxLoadingBarProvider><Test ref="test"></Test></IxLoadingBarProvider>',
      components: {
        IxLoadingBarProvider,
        Test,
      },
    })
    const instance = wrapper.vm.$refs['test'] as LoadingBarProviderInstance
    expect(instance.start).not.toBeNull()
    expect(instance.finish).not.toBeNull()
    expect(instance.error).not.toBeNull()
  })
})
