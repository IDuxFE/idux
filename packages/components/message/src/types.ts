import type { VNode } from 'vue'

export interface MessageOptions {
  destroyOnHover?: boolean
  duration?: number
  icon?: string | VNode
  id?: string
  onDestroy?: (id: string) => void
}

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading'

export type MessageItemInstance = {
  id: string
  destroy: () => void
}
