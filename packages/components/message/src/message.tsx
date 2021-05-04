import type { App, ComponentPublicInstance } from 'vue'
import type { MessageItemInstance, MessageOptions, MessageType } from './types'
import type { UseMessage } from './useMessage'

import { computed, createApp, h, TransitionGroup, VNode } from 'vue'
import { useContainer } from '@idux/cdk/portal'
import { toCssPixel } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { useMessage } from './useMessage'
import IxMessageItem from './messageItem'

let instance: ComponentPublicInstance<{}, UseMessage>

const install = (_: App): void => {
  if (!instance) {
    const container = useContainer('ix-message-container')
    instance = createApp({
      setup() {
        // TODO fix
        const config = useGlobalConfig('message')
        const maxCount = computed(() => config.maxCount)
        const style = computed(() => ({ top: toCssPixel(config.top) }))
        const { messages, add, destroy } = useMessage(maxCount)
        return { messages, add, destroy, style }
      },
      render() {
        const messages = this.messages.map((message: MessageOptions) => {
          return <IxMessageItem key={message.id} {...message} onDestroy={this.destroy} />
        })

        return (
          <TransitionGroup tag="div" name="move-up" class="ix-message" style={this.style}>
            {messages}
          </TransitionGroup>
        )
      },
    }).mount(container) as ComponentPublicInstance<{}, UseMessage>
  }
}

const open = (option: MessageOptions & { content: string | VNode; type: MessageType }): MessageItemInstance => {
  const id = instance.add(option)
  return { id, destroy: () => instance.destroy(id) }
}

const destroy = (id?: string | string[]) => instance.destroy(id)

const messageTypes: MessageType[] = ['info', 'success', 'warning', 'error', 'loading']
const [info, success, warning, error, loading] = messageTypes.map(type => {
  return (content: string | VNode, options?: MessageOptions) => open({ ...options, content, type })
})

export default { install, open, destroy, info, success, warning, error, loading }
