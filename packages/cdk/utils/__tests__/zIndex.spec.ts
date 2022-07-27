import { mount } from '@vue/test-utils'
import { computed, defineComponent, ref, toRef } from 'vue'

import { useZIndex } from '../src/zIndex'

describe('zIndex.ts', () => {
  const TestComp = defineComponent({
    props: {
      visible: { type: Boolean, required: true },
      zIndex: { type: Number, default: undefined },
    },
    setup(props) {
      const visible = toRef(props, 'visible')
      const { currentZIndex } = useZIndex(toRef(props, 'zIndex'), ref(3000), visible)
      const style = computed(() => ({ zIndex: currentZIndex.value }))

      return {
        style,
      }
    },
    template: `
      <div utid="test-el" :style="style"></div>
    `,
  })

  test('custdom zIndex work', async () => {
    const wrapper = mount(TestComp, {
      props: {
        visible: false,
        zIndex: 2022,
      },
    })

    expect(wrapper.find('[utid="test-el"]').attributes('style')).toContain('z-index: 2022')

    await wrapper.setProps({ visible: true })
    expect(wrapper.find('[utid="test-el"]').attributes('style')).toContain('z-index: 2022')
  })

  test('increment zIndex work', async () => {
    const wrapper = mount(TestComp, {
      props: {
        visible: false,
      },
    })

    expect(wrapper.find('[utid="test-el"]').attributes('style')).toContain('z-index: 3000')

    await wrapper.setProps({ visible: true })
    expect(wrapper.find('[utid="test-el"]').attributes('style')).toContain('z-index: 3000')

    const wrapper2 = mount(TestComp, {
      props: {
        visible: false,
      },
    })
    await wrapper2.setProps({ visible: true })
    expect(wrapper2.find('[utid="test-el"]').attributes('style')).toContain('z-index: 3001')

    const wrapper3 = mount(TestComp, {
      props: {
        visible: true,
      },
    })
    expect(wrapper3.find('[utid="test-el"]').attributes('style')).toContain('z-index: 3002')

    expect(wrapper.find('[utid="test-el"]').attributes('style')).toContain('z-index: 3000')
    await wrapper.setProps({ visible: false })
    await wrapper.setProps({ visible: true })
    expect(wrapper.find('[utid="test-el"]').attributes('style')).toContain('z-index: 3003')
  })
})
