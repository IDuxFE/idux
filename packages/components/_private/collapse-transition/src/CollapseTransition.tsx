import { defineComponent, Transition } from 'vue'
import { collapseTransitionProps } from './types'

export default defineComponent({
  props: collapseTransitionProps,
  setup(props, { slots }) {
    const onBeforeEnter = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `0px`
      el.style.opacity = '0'
    }
    const onEnter = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `${mode === 'width' ? el.scrollWidth : el.scrollHeight}px`
      el.style.opacity = '1'
    }
    const onAfterEnter = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = ''
      el.style.opacity = ''
    }
    const onBeforeLeave = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `${mode === 'width' ? el.offsetWidth : el.offsetHeight}px`
    }
    const onLeave = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = `0px`
      el.style.opacity = '0'
    }
    const onAfterLeave = (el: HTMLElement) => {
      const mode = props.mode
      el.style[mode] = ''
      el.style.opacity = ''
    }

    return () => (
      <Transition
        appear
        name={props.name}
        onBeforeEnter={onBeforeEnter}
        onEnter={onEnter}
        onAfterEnter={onAfterEnter}
        onBeforeLeave={onBeforeLeave}
        onLeave={onLeave}
        onAfterLeave={onAfterLeave}
      >
        {slots.default!()}
      </Transition>
    )
  },
})
