import type { DefineComponent } from 'vue'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'
export type BeforeCloseFunc = (done: string) => void

interface DrawerOriginalProps {
  visible?: boolean
  title?: string
  footer?: string
  closable?: boolean
  placement?: DrawerPlacement
  width?: number | string
  height?: number | string
  offset?: number | string
  mask?: boolean
  maskClosable?: boolean
  wrapClassName?: string
  destroyOnHide?: boolean
  keyboard?: boolean
  beforeClose?: BeforeCloseFunc
}

export type DrawerProps = Readonly<DrawerOriginalProps>

export type DrawerComponent = InstanceType<DefineComponent<DrawerProps>>
