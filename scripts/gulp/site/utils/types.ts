/* eslint-disable @typescript-eslint/no-explicit-any */
export type PackageName = 'cdk' | 'components' | 'pro'

export type DocsLanguage = 'zh'

export interface AstNode {
  type: string
  depth: number
  value: string
  position: Position
  children: AstNode[]
}

export interface Point {
  line: number
  column: number
  offset?: number
}

export interface Position {
  start: Point
  end: Point
  indent?: number[]
}

export interface Meta {
  readonly [key: string]: any
}

export interface DemoInfo extends Record<DocsLanguage, string> {
  meta: Meta
  rawCode: string
  highlightCode: string
  codeBox: Record<DocsLanguage, string>
}

export interface DocsInfo {
  meta: Meta
  path: string
  whenToUse: string
  api: string
}

export interface CodeBoxProps {
  title: string
  packageName: string
  componentName: string
  demoKey: string
  rawCode: string
  highlightCode: string
  docs: string
}
