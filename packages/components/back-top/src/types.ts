import type { DefineComponent } from 'vue'

interface BackTopOriginalProps {
  target?: string | HTMLElement
  duration?: number
  visibilityHeight?: number
}

export type BackTopProps = Readonly<BackTopOriginalProps>

export type BackTopComponent = InstanceType<DefineComponent<BackTopProps>>
