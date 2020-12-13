import { camelCase, upperFirst } from 'lodash'

export function upperFirstCamelCase(name: string): string {
  return upperFirst(camelCase(name))
}

export function camelCaseUpperFirst(name: string): string {
  return camelCase(upperFirst(name))
}

export function nonBindAble(content: string): string {
  return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;')
}

export function withoutSuffix(name: string): string {
  return name.split('.')[0]
}
