export interface TitleMeta {
  title: string
  subtitle?: string
  path: string
  type?: string | null
  order?: number
  single?: boolean
  category: 'components' | 'docs' | 'pro' | 'cdk'
}

export function generateTitle(meta: TitleMeta): string {
  const href = 'https://github.com/IDuxFE/idux/edit/main/'
  return `<h1>${meta.title}<span class="subtitle">${meta.subtitle || ''}</span>
  <a
    class="edit-button"
    aria-label="Edit this page on GitHub"
    href="${href}${meta.path}"
    target="_blank"
    rel="noopener noreferrer"
  >
    <IxIcon name="edit" />
  </a>
</h1>
`
}
