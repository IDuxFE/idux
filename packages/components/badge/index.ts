import type { BadgeComponent } from './src/types'

import Badge from './src/Badge.vue'

const IxBadge = Badge as unknown as BadgeComponent

export { IxBadge }

export type { BadgeInstance, BadgePublicProps as BadgeProps } from './src/types'
