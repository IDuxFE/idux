import type { DefineComponent } from 'vue'

export interface BadgeProps {
  // Badge显示的数字
  readonly count: number | string
  // 最大显示的数字
  readonly overflowCount?: number | string
  // 是否显示0
  readonly showZero?: boolean
  // 是否以点的形式显示，优先级大于以上属性
  readonly dot?: boolean
  readonly color?: string
}

export type IxBadgeComponent = InstanceType<DefineComponent<BadgeProps>>
