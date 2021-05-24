import type { App } from 'vue'
import IxAnchor from './src/Anchor.vue'
import IxAnchorLink from './src/AnchorLink.vue'

IxAnchor.install = (app: App): void => {
  app.component(IxAnchor.name, IxAnchor)
}
IxAnchorLink.install = (app: App): void => {
  app.component(IxAnchorLink.name, IxAnchorLink)
}
export { IxAnchor, IxAnchorLink }
export type { AnchorInstance, AnchorProps, AnchorLinkInstance, AnchorLinkProps } from './src/types'
