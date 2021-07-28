import { onBeforeUnmount, onMounted } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { wait } from '@tests'
import { usePopper } from '../src/usePopper'
import { PopperOptions } from '../src/types'

describe('usePopper', () => {
  const PopperTestMount = (options?: PopperOptions) =>
    mount({
      setup() {
        const instance = usePopper(options)
        onMounted(() => instance.initialize())
        onBeforeUnmount(() => instance.destroy())
        return instance
      },
      template: `
      <div id="trigger" ref="triggerRef" v-bind="triggerEvents">Trigger</div>
      <div v-if="visibility" id="overlay" ref="popperRef" v-bind="popperEvents">Popper</div>
    `,
    })

  describe('options', () => {
    test('allowEnter work', async () => {
      const wrapper = PopperTestMount({ allowEnter: true, hideDelay: 100 })
      await flushPromises()
      await wrapper.find('#trigger').trigger('mouseenter')

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#trigger').trigger('mouseleave')
      await wrapper.find('#overlay').trigger('mouseenter')
      await wait(100)

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#overlay').trigger('mouseleave')
      await wait(100)

      expect(wrapper.find('#overlay').exists()).toBe(false)

      // false
      wrapper.vm.update({ allowEnter: false })
      await flushPromises()
      await wrapper.find('#trigger').trigger('mouseenter')

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wrapper.find('#trigger').trigger('mouseleave')
      await wrapper.find('#overlay').trigger('mouseenter')
      await wait(100)

      expect(wrapper.find('#overlay').exists()).toBe(false)
    })

    test('autoAdjust work', async () => {
      const wrapper = PopperTestMount({ autoAdjust: true })
      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()

      wrapper.vm.update({ autoAdjust: false })
      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('disabled work', async () => {
      const wrapper = PopperTestMount({ disabled: true, visible: true })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(false)

      wrapper.vm.update({ disabled: false })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(true)
    })

    test('offset work', async () => {
      const wrapper = PopperTestMount({ offset: [4, 4], visible: true })
      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()

      wrapper.vm.update({ offset: [8, 8] })

      await flushPromises()

      expect(wrapper.html()).toMatchSnapshot()
    })

    test('placement work', async () => {
      const wrapper = PopperTestMount({ visible: true })
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

      await Promise.all(
        placements.map(async placement => {
          wrapper.vm.update({ placement })

          await flushPromises()

          expect(wrapper.html()).toMatchSnapshot()
        }),
      )
    })

    test('trigger', async () => {
      const wrapper = PopperTestMount()

      // hover

      await flushPromises()
      await wrapper.find('#trigger').trigger('mouseenter')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      await wrapper.find('#trigger').trigger('mouseleave')
      expect(wrapper.find('#overlay').exists()).toBe(false)

      // focus
      wrapper.vm.update({ trigger: 'focus' })

      await flushPromises()
      await wrapper.find('#trigger').trigger('focus')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      await wrapper.find('#trigger').trigger('blur')
      expect(wrapper.find('#overlay').exists()).toBe(false)

      // click
      wrapper.vm.update({ trigger: 'click' })

      await flushPromises()
      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(false)

      // contextmenu
      wrapper.vm.update({ trigger: 'contextmenu' })

      await flushPromises()
      await wrapper.find('#trigger').trigger('contextmenu')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      await wrapper.find('#trigger').trigger('contextmenu')
      expect(wrapper.find('#overlay').exists()).toBe(true)
      await wrapper.find('#trigger').trigger('click')
      expect(wrapper.find('#overlay').exists()).toBe(false)

      wrapper.vm.update({ trigger: 'manual' })
      await flushPromises()

      expect(Object.keys(wrapper.vm.triggerEvents).length).toEqual(0)
      expect(Object.keys(wrapper.vm.popperEvents).length).toEqual(0)
    })

    test('visible work', async () => {
      const wrapper = PopperTestMount({ visible: true })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(true)

      wrapper.vm.update({ visible: false })
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(false)
    })

    test('hideDelay work', async () => {
      const wrapper = PopperTestMount({ visible: true, hideDelay: 100 })
      await wrapper.find('#trigger').trigger('mouseleave')
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(true)

      await wait(100)

      expect(wrapper.find('#overlay').exists()).toBe(false)
    })

    test('showDelay work', async () => {
      const wrapper = PopperTestMount({ trigger: 'hover', showDelay: 100 })
      await wrapper.find('#trigger').trigger('mouseenter')
      await flushPromises()

      expect(wrapper.find('#overlay').exists()).toBe(false)

      await wait(100)

      expect(wrapper.find('#overlay').exists()).toBe(true)
    })
  })

  // TODO
  describe('instance', () => {})
})
