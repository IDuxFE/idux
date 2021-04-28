import { InjectionKey, Ref } from 'vue'
import { LinkProps } from './types'

export interface AnchorContext {
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  activeLink: Ref<string>
  handleScrollTo: (link: string) => void
  handleLinkClick: (evt: MouseEvent, link: LinkProps) => void
}

export const anchorToken: InjectionKey<AnchorContext> = Symbol('anchorToken')
