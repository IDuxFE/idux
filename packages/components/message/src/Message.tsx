import { defineComponent, onUnmounted, onMounted, isVNode, h, computed } from 'vue'
import { IxIcon } from '@idux/components/icon'
import { PropTypes, isUndefined } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components'
import { MessageItemProps, MessageType, MessageId } from './types'

export default defineComponent({
  name: 'IxMessageItem',
  components: {
    IxIcon,
  },
  props: {
    duration: PropTypes.number,
    pauseOnHover: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).def(''),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).def(''),
    type: PropTypes.oneOf(['success', 'error', 'info', 'warn'] as const),
    messageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClose: PropTypes.func
  },
  setup(props: MessageItemProps) {
    // init
    const classes = useClasses(props)
    const messageConfig = useGlobalConfig('message')
    const { startCloseTimer, clearCloseTimer, destroy } = usePauseOnHover({
      duration: props.duration ?? messageConfig.duration,
      pauseOnHover: props.pauseOnHover ?? messageConfig.pauseOnHover,
      onClose: props.onClose,
      messageId: props.messageId
    })
    onMounted(() => {
      startCloseTimer()
    })
    onUnmounted(() => {
      destroy()
    })

    return {
      classes,
      startCloseTimer,
      clearCloseTimer,
    }
  },
  render() {
    const content = isVNode(this.content) ? h(this.content) : this.content
    const icon = isVNode(this.icon) ? h(this.icon) : getIcon(this.icon as string, this.type)

    return (
      <div class={this.classes} onMouseenter={this.clearCloseTimer} onMouseleave={this.startCloseTimer}>
        <div class="ix-message-item-content">
          <div class="ix-message-item-custom-content">
            {icon}
            <span class="ix-message-item-custom-text">{content}</span>
          </div>
        </div>
      </div>
    )
  },
})
function useClasses(props: MessageItemProps) {
  return computed(() => {
    const type = props.type
    const baseCls= 'ix-message-item'

    return [baseCls, `${baseCls}-${type}`]
  })
}
function getIcon(icon: string, type: MessageType | string | undefined) {
  if (isUndefined(type) || type === '') {
    return ''
  }
  const ICON_MAP = {
    success: 'check-circle',
    error: 'close-circle',
    info: 'info-circle',
    warn: 'exclamation-circle',
  }
  const mapIconName: string = icon || ICON_MAP[type as MessageType]

  return <ix-icon name={mapIconName} />
}
function usePauseOnHover(options: { duration: number; pauseOnHover: boolean, onClose: (id: MessageId) => void, messageId: MessageId }) {
  let timer: number | undefined | null
  const { duration, pauseOnHover, messageId, onClose } = options
  const startCloseTimer = () => {
    timer = window.setTimeout(() => {
      close()
    }, duration)
  }
  const clearCloseTimer = () => {
    if (pauseOnHover && timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  const close = () => {
    clearCloseTimer()
    onClose(messageId)
  }
  const destroy = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
      onClose(messageId)
    }
  }
  return {
    startCloseTimer,
    clearCloseTimer,
    destroy,
  }
}
