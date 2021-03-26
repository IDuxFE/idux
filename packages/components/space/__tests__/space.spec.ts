import { mount } from '@vue/test-utils'
import { computed, defineComponent, PropType } from 'vue'
import IxSpace from '../src/Space.vue'
import { IxButton } from '../../button'
import { IxDivider } from '../../divider'
import { SpaceAlign, SpaceDirection } from '../src/types'
import { isNil } from '@idux/cdk/utils'
import { renderWork } from '@tests'
import { SpaceSize } from '@idux/components/config'

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
      return hashmap[props.direction] as SpaceDirection
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
  <template v-slot:split v-if='showSplit'>
    <IxDivider :type='dividerType' />
  </template>
  </IxSpace>
`,
})

describe('Space.vue', () => {
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
    expect(wrapper.classes()).not.toContain('ix-space-wrap')

    await wrapper.setProps({ wrap: true })
    expect(wrapper.classes()).toContain('ix-space-wrap')
  })

  test('split work', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.ix-divider').exists()).toBeFalsy()
    expect(wrapper.find('.ix-space-split').exists()).toBeFalsy()

    await wrapper.setData({ showSplit: true })
    expect(wrapper.find('.ix-divider').exists()).toBeTruthy()
    expect(wrapper.find('.ix-space-split').exists()).toBeFalsy()

    await wrapper.setProps({ split: '/' })
    expect(wrapper.find('.ix-divider').exists()).toBeTruthy()
    expect(wrapper.find('.ix-space-split').exists()).toBeFalsy()

    await wrapper.setData({ showSplit: false })
    expect(wrapper.find('.ix-divider').exists()).toBeFalsy()
    expect(wrapper.find('.ix-space-split').exists()).toBeTruthy()
  })

  test('size work', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(3)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(3)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(3)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(3)

    await wrapper.setProps({ size: 20 })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)
    expect(
      wrapper.findAll('.ix-space-item').every(item => item.attributes('style') === 'margin-right: 20px;'),
    ).toBeTruthy()

    await wrapper.setProps({ split: '/' })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item').every(item => isNil(item.attributes('style')))).toBeTruthy()

    await wrapper.setProps({ split: undefined, size: ['small', 'medium'] })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(1)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(1)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)

    const size = new Map([
      [0, 20],
      [1, 10],
    ])
    await wrapper.setProps({ size: Array.from(size.values()) })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)
    expect(
      wrapper.findAll('.ix-space-item').reduce((pre, cur, index) => {
        return pre && cur.attributes('style') === `margin-right: ${size.get(index)}px;`
      }, true),
    )

    await wrapper.setProps({ split: '/' })
    expect(wrapper.findAll('.ix-space-item-small').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-medium').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item-large').length).toEqual(0)
    expect(wrapper.findAll('.ix-space-item').every(item => isNil(item.attributes('style')))).toBeTruthy()

    size.set(2, 30)
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    await wrapper.setProps({ split: undefined, size: Array.from(size.values()) })
    expect(warn).toBeCalled()
  })
})
