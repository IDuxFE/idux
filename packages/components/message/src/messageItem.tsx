import type { MessageType } from './types'

import { computed, defineComponent, isVNode, onMounted, onUnmounted, onUpdated } from 'vue'
import { PropTypes } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

export default defineComponent({
  name: 'IxMessageItem',
  props: {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.vNode]).def(''),
    duration: PropTypes.number,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.vNode]),
    id: PropTypes.string.isRequired,
    destroyOnHover: PropTypes.bool,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'loading'] as const).isRequired,
  },
  emits: ['destroy'],
  setup(props, { emit }) {
    const classes = computed(() => {
      const clsPrefix = 'ix-message-item'
      return [clsPrefix, `${clsPrefix}-${props.type}`]
    })

    const config = useGlobalConfig('message')

    const duration = props.duration ?? config.duration
    const destroyOnHover = props.destroyOnHover ?? config.destroyOnHover
    const autoClose = duration > 0

    let timer: number | null = null
    const startTimer = () => {
      timer = setTimeout(() => destroy(), duration)
    }
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
    const destroy = () => {
      clearTimer()
      emit('destroy', props.id)
    }

    const onMouseEnter = () => {
      if (autoClose && !destroyOnHover) {
        clearTimer()
      }
    }
    const onMouseLeave = () => {
      if (autoClose && !destroyOnHover) {
        startTimer()
      }
    }

    onMounted(() => {
      if (autoClose) {
        startTimer()
      }
    })

    onUpdated(() => {
      clearTimer()
      if (autoClose) {
        startTimer()
      }
    })

    onUnmounted(() => clearTimer())

    return { classes, onMouseEnter, onMouseLeave }
  },

  render() {
    const { classes, onMouseEnter, onMouseLeave, content, icon, type } = this
    const iconNode = isVNode(icon) ? icon : useIcon(icon as string, type!)
    const contentNode = isVNode(content) ? content : content
    return (
      <div class={classes} onMouseenter={onMouseEnter} onMouseleave={onMouseLeave}>
        <div class="ix-message-item-content">
          <div class="ix-message-item-custom-content">
            {iconNode}
            <span class="ix-message-item-custom-text">{contentNode}</span>
          </div>
        </div>
      </div>
    )
  },
})

const iconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'info-circle',
  warning: 'exclamation-circle',
  loading: 'loading',
} as const

const useIcon = (icon: string, type: MessageType) => {
  const name = icon ?? iconMap[type]
  return <IxIcon name={name} />
}
