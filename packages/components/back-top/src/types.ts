import type { DefineComponent } from 'vue'

export interface BackTopProps {
  target?: string | HTMLElement
  duration?: number
  visibilityHeight?: number
}

export type BackTopInstance = InstanceType<DefineComponent<BackTopProps>>
