export function nonBindAble(content: string): string {
  return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;')
}

export function withoutSuffix(name: string): string {
  return name.split('.')[0]
}

export interface TitleMeta {
  title: string
  subtitle?: string
  type?: string | null
  order?: number
  single?: boolean
  category: 'components' | 'docs' | 'pro' | 'cdk'
}

export function generateTitle(meta: TitleMeta): string {
  return `<h1>${meta.title}<span class="subtitle">${meta.subtitle || ''}</span></h1>`
}
