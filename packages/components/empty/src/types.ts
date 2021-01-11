import type { DefineComponent } from 'vue'

interface EmptyOriginalProps {
  /** 自定义描述内容 */
  description?: string
  /** 图片地址 */
  image?: string
}

export type EmptyProps = Readonly<EmptyOriginalProps>

export type EmptyComponent = InstanceType<DefineComponent<EmptyProps>>
