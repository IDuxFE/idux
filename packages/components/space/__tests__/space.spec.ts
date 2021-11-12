import type { SpaceAlign, SpaceDirection, SpaceSize } from '../src/types'

import { mount } from '@vue/test-utils'
import { PropType, computed, defineComponent } from 'vue'

import { renderWork } from '@tests'

import { IxButton } from '@idux/components/button'
import { IxDivider } from '@idux/components/divider'

import IxSpace from '../src/Space'

const TestComponent = defineComponent({
  components: { IxSpace, IxButton, IxDivider },
  props: {
    align: { type: String as PropType<SpaceAlign>, default: undefined },
    direction: { type: String as PropType<SpaceDirection>, default: undefined },
    size: { type: [String, Number, Array] as PropType<SpaceSize>, default: undefined },
    split: { type: String, default: undefined },
    wrap: { type: Boolean, default: undefined },
  },
  setup(props) {
    const dividerType = computed(() => {
      const hashmap = {
        horizontal: 'vertical',
        vertical: 'horizontal',
      }
      return hashmap[props.direction!] as SpaceDirection
    })
    return { dividerType }
  },
  data() {
    return { showSplit: false }
  },
  template: `
  <IxSpace :align='align' :direction='direction' :size='size' :wrap='wrap' :split='split'>
  Space
  <IxButton mode='primary'>Button</IxButton>
  <IxButton>Button</IxButton>
  <template #split v-if='showSplit'>
    <IxDivider :type='dividerType' />
  </template>
  </IxSpace>
`,
})

describe('Space', () => {
  renderWork(TestComponent)

  test('align work', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.classes()).not.toContain('ix-space-start')
    expect(wrapper.classes()).not.toContain('ix-space-center')
    expect(wrapper.classes()).not.toContain('ix-space-end')
    expect(wrapper.classes()).toContain('ix-space-baseline')

    await wrapper.setProps({ align: 'start' })
    expect(wrapper.classes()).toContain('ix-space-start')
    expect(wrapper.classes()).not.toContain('ix-space-center')
    expect(wrapper.classes()).not.toContain('ix-space-end')
    expect(wrapper.classes()).not.toContain('ix-space-baseline')

    await wrapper.setProps({ align: 'center' })
    expect(wrapper.classes()).not.toContain('ix-space-start')
    expect(wrapper.classes()).toContain('ix-space-center')
    expect(wrapper.classes()).not.toContain('ix-space-end')
    expect(wrapper.classes()).not.toContain('ix-space-baseline')

    await wrapper.setProps({ align: 'end' })
    expect(wrapper.classes()).not.toContain('ix-space-start')
    expect(wrapper.classes()).not.toContain('ix-space-center')
    expect(wrapper.classes()).toContain('ix-space-end')
    expect(wrapper.classes()).not.toContain('ix-space-baseline')

    await wrapper.setProps({ align: 'baseline' })
    expect(wrapper.classes()).not.toContain('ix-space-start')
    expect(wrapper.classes()).not.toContain('ix-space-center')
    expect(wrapper.classes()).not.toContain('ix-space-end')
    expect(wrapper.classes()).toContain('ix-space-baseline')
  })

  test('direction work', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.classes()).toContain('ix-space-horizontal')
    expect(wrapper.classes()).not.toContain('ix-space-vertical')

    await wrapper.setProps({ direction: 'vertical' })
    expect(wrapper.classes()).not.toContain('ix-space-horizontal')
    expect(wrapper.classes()).toContain('ix-space-vertical')
  })

  test('wrap work', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.classes()).toContain('ix-space-wrap')

    await wrapper.setProps({ wrap: false })
    expect(wrapper.classes()).not.toContain('ix-space-wrap')

    await wrapper.setProps({ wrap: true })
    expect(wrapper.classes()).toContain('ix-space-wrap')
  })

  test('split work', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.ix-divider').exists()).toBeFalsy()
    expect(wrapper.find('.ix-space-split-sm').exists()).toBeFalsy()

    await wrapper.setData({ showSplit: true })
    expect(wrapper.find('.ix-divider').exists()).toBeTruthy()
    expect(wrapper.find('.ix-space-split-sm').exists()).toBeTruthy()

    await wrapper.setProps({ split: '/' })
    expect(wrapper.find('.ix-divider').exists()).toBeTruthy()
    expect(wrapper.find('.ix-space-split-sm').exists()).toBeTruthy()

    await wrapper.setData({ showSplit: false })
    expect(wrapper.find('.ix-divider').exists()).toBeFalsy()
    expect(wrapper.find('.ix-space-split-sm').exists()).toBeTruthy()
  })

  test('size work', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.findAll('.ix-space-item-sm').length).toEqual(2)
    expect(wrapper.findAll('.ix-space-item-md').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-lg').length).toEqual(0)

    await wrapper.setProps({ size: 'sm' })
    expect(wrapper.findAll('.ix-space-item-sm').length).toEqual(2)
    expect(wrapper.findAll('.ix-space-item-md').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-lg').length).toEqual(0)

    await wrapper.setProps({ size: 'md' })
    expect(wrapper.findAll('.ix-space-item-sm').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-md').length).toEqual(2)
    expect(wrapper.findAll('.ix-space-item-lg').length).toEqual(0)

    await wrapper.setProps({ size: 'lg' })
    expect(wrapper.findAll('.ix-space-item-sm').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-md').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-lg').length).toEqual(2)

    await wrapper.setProps({ size: 20 })
    expect(wrapper.findAll('.ix-space-item-sm').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-md').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-lg').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item')[0].attributes('style')).toEqual('margin-right: 20px;')
    expect(wrapper.findAll('.ix-space-item')[1].attributes('style')).toEqual('margin-right: 20px;')
    expect(wrapper.findAll('.ix-space-item')[2].attributes('style')).toEqual(undefined)

    await wrapper.setProps({ size: ['sm', 'md'] })
    expect(wrapper.findAll('.ix-space-item-sm').length).toEqual(1)
    expect(wrapper.findAll('.ix-space-item-md').length).toEqual(1)
    expect(wrapper.findAll('.ix-space-item-lg').length).toEqual(0)

    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    await wrapper.setProps({ size: [0, 1, 2] })
    expect(warn).toBeCalled()
  })
})
