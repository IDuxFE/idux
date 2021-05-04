import type { OverlayOptions, OverlayTrigger } from '@idux/cdk/overlay'

import { nextTick, onMounted, PropType, unref, watch } from 'vue'
import { mount } from '@vue/test-utils'
import { wait } from '@tests'
import { useOverlay } from '../src/useOverlay'

const defaultOverlayOptions: OverlayOptions = {
  placement: 'bottom',
  scrollStrategy: 'reposition',
  trigger: 'click',
  offset: [0, 0],
  hideDelay: 100,
  showDelay: 100,
}

describe('useOverlay.ts', () => {
  let options: OverlayOptions

  beforeEach(() => {
    options = { ...defaultOverlayOptions }
  })

  test('init work', () => {
    const instance = useOverlay(options)
    expect(instance).toBeDefined()
  })

  test('visible work', async () => {
    const TestComponent = {
      setup() {
        const { initialize, overlayRef, triggerRef, visibility, show, hide } = useOverlay(options)

        onMounted(initialize)

        const handleClick = () => {
          unref(visibility) ? hide(0) : show(0)
        }

        return { overlayRef, triggerRef, handleClick, visibility }
      },
      template: `
      <button id="trigger" ref="triggerRef">Trigger</button>
      <button id="immediate" @click="handleClick">Immediate Toggle</button>
      <div v-show="visibility" id="overlay" ref="overlayRef">Overlay</div>
      `,
    }
    const wrapper = mount(TestComponent)
    await nextTick()
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()

    await wrapper.get('#trigger').trigger('click')
    await wait(100)
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()

    await wrapper.get('#trigger').trigger('click')
    await wait(100)
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()

    await wrapper.get('#immediate').trigger('click')
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()

    await wrapper.get('#immediate').trigger('click')
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()
  })

  test('component trigger work', async () => {
    const TestComponent = {
      setup() {
        const { initialize, overlayRef, triggerRef, visibility } = useOverlay({
          ...options,
          showDelay: 0,
          hideDelay: 0,
        })

        onMounted(initialize)

        return { overlayRef, triggerRef, visibility }
      },
      template: `
      <button id="trigger" ref="triggerRef" >Trigger</button>
      <div v-show="visibility" id="overlay" ref="overlayRef">Overlay</div>
      `,
    }
    const wrapper = mount(TestComponent)
    await nextTick()
    await wrapper.get('#trigger').trigger('click')
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()

    await wrapper.get('#trigger').trigger('click')
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()
  })

  test('destroy work', async () => {
    const TestComponent = {
      setup() {
        const { initialize, overlayRef, triggerRef, destroy, visibility } = useOverlay({
          ...options,
          showDelay: 0,
          hideDelay: 0,
        })

        onMounted(initialize)

        const handleClick = () => {
          destroy()
        }

        return { overlayRef, triggerRef, handleClick, visibility }
      },
      template: `
      <button id="trigger" ref="triggerRef" >Trigger</button>
      <button id="destroy" @click="handleClick">Destroy</button>
      <div v-show="visibility" id="overlay" ref="overlayRef">Overlay</div>
      `,
    }
    const wrapper = mount(TestComponent)

    await wrapper.get('#destroy').trigger('click')

    // TODO expect
  })

  test('update work', async () => {
    const TestComponent = {
      setup() {
        const { initialize, overlayRef, triggerRef, update, visibility } = useOverlay(options)

        onMounted(initialize)

        const handleClick = () => {
          update({ showDelay: 0 })
        }

        return { overlayRef, triggerRef, handleClick, visibility }
      },
      template: `
      <button id="trigger" ref="triggerRef">Trigger</button>
      <button id="update" @click="handleClick">Update</button>
      <div v-show="visibility" id="overlay" ref="overlayRef">Overlay</div>
      `,
    }
    const wrapper = mount(TestComponent)
    await nextTick()
    await wrapper.get('#trigger').trigger('click')
    await wait(100)
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()

    await wrapper.get('#trigger').trigger('click')
    await wait(100)
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()

    await wrapper.get('#update').trigger('click')
    await wrapper.get('#trigger').trigger('click')
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()
  })

  test('trigger work', async () => {
    const TestComponent = {
      props: {
        trigger: {
          type: String as PropType<OverlayTrigger>,
          default: 'click',
        },
      },
      setup(props: { trigger: OverlayTrigger }) {
        const { initialize, overlayRef, triggerRef, update, visibility } = useOverlay({
          ...options,
          showDelay: 0,
          hideDelay: 0,
          trigger: props.trigger,
        })

        onMounted(initialize)

        watch(
          () => props.trigger,
          trigger => update({ trigger }),
        )

        return { overlayRef, triggerRef, visibility }
      },
      template: `
      <button id="trigger" ref="triggerRef">Trigger</button>
      <div v-show="visibility" id="overlay" ref="overlayRef">Overlay</div>
      `,
    }

    const wrapper = mount(TestComponent)
    await nextTick()
    await wrapper.get('#trigger').trigger('click')
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()

    await wrapper.get('#trigger').trigger('click')
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()

    await wrapper.get('#overlay').trigger('mouseleave')

    await wrapper.setProps({ trigger: 'focus' })
    await wrapper.get('#trigger').trigger('focus')
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()
    await wrapper.get('#trigger').trigger('focus')

    await wrapper.get('#trigger').trigger('blur')
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()

    await wrapper.setProps({ trigger: 'hover' })
    await wrapper.get('#trigger').trigger('mouseenter')
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()
    await wrapper.get('#trigger').trigger('mouseleave')
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()
  })

  test('hover overlay work', async () => {
    const TestComponent = {
      setup() {
        const { initialize, overlayRef, triggerRef, visibility } = useOverlay({
          ...options,
          trigger: 'hover',
          visible: true,
          allowEnter: true,
          showDelay: 0,
          hideDelay: 0,
        })

        onMounted(initialize)

        return { overlayRef, triggerRef, visibility }
      },
      template: `
      <button id="trigger" ref="triggerRef">Trigger</button>
      <div v-show="visibility" id="overlay" ref="overlayRef" >Overlay</div>
      `,
    }
    const wrapper = mount(TestComponent)
    await wrapper.get('#overlay').trigger('mouseenter')
    expect(wrapper.get('#overlay').isVisible()).toBeTruthy()

    await wrapper.get('#overlay').trigger('mouseleave')
    expect(wrapper.get('#overlay').isVisible()).toBeFalsy()
  })

  test('arrow work', async () => {
    const TestComponent = {
      setup() {
        const { initialize, overlayRef, triggerRef, arrowRef } = useOverlay({
          ...options,
          showDelay: 0,
          showArrow: true,
        })

        onMounted(initialize)

        return { overlayRef, triggerRef, arrowRef }
      },
      template: `
      <button id="trigger" ref="triggerRef">Trigger</button>
      <div id="overlay" ref="overlayRef">Overlay
        <div ref="arrowRef" id='arrow'></div>
      </div>
      `,
    }
    const wrapper = mount(TestComponent)
    await wrapper.get('#trigger').trigger('click')
    expect(wrapper.get('#arrow')).toBeDefined()
  })

  // todo global scroll
})
