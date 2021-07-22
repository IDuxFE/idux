import type { InjectionKey, Ref } from 'vue'
import type { AnchorLinkProps } from './types'

export interface AnchorContext {
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  activeLink: Ref<string | undefined>
  handleLinkClick: (evt: MouseEvent, link: AnchorLinkProps) => void
}

export const anchorToken: InjectionKey<AnchorContext> = Symbol('anchorToken')
