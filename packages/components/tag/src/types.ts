import type { DefineComponent } from 'vue'

export interface TagProps {
  closable?: boolean
  icon: string
  color: string
  checked: boolean
  checkAble: boolean
  isRound: boolean
}

export type TagInstance = InstanceType<DefineComponent<TagProps>>
