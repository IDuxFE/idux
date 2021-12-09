/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MessageComponent, MessageProviderComponent } from './src/types'

import Message from './src/Message'
import MessageProvider from './src/MessageProvider'

const IxMessage = Message as unknown as MessageComponent
const IxMessageProvider = MessageProvider as unknown as MessageProviderComponent

export { IxMessage, IxMessageProvider }
export { useMessage } from './src/useMessage'

export type {
  MessageInstance,
  MessageComponent,
  MessagePublicProps as MessageProps,
  MessageProviderInstance,
  MessageProviderComponent,
  MessageProviderPublicProps as MessageProviderProps,
  MessageProviderRef,
  MessageType,
  MessageOptions,
  MessageRef,
} from './src/types'
