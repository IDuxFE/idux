import type { App } from 'vue'
import IxAnchor from './src/Anchor.vue'
import IxLink from './src/Link.vue'

IxAnchor.install = (app: App): void => {
  app.component(IxAnchor.name, IxAnchor)
}
IxLink.install = (app: App): void => {
  app.component(IxLink.name, IxLink)
}
export { IxAnchor, IxLink }
export type { AnchorComponent, AnchorProps, AnchorLinkComponent, AnchorLinksProps } from './src/types'
