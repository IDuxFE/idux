import type { DefineComponent } from 'vue'

export interface BadgeProps {
  /** Badge显示的数字 */
  count: number | string
  /** 最大显示的数字 */
  overflowCount?: number | string
  /** 是否显示 0 */
  showZero?: boolean
  /** 是否以点的形式显示，优先级大于以上属性 */
  dot?: boolean
  color?: string
}

export type BadgeComponent = InstanceType<DefineComponent<BadgeProps>>
