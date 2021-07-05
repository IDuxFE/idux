import type { MessageComponent, MessageProviderComponent } from './src/types'

import Message from './src/Message'
import MessageProvider from './src/MessageProvider'

const IxMessage = Message as unknown as MessageComponent
const IxMessageProvider = MessageProvider as unknown as MessageProviderComponent

export { IxMessage, IxMessageProvider }
export { useMessage } from './src/useMessage'

export type {
  MessageInstance,
  MessagePublicProps as MessageProps,
  MessageProviderInstance,
  MessageProviderPublicProps as MessageProviderProps,
  MessageProviderRef,
  MessageType,
  MessageOptions,
  MessageRef,
} from './src/types'
