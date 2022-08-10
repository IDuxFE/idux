import { readFile } from 'fs/promises'
import { join } from 'path'

import { existsSync, readJSON, readJSONSync, statSync } from 'fs-extra'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { forIn, merge, omit, pick } from 'lodash'
import { Lexer, marked } from 'marked'

const filtered = ['_private', 'node_modules', 'style', 'version', 'locales', 'utils', 'config']
const pureCompName = /(?:Ix|Props|Slots)/
const langs = ['zh', 'en']

export const filterComponents = (childrenDirs: string[], targetDirname: string): string[][] =>
  childrenDirs
    .filter(child => !filtered.includes(child))
    .map(child => join(targetDirname, child))
    .filter(dir => statSync(dir).isDirectory())
    .flatMap(comp => langs.map(lang => [lang, join(comp, `docs/Api.${lang}.md`)]))
    .filter(compWithLang => existsSync(compWithLang[1]))

// const prefixRegex = /(\b(Cdk|Ix)\S*)/
// const docsRegex = /\S{0,}(Slots|Props)$/m
// const overviewRegex = /Overview|Design/im
export const parseComponentInfo = async (componentWithLang: string[]): Promise<ComponentItem[]> => {
  const result: ComponentItem[] = []
  const lang = componentWithLang[0]
  const pathSplit = componentWithLang[1].split('/')
  const topPath = `${pathSplit[pathSplit.length - 4]}/${pathSplit[pathSplit.length - 3]}/${lang}`
  const content = (await readFile(componentWithLang[1])).toString()
  const tokens = Lexer.lex(content)

  // append a EOF token
  tokens.push({
    type: 'heading',
    depth: 0,
    raw: 'EOF',
    text: '',
    tokens: [],
  })

  const newLineWrapper = (line: string) => (line && line !== '-' ? `\n >${line}` : '')

  /**
   * save calc result
   */
  const pushResult = () => {
    if (result.length) {
      const startName = result[result.length - 1].name!.trim()
      result[result.length - 1].raw = extractTokensRaw(startName, sectionName)
      result[result.length - 1].path = `${topPath}`
    }

    if (level.length > 0 || overview !== '') {
      result.push({
        name: sectionName,
        overview,
        items: level,
        lang,
      })

      level = []
    }
  }

  /**
   * parse props and slots
   *
   * @param token
   */
  const parseTable = (token: marked.Tokens.Table): ComponentElement[] | undefined => {
    const isShortHeader = token.header.length === 5

    return token.rows.map(row => {
      const data: ComponentElement = {
        name: row[0].text.slice(1, -1),
        description: '',
        default: '',
        type: row[2]?.text,
        globalConfig: '',
      }

      switch (token.header.length) {
        case 5:
        case 6:
          data.description = row[1].text + newLineWrapper(row[isShortHeader ? 4 : 5].text)
          data.globalConfig = isShortHeader ? '' : row[4].text
          data.default = row[3].text
          break
        case 4:
          data.description = row[1].text + newLineWrapper(row[3].text)
          break
      }
      return data
    })
  }

  /**
   * extract block elements
   *
   * @param startToken start token of the block
   * @param endToken end token of the block
   * @returns
   */
  const extractTokensRaw = (startToken: string, endToken: string) => {
    let start = tokens.findIndex(token => token.type === 'heading' && token.text === startToken)
    const end = tokens.findIndex(token => token.type === 'heading' && token.text === endToken)
    let raw = ''
    raw += `${tokens[start].raw.trim()}  [$(link-external)](${topPath}#${startToken}) \n\n`
    while (++start < end) {
      const cur = tokens[start]
      if (cur.type === 'heading') {
        continue
      }
      raw += cur.raw
    }
    return raw
  }

  const stack: marked.Tokens.Heading[] = []
  let level: ComponentItem[] = []

  let lastToken: marked.Tokens.Heading | null = null
  let unlock = false
  let sectionName = ''
  let overview = ''

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === 'heading') {
      while ((lastToken?.depth ?? 0) > token.depth) {
        const last = stack.pop()
        if (last) {
          lastToken = last
        } else {
          break
        }
      }
      pushResult()

      stack.push(token)

      sectionName = token.text.trim()
      unlock = true
      overview = ''
    } else if (unlock) {
      if (token.type === 'table') {
        level.push({
          overview: overview,
          items: parseTable(token),
        })
        overview = ''
      } else {
        if (token.type !== 'html') {
          overview += token.raw.trim()
        }
      }
    }
  }
  pushResult()

  return result
}

/**
 * [compName][lang][overview|attrName]
 *
 * @param components
 *
 * returns
 */
export const processAPIs = (components: ComponentItem[][]): JSONType => {
  const apis: JSONType = {}
  components
    .flatMap(item => item)
    .map(item => TypeMapper(item))
    .filter(item => item.type)
    .forEach(item => {
      makeSureObject(apis, item)
      const component = apis[item.name!][item.lang!]
      const current = component[item.type!]
      if (!component.raw) {
        component.raw = ''
      }
      if (!component.path) {
        component.path = item.path
      }
      component.raw += item.raw!

      item.items?.forEach(block => {
        block.items?.forEach(detail => {
          if (detail.name) {
            let temp = current[detail.name]
            if (!temp) {
              temp = {}
              current[detail.name!] = temp
            }
            Object.keys(detail).forEach(key => {
              if (temp[key]) {
                if (temp[key] !== detail[key]) {
                  temp[key] += `\n${block.overview}\n${detail[key]}\n`
                }
              } else {
                if (key !== 'name') {
                  temp[key] = `${detail[key]}`
                }
              }
            })
          }
        })
      })
    })
  return apis
}

export const mergeExtraAPIs = (apis: JSONType, srcFile: string): JSONType => {
  try {
    return merge(apis, readJSONSync(srcFile, { encoding: 'utf-8' }))
  } catch {
    return {}
  }
}

const makeSureObject = (object: JSONType, item: Record<string, unknown>) => {
  const name = item.name as string
  const lang = item.lang as string
  const type = item.type as string

  !object[name] && (object[name] = {})
  !object[name][lang] && (object[name][lang] = {})
  !object[name][lang][type] && (object[name][lang][type] = {})
}

const TypeMapper = (item: ComponentItem) => {
  return {
    ...item,
    name: item.name!.replace(pureCompName, ''),
    type: item.type ?? item.name?.endsWith('Props') ? 'props' : item.name?.endsWith('Slots') ? 'slots' : undefined,
  }
}
/**
 *  some pro components depend on the properties of normal components
 */
export const migrateToProAPIs = async (proApis: JSONType, distPath: string): Promise<void> => {
  const bindingsFlag = '$extends'
  const bindings = pick(proApis, bindingsFlag)[bindingsFlag]
  const components = await readJSON(distPath)

  forIn(bindings, (component: JSONType, name: string) => {
    forIn(component, (attrs: Array<string>, proName: string) => {
      for (const attrName of attrs) {
        langs
          .filter(lang => components[name][lang])
          .forEach(lang => {
            if (!proApis[proName][lang][attrName]) {
              proApis[proName][lang][attrName] = components[name][lang][attrName]
            } else {
              merge(proApis[proName][lang][attrName], components[name][lang][attrName])
            }
          })
      }
    })
  })

  // Maintaining purity
  omit(proApis, bindingsFlag)
}

type ComponentElement = {
  name?: string
  description: string
  default: string
  type: string
  globalConfig: string
}

export type ComponentItem = {
  raw?: string
  name?: string
  overview?: string
  path?: string
  items?: ComponentItem[]
  lang?: string
  type?: string
  [x: string]: unknown
}

type JSONType = Record<
  string, // name
  Record<
    string, // lang
    {
      overview?: string
      raw?: string
      path?: string
    } & Record<
      string, // type
      Record<
        string, // prop name
        Record<string, string>
      >
    >
  >
>
