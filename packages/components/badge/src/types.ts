import type { DefineComponent } from 'vue'

interface BadgeOriginalProps {
  // Badge显示的数字
  count: number | string
  // 最大显示的数字
  overflowCount?: number | string
  // 是否显示0
  showZero?: boolean
  // 是否以点的形式显示，优先级大于以上属性
  dot?: boolean
  color?: string
}

export type BadgeProps = Readonly<BadgeOriginalProps>

export type IxBadgeComponent = InstanceType<DefineComponent<BadgeProps>>
