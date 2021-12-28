import { MountingOptions, mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

import { renderWork } from '@tests'

import { IxIcon } from '../../icon'
import IxResult from '../src/Result'
import { ResultProps } from '../src/types'

describe('Result', () => {
  const ResultMount = (options?: MountingOptions<Partial<ResultProps>>) => mount(IxResult, { ...options })

  renderWork(IxResult)

  test('status work', async () => {
    const wrapper = ResultMount()
    expect(wrapper.findComponent(IxIcon).exists()).toBeTruthy()
    expect(wrapper.find('.ix-icon-info-circle-filled').exists()).toBe(true)
    expect(wrapper.classes()).toContain('ix-result-info')

    await wrapper.setProps({ status: 'success' })
    expect(wrapper.classes()).toContain('ix-result-success')
    expect(wrapper.find('.ix-icon-check-circle-filled').exists()).toBe(true)

    await wrapper.setProps({ status: 'warning' })
    expect(wrapper.classes()).toContain('ix-result-warning')
    expect(wrapper.find('.ix-icon-exclamation-circle-filled').exists()).toBe(true)

    await wrapper.setProps({ status: 'error' })
    expect(wrapper.classes()).toContain('ix-result-error')
    expect(wrapper.find('.ix-icon-close-circle-filled').exists()).toBe(true)

    await wrapper.setProps({ status: 'info' })
    expect(wrapper.classes()).toContain('ix-result-info')
    expect(wrapper.find('.ix-icon-info-circle-filled').exists()).toBe(true)
  })

  test('title work', async () => {
    const wrapper = ResultMount()
    expect(wrapper.find('.ix-result-title').exists()).toBeFalsy()

    await wrapper.setProps({ title: 'Title' })
    expect(wrapper.find('.ix-result-title').exists()).toBeTruthy()
  })

  test('subtitle work', async () => {
    const wrapper = ResultMount()
    expect(wrapper.find('.ix-result-subtitle').exists()).toBeFalsy()

    await wrapper.setProps({ subtitle: 'Subtitle' })
    expect(wrapper.find('.ix-result-subtitle').exists()).toBeTruthy()
  })

  test('icon work', () => {
    const wrapper = ResultMount({ props: { icon: 'check-circle' } })
    expect(wrapper.find('.ix-icon-check-circle').exists()).toBe(true)
  })

  test('slot work', () => {
    const title = 'This is a title.'
    const subtitle = 'This is a subtitle.'
    const extra = 'This is the extra.'
    const TestComponent = defineComponent({
      components: { IxResult },
      template: `
      <IxResult>
        <template>
          <span>default slot</span>
        </template>
        <template #title>${title}</template>
        <template #subtitle>${subtitle}</template>
        <template #extra>${extra}</template>
      </IxResult>
      `,
    })
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.ix-result-content').exists()).toBeTruthy()
    expect(wrapper.find('.ix-result-title').exists()).toBeTruthy()
    expect(wrapper.find('.ix-result-subtitle').exists()).toBeTruthy()
    expect(wrapper.find('.ix-result-extra').exists()).toBeTruthy()

    expect(wrapper.get('.ix-result-content').text()).toEqual('default slot')
    expect(wrapper.get('.ix-result-title').text()).toEqual(title)
    expect(wrapper.get('.ix-result-subtitle').text()).toEqual(subtitle)
    expect(wrapper.get('.ix-result-extra').text()).toEqual(extra)
  })
})
