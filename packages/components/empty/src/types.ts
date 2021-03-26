import type { DefineComponent } from 'vue'

export interface EmptyProps {
  /** 自定义描述内容 */
  description?: string
  /** 图片地址 */
  image?: string
}

export type EmptyComponent = InstanceType<DefineComponent<EmptyProps>>
