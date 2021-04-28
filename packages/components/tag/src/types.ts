import type { DefineComponent } from 'vue'

export interface TagProps {
  closable?: boolean
  icon: string
  color: string
  checked: boolean
  checkAble: boolean
  isRound: boolean
}

export type TagComponent = InstanceType<DefineComponent<TagProps>>
