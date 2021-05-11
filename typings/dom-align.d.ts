declare type DomAlignPlacement =
  | 'tl'
  | 'tc'
  | 'tr'
  | 'cl'
  | 'cc'
  | 'cr'
  | 'bl'
  | 'bc'
  | 'br'
  | 'lt'
  | 'lc'
  | 'lb'
  | 'rt'
  | 'rc'
  | 'rb'

declare interface DomAlignConfig {
  points?: [DomAlignPlacement, DomAlignPlacement]
  offset?: [number, number] // [20, 30]
  targetOffset?: [string, string] // ['30%','40%']
  overflow?: { adjustX?: boolean; adjustY?: boolean }
  useCssTransform?: boolean
}
