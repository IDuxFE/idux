import { CSSProperties, VNodeTypes } from 'vue'

export interface EmptyProps {
  readonly description?: string | VNodeTypes
  readonly imageStyle?: CSSProperties
  readonly image?: string | VNodeTypes
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IxEmptyComponent extends EmptyProps {}
