export function nonBindAble(content: string): string {
  return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;')
}

export function withoutSuffix(name: string): string {
  return name.split('.')[0]
}
