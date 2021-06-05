import type { InjectionKey, Ref } from 'vue'
import type { AnchorLinkProps } from './types'

export interface AnchorContext {
  activeLink: Ref<string | undefined>
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  handleLinkClick: (evt: MouseEvent, link: AnchorLinkProps) => void
}

export const anchorToken: InjectionKey<AnchorContext> = Symbol('anchorToken')
