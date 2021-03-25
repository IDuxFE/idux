interface TitleMeta {
  title: string
  subtitle?: string
  path: string
}

export function generateTitle(meta: TitleMeta): string {
  return `<h1>${meta.title}<span class="subtitle">${meta.subtitle || ''}</span>
  <a 
    class="edit-button" 
    aria-label="Edit this page on Github" 
    href="https://github.com/IduxFE/idux/edit/main/${meta.path}" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <ix-icon name="edit" />
  </a>
</h1>
`
}
