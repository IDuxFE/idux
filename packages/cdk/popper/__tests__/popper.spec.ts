import { MountingOptions, flushPromises, mount } from '@vue/test-utils'
import { PropType, Ref, UnwrapRef, defineComponent, onBeforeUnmount, onMounted, toRefs } from 'vue'

import { wait } from '@tests'

import { ExtractPublicPropTypes } from '@idux/cdk/utils'

import { PopperOptions } from '../src/types'
import { usePopper } from '../src/usePopper'

const popperProps = {
  allowEnter: { type: Boolean, default: undefined },
  autoAdjust: { type: Boolean, default: undefined },
  delay: { type: [Number, Array] as PropType<number | [number | null, number | null]>, default: undefined },
  disabled: { type: Boolean, default: undefined },
  offset: { type: Array as PropType<number[]>, default: undefined },
  placement: { type: String as PropType<UnwrapRef<PopperOptions['placement']>>, default: undefined },
  trigger: { type: String as PropType<UnwrapRef<PopperOptions['trigger']>>, default: undefined },
  visible: { type: Boolean, default: undefined },
  strategy: { type: String as PropType<UnwrapRef<PopperOptions['strategy']>>, default: undefined },
  onVisibleChange: { type: Function as PropType<(visible: boolean) => void>, default: undefined },
} as const

type PopperProps = ExtractPublicPropTypes<typeof popperProps>

const PopperComponent = defineComponent({
  props: popperProps,
  setup(props) {
    const { allowEnter, autoAdjust, delay, disabled, offset, placement, trigger, visible, strategy } = toRefs(props)
    const instance = usePopper({
      allowEnter,
      autoAdjust,
      delay,
      disabled,
      offset: offset as Ref<[number, number] | undefined>,
      placement,
      trigger,
      visible,
      strategy,
      onVisibleChange: props.onVisibleChange,
    })
    onMounted(() => instance.initialize())
    onBeforeUnmount(() => instance.destroy())
    return instance
  },
  template: `
  <div id="trigger" ref="triggerRef" v-bind="triggerEvents">Trigger</div>
  <div v-if="visibility" id="overlay" ref="popperRef" v-bind="popperEvents">Popper</div>
`,
})

describe('usePopper', () => {
  const PopperTestMount = (options?: MountingOptions<Partial<PopperProps>>) => mount(PopperComponent, { ...options })

  describe('options', () => {
    test('allowEnter work', async () => {
      const wrapper = PopperTestMount({ props: { allowEnter: true, delay: 50 } })
      await flushPromises()
      await wrapper.find('#trigger').trigger('mouseenter')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#trigger').trigger('mouseleave')
      await wrapper.find('#overlay').trigger('mouseenter')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#overlay').trigger('mouseleave')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(false)

      // false
      await wrapper.setProps({ allowEnter: false })
      await flushPromises()
      await wrapper.find('#trigger').trigger('mouseenter')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#trigger').trigger('mouseleave')
      await wrapper.find('#overlay').trigger('mouseenter')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(false)
    })

    test('autoAdjust work', async () => {
      const wrapper = PopperTestMount({ props: { autoAdjust: true } })
      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()

      await wrapper.setProps({ autoAdjust: false })
      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('disabled work', async () => {
      const wrapper = PopperTestMount({ props: { disabled: true, visible: true } })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(false)

      await wrapper.setProps({ disabled: false })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(true)
    })

    test('offset work', async () => {
      const wrapper = PopperTestMount({ props: { offset: [4, 4], visible: true } })
      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()

      await wrapper.setProps({ offset: [8, 8] })

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('placement work', async () => {
      const wrapper = PopperTestMount({ props: { visible: true } })
      const placements = [
        'topStart',
        'top',
        'topEnd',
        'rightStart',
        'right',
        'rightEnd',
        'bottomStart',
        'bottom',
        'bottomEnd',
        'leftStart',
        'left',
        'leftEnd',
      ] as const

      for (const placement of placements) {
        await wrapper.setProps({ placement })
        await flushPromises()
        expect(wrapper.html()).toMatchSnapshot()
      }
    })

    test('trigger', async () => {
      const onVisibleChange = vi.fn()
      const wrapper = PopperTestMount({ props: { onVisibleChange } })

      // hover

      await flushPromises()
      await wrapper.find('#trigger').trigger('mouseenter')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      expect(onVisibleChange).toBeCalledWith(true)
      await wrapper.find('#trigger').trigger('mouseleave')
      expect(wrapper.find('#overlay').exists()).toBe(false)
      expect(onVisibleChange).toBeCalledWith(false)

      // focus
      await wrapper.setProps({ trigger: 'focus' })

      await flushPromises()
      await wrapper.find('#trigger').trigger('focus')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      expect(onVisibleChange).toBeCalledWith(true)
      await wrapper.find('#trigger').trigger('blur')
      expect(wrapper.find('#overlay').exists()).toBe(false)
      expect(onVisibleChange).toBeCalledWith(false)

      // click
      await wrapper.setProps({ trigger: 'click' })

      await flushPromises()
      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      expect(onVisibleChange).toBeCalledWith(true)
      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(false)
      expect(onVisibleChange).toBeCalledWith(false)

      // contextmenu
      await wrapper.setProps({ trigger: 'contextmenu' })

      await flushPromises()
      await wrapper.find('#trigger').trigger('contextmenu')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      expect(onVisibleChange).toBeCalledWith(true)
      await wrapper.find('#trigger').trigger('contextmenu')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(false)
      expect(onVisibleChange).toBeCalledWith(false)

      await wrapper.setProps({ trigger: 'manual' })
      await flushPromises()

      expect(Object.keys(wrapper.vm.triggerEvents).length).toEqual(0)
      expect(Object.keys(wrapper.vm.popperEvents).length).toEqual(0)
    })

    test('visible work', async () => {
      const onVisibleChange = vi.fn()
      const wrapper = PopperTestMount({ props: { visible: true, trigger: 'click', onVisibleChange } })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      expect(onVisibleChange).toBeCalledWith(false)

      await wrapper.setProps({ visible: false })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(false)

      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(false)
      expect(onVisibleChange).toBeCalledWith(true)
    })

    test('delay work', async () => {
      const wrapper = PopperTestMount({ props: { delay: 50 } })
      await flushPromises()

      await wrapper.find('#trigger').trigger('mouseenter')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#trigger').trigger('mouseleave')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(false)

      await wrapper.setProps({ delay: [100, 120] })
      await flushPromises()
      await wrapper.find('#trigger').trigger('mouseenter')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(false)

      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#trigger').trigger('mouseleave')
      await wait(50)

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wait(50)
      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wait(20)
      expect(wrapper.find('#overlay').exists()).toBe(false)
    })
  })

  // TODO
  describe.todo('instance', () => {})
})
