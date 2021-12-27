import { marked } from 'marked'
import { parseFragment, serialize } from 'parse5'
import { highlight, languages } from 'prismjs'
import loadLanguages from 'prismjs/components/'

loadLanguages(['ts', 'typescript', 'bash', 'vim', 'diff'])

const renderer = new marked.Renderer()

const oldLinkHandler = renderer.link
renderer.link = function (href: string, title: string, text: string) {
  const str = oldLinkHandler.call(this, href, title, text)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linkFragment: any = parseFragment(str)

  if (linkFragment && linkFragment.childNodes[0] && linkFragment.childNodes[0].nodeName === 'a') {
    if (!/^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/.test(href)) {
      // Open absolute path in new window
      linkFragment.childNodes[0].attrs.push({
        name: 'target',
        value: '_blank',
      })
      linkFragment.childNodes[0].attrs.push({
        name: 'rel',
        value: 'noopener',
      })
    }
    return serialize(linkFragment)
  }

  return str
}

renderer.heading = function (text, level) {
  const head = `<h${level} id="${text}"><span>${text}</span>`
  const link = `<a onclick="window.location.hash = '${text}'" class="anchor">#</a></h${level}>`
  return head + link
}

renderer.code = function (code: string, infoString: string, escaped: boolean) {
  const lang = (infoString || '').match(/\S*/)![0]
  if (this.options.highlight) {
    const out = this.options.highlight(code, lang || '')
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  if (!lang) {
    return '<pre><code>' + (escaped ? code : escape(code)) + '</code></pre>'
  }

  return (
    '<pre class="' +
    this.options.langPrefix +
    escape(lang) +
    '">' +
    '<code>' +
    (escaped ? code : escape(code)) +
    '</code></pre>\n'
  )
}

marked.setOptions({
  highlight: function (code, lang) {
    const language = languages[lang]
    return highlight(code, language, lang)
  },
  renderer: renderer,
})

export default marked
