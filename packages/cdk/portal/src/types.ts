import type { DefineComponent } from 'vue'

interface PortalOriginalProps {
  /**
   * Whether disable transporting to target place.
   */
  disabled?: boolean
  /**
   * The place that element will be send.
   * If target is a string, component will first determine whether the element exists in the body.
   * If it exists, component will transport elements to it.
   * If it doesn't exist, component will create it and save it.
   */
  target: string | HTMLElement
}

export type PortalProps = Readonly<PortalOriginalProps>
export type PortalComponent = InstanceType<DefineComponent<PortalProps>>
