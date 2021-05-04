import { mount } from '@vue/test-utils'
import { Ref, ref, nextTick } from 'vue'
import { renderWork } from '@tests'
import IxCollapse from '../src/Collapse.vue'
import IxCollapsePanel from '../src/CollapsePanel.vue'

const CombineComponent = {
  components: { IxCollapse, IxCollapsePanel },
  template: `
  <ix-collapse>
    <ix-collapse-panel name="name1"> name1 </ix-collapse-panel>
    <ix-collapse-panel name="name2"> name2 </ix-collapse-panel>
    <ix-collapse-panel name="name3"> name3 </ix-collapse-panel>
  </ix-collapse>
  `,
}
describe('Collapse.vue and CollapsePanel.vue', () => {
  renderWork(CombineComponent)

  test('active(v-model) work', async () => {
    const active = ref([]) as Ref<string[]>
    const wrapper = mount({
      components: { IxCollapse, IxCollapsePanel },
      template: `
      <ix-collapse v-model:active="active">
        <ix-collapse-panel name="name1"> name1 </ix-collapse-panel>
        <ix-collapse-panel name="name2"> name2 </ix-collapse-panel>
        <ix-collapse-panel name="name3"> name3 </ix-collapse-panel>
      </ix-collapse>
      `,
      setup() {
        return { active }
      },
    })

    expect(wrapper.findAll('.ix-collapse-panel').length).toBe(3)
    expect(wrapper.findAll('.ix-collapse-panel-active').length).toBe(0)

    active.value = ['name1']

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxCollapsePanel' })[0].classes()).toContain('ix-collapse-panel-active')
    expect(active.value).toEqual(['name1'])

    await wrapper.findAll('.ix-collapse-panel-header')[0].trigger('click')

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxCollapsePanel' })[0].classes()).not.toContain(
      'ix-collapse-panel-active',
    )
    expect(active.value).toEqual([])

    await wrapper.findAll('.ix-collapse-panel-header')[0].trigger('click')
    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxCollapsePanel' })[0].classes()).toContain('ix-collapse-panel-active')
    expect(active.value).toEqual(['name1'])
  })

  test('accordion work', async () => {
    const active = ref('')
    const accordion = ref(true)
    const mockFn = jest.fn()

    const wrapper = mount({
      components: { IxCollapse, IxCollapsePanel },
      provide: {},
      template: `
      <ix-collapse v-model:active="active" :accordion='accordion' @update:active="mockFn">
        <ix-collapse-panel name="name1"> name1 </ix-collapse-panel>
        <ix-collapse-panel name="name2"> name2 </ix-collapse-panel>
        <ix-collapse-panel name="name3"> name3 </ix-collapse-panel>
      </ix-collapse>
      `,
      setup() {
        return { active, accordion, mockFn }
      },
    })

    expect(wrapper.findAll('.ix-collapse-panel').length).toBe(3)
    expect(active.value).toEqual('')
    expect(mockFn).toBeCalledTimes(0)

    active.value = 'name1'

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxCollapsePanel' })[0].classes()).toContain('ix-collapse-panel-active')
    expect(active.value).toEqual('name1')

    await wrapper.findAll('.ix-collapse-panel-header')[1].trigger('click')

    expect(mockFn).toBeCalledTimes(1)
    expect(active.value).toEqual(['name2'])

    await wrapper.findAll('.ix-collapse-panel-header')[2].trigger('click')

    expect(mockFn).toBeCalledTimes(2)
    expect(active.value).toEqual(['name3'])

    await wrapper.findAll('.ix-collapse-panel-header')[2].trigger('click')

    expect(mockFn).toBeCalledTimes(3)
  })

  test('borderless work', async () => {
    const borderless = ref(true)
    const active = ref([])
    const wrapper = mount({
      components: { IxCollapse, IxCollapsePanel },
      template: `
      <ix-collapse v-model:active="active" :borderless='borderless'>
        <ix-collapse-panel name="name1"> name1 </ix-collapse-panel>
        <ix-collapse-panel name="name2"> name2 </ix-collapse-panel>
        <ix-collapse-panel name="name3"> name3 </ix-collapse-panel>
      </ix-collapse>
      `,
      setup() {
        return { active, borderless }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxCollapse' })[0].classes()).toContain('ix-collapse-borderless')

    borderless.value = false

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxCollapse' })[0].classes()).not.toContain('ix-collapse-borderless')
  })

  test('collapse panel disabled work', async () => {
    const active = ref([]) as Ref<string[]>
    const disabled = ref(true)
    const mockFn = jest.fn()

    const wrapper = mount({
      components: { IxCollapse, IxCollapsePanel },
      template: `
      <ix-collapse v-model:active="active" @update:active="mockFn">
        <ix-collapse-panel name="name1" :disabled='disabled'> name1 </ix-collapse-panel>
        <ix-collapse-panel name="name2"> name2 </ix-collapse-panel>
        <ix-collapse-panel name="name3"> name3 </ix-collapse-panel>
      </ix-collapse>
      `,
      setup() {
        return { active, disabled, mockFn }
      },
    })

    expect(wrapper.findAllComponents({ name: 'IxCollapsePanel' })[0].classes()).toContain('ix-collapse-panel-disabled')
    expect(mockFn).toBeCalledTimes(0)

    await wrapper.findAll('.ix-collapse-panel-header')[0].trigger('click')

    expect(mockFn).toBeCalledTimes(0)

    disabled.value = false

    await nextTick()

    expect(wrapper.findAllComponents({ name: 'IxCollapsePanel' })[0].classes()).not.toContain(
      'ix-collapse-panel-disabled',
    )

    await wrapper.findAll('.ix-collapse-panel-header')[0].trigger('click')

    expect(mockFn).toBeCalledTimes(1)
  })

  test('collapse panel icon work', async () => {
    const active = ref([]) as Ref<string[]>
    const icon = ref([]) as Ref<string[]>

    const wrapper = mount({
      components: { IxCollapse, IxCollapsePanel },
      template: `
      <ix-collapse v-model:active="active">
        <ix-collapse-panel name="name1" :icon=icon> name1 </ix-collapse-panel>
        <ix-collapse-panel name="name2" :icon=icon> name2 </ix-collapse-panel>
        <ix-collapse-panel name="name3" :icon=icon> name3 </ix-collapse-panel>
      </ix-collapse>
      `,
      setup() {
        return { active, icon }
      },
    })

    expect(wrapper.findAll('.ix-icon')[0].classes()).toContain('ix-icon')

    icon.value = ['rotate-right', 'rotate-left']

    await nextTick()

    expect(wrapper.findAll('.ix-icon')[0].classes()).toContain('ix-icon-rotate-right')
  })
})
