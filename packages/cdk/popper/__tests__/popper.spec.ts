import { defineComponent, onUnmounted, watch } from 'vue'
import { mount } from '@vue/test-utils'
import { isObject, IxPropTypes } from '@idux/cdk/utils'
import { wait } from '@tests'
import { usePopper } from '../src/usePopper'

describe('usePopper.ts', () => {
  test('init test', () => {
    const popper = usePopper()
    expect(isObject(popper)).toBeTruthy()
  })

  test('trigger', () => {
    const { triggerEvents, update, popperEvents } = usePopper()
    expect(Object.keys(triggerEvents.value).length).toEqual(0)
    expect(Object.keys(popperEvents.value).length).toEqual(2)

    update({ trigger: 'click' })
    expect('onClick' in triggerEvents.value).toBeTruthy()

    update({ trigger: 'hover' })
    expect(
      Object.keys(triggerEvents.value).includes('onMouseenter') &&
        Object.keys(triggerEvents.value).includes('onMouseleave'),
    ).toBeTruthy()

    update({ trigger: 'focus' })
    expect(
      Object.keys(triggerEvents.value).includes('onFocus') && Object.keys(triggerEvents.value).includes('onBlur'),
    ).toBeTruthy()

    update({ trigger: 'contextmenu' })
    expect('onContextmenu' in triggerEvents.value).toBeTruthy()
  })

  test('visibility', () => {
    const { visibility, update } = usePopper()
    expect(visibility.value).toBeTruthy()

    update({ visible: false })
    expect(visibility.value).toBeFalsy()

    update({ visible: true, disabled: true })
    expect(visibility.value).toBeFalsy()

    update({ visible: false, disabled: true })
    expect(visibility.value).toBeFalsy()
  })

  test('placement', () => {
    const { placement, update } = usePopper()
    expect(placement.value).toEqual('top')

    update({ placement: 'bottom' })
    expect(placement.value).toEqual('bottom')

    update({ placement: 'left' })
    expect(placement.value).toEqual('left')

    update({ placement: 'right' })
    expect(placement.value).toEqual('right')
  })

  test('toggle', async () => {
    const { visibility, show, hide } = usePopper()
    expect(visibility.value).toBeTruthy()

    hide()
    expect(visibility.value).toBeFalsy()

    show()
    expect(visibility.value).toBeTruthy()

    hide(100)
    expect(visibility.value).toBeTruthy()
    await wait(100)
    expect(visibility.value).toBeFalsy()

    show(100)
    expect(visibility.value).toBeFalsy()
    await wait(100)
    expect(visibility.value).toBeTruthy()
  })

  test('click', async () => {
    const testComponent = defineComponent({
      props: {
        trigger: IxPropTypes.oneOf(['click', 'hover', 'focus', 'contextmenu'] as const),
      },
      setup(props) {
        const { visibility, triggerRef, triggerEvents, popperRef, popperEvents, update } = usePopper({
          trigger: props.trigger,
          visible: false,
        })

        watch(
          () => props.trigger,
          () => {
            update({ trigger: props.trigger })
          },
        )

        return { visibility, triggerRef, triggerEvents, popperRef, popperEvents }
      },
      template: `
        <div id="trigger" ref="triggerRef" v-bind="triggerEvents">Trigger</div>
        <div v-if="visibility" id="overlay" ref="popoverRef" v-bind="popperEvents">Overlay</div>
      `,
    })
    const TestWrapper = mount(testComponent, { props: { trigger: 'click' } })
    expect(Object.keys(TestWrapper.find('#overlay')).length).toEqual(0)

    await TestWrapper.get('#trigger').trigger('click')
    expect(TestWrapper.get('#overlay')).toBeDefined()

    await TestWrapper.get('#overlay').trigger('mouseleave')
    expect(TestWrapper.get('#overlay')).toBeDefined()

    await TestWrapper.get('#trigger').trigger('click')
    expect(Object.keys(TestWrapper.find('#overlay')).length).toEqual(0)

    await TestWrapper.setProps({ trigger: 'hover' })
    expect(Object.keys(TestWrapper.find('#overlay')).length).toEqual(0)

    await TestWrapper.get('#trigger').trigger('mouseenter')
    expect(TestWrapper.get('#overlay')).toBeDefined()

    await TestWrapper.get('#trigger').trigger('mouseleave')
    expect(Object.keys(TestWrapper.find('#overlay')).length).toEqual(0)

    await TestWrapper.setProps({ trigger: 'focus' })
    expect(Object.keys(TestWrapper.find('#overlay')).length).toEqual(0)

    await TestWrapper.get('#trigger').trigger('focus')
    expect(TestWrapper.get('#overlay')).toBeDefined()

    await TestWrapper.get('#trigger').trigger('blur')
    expect(Object.keys(TestWrapper.find('#overlay')).length).toEqual(0)

    await TestWrapper.setProps({ trigger: 'contextmenu' })
    expect(Object.keys(TestWrapper.find('#overlay')).length).toEqual(0)

    await TestWrapper.get('#trigger').trigger('contextmenu')
    expect(TestWrapper.get('#overlay')).toBeDefined()
  })

  test('allowEnter', async () => {
    const overlay = usePopper({
      visible: false,
      trigger: 'hover',
      allowEnter: true,
      hideDelay: 500,
      showDelay: undefined,
    })
    const TestComponent = defineComponent({
      setup() {
        const { visibility, triggerRef, triggerEvents, popperRef, popperEvents, destroy } = overlay
        onUnmounted(destroy)
        return { visibility, triggerRef, triggerEvents, popperRef, popperEvents }
      },
      template: `
        <div id="trigger" ref="triggerRef" v-bind="triggerEvents">Trigger</div>
        <div v-if="visibility" id="overlay" ref="popperRef" v-bind="popperEvents">Overlay</div>
      `,
    })

    const TestWrapper = mount(TestComponent)
    await TestWrapper.get('#trigger').trigger('mouseenter')
    expect(overlay.visibility.value).toBeTruthy()

    await TestWrapper.get('#trigger').trigger('mouseleave')
    await TestWrapper.get('#overlay').trigger('mouseenter')
    expect(overlay.visibility.value).toBeTruthy()

    await wait(500)
    expect(overlay.visibility.value).toBeTruthy()

    await wait(500)
    expect(overlay.visibility.value).toBeTruthy()

    await TestWrapper.get('#overlay').trigger('mouseleave')
    expect(overlay.visibility.value).toBeTruthy()
    await wait(500)
    expect(overlay.visibility.value).toBeFalsy()

    await TestWrapper.unmount()
    expect(overlay.isInitialized).toBeFalsy()
  })
})
