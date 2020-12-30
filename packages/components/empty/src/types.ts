import { CSSProperties } from 'vue'

export interface EmptyProps {
  // 自定义描述内容
  readonly description?: string
  // 图片样式
  readonly imageStyle?: CSSProperties
  // 图片地址
  readonly image?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IxEmptyComponent extends EmptyProps {}
