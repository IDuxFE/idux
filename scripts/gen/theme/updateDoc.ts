/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */

import type { PresetTheme } from '@idux/components/theme/src/types'
import type { DeclarationReflection } from 'typedoc'

import { resolve } from 'path'

import { lowerFirst } from 'lodash-es'

import { readFile, writeFile } from 'fs-extra'
import { Application, TSConfigReader, TypeDocReader } from 'typedoc'

export interface Token {
  name: string
  type: string | undefined
  desc: string
}

export interface TokenMeta {
  basic: Token[]
  derived: Token[]
  extended: Token[]
  components: Record<string, { compPath: string; tokens: Token[] }>
}

export interface ThemeOption {
  theme: PresetTheme
  tokens: Record<string, any>
}

function getTokenList(list: DeclarationReflection[]): Token[] {
  return (list || [])
    .filter(
      item =>
        !item.comment?.blockTags.some(
          tag => tag.tag === '@internal' || tag.tag === '@private' || tag.tag === '@deprecated',
        ),
    )
    .map(item => ({
      name: item.name,
      type: item?.type?.toString(),
      desc:
        item.comment?.blockTags
          ?.find(tag => tag.tag === '@desc')
          ?.content.reduce((result, str) => result.concat(str.text), '') || '',
    }))
}

export async function getTokenMeta(): Promise<TokenMeta | undefined> {
  const app = await Application.bootstrap(
    {
      // typedoc options here
      entryPoints: [
        resolve(__dirname, '../../../packages/components/theme/src/types/themeTokens/index.ts'),
        resolve(__dirname, '../../../packages/components/*/theme/tokens.ts'),
        resolve(__dirname, '../../../packages/pro/*/theme/tokens.ts'),
      ],
      skipErrorChecking: true,
    },
    [new TSConfigReader(), new TypeDocReader()],
  )

  const project = await app.convert()

  if (project) {
    const tokenMeta: TokenMeta = {
      basic: [],
      derived: [],
      extended: [],
      components: {},
    }

    // const globalThemes = themes.map(({ theme, globalTokens }) => ({ theme, tokens: globalTokens }))

    project?.children?.forEach((file: any) => {
      // Global Token
      if (file.name === 'components/theme/src/types/themeTokens') {
        file.children?.forEach((type: any) => {
          if (type.name === 'BasicTokens') {
            tokenMeta.basic = getTokenList(type.children)
          } else if (type.name === 'DerivedTokens') {
            tokenMeta.derived = getTokenList(type.children)
          } else if (type.name === 'ExtendedTokens') {
            tokenMeta.extended = getTokenList(type.children)
          }
        })
      } else {
        const componentToken = file.children?.find((item: any) => item?.name.endsWith('ThemeTokens'))
        const component = lowerFirst(componentToken.name.replace('ThemeTokens', ''))
        const records = tokenMeta.components

        if (componentToken) {
          records[component] = {
            compPath: resolve(file.escapedName.replace('"', ''), '../../'),
            tokens: getTokenList(componentToken.children),
          }
        }
      }
    })

    return tokenMeta
  }

  return
}

function formatDoc(themes: ThemeOption[], tokens: Token[]) {
  const title = `| 名称 | 描述 | 类型 |${themes.map(({ theme }) => ' ' + theme + ' |').join('')}`

  const separator = `|---|---|---|${themes.map(() => '---' + '|').join('')}`

  const contents = tokens
    .map(
      token =>
        `| ${'`' + token.name + '`'} | ${token.desc} | ${'`' + token.type + '`'} |${themes
          .map(({ tokens }) => ' ' + '`' + tokens[token.name] + '`' + ' |')
          .join('')}`,
    )
    .join('\n')

  return title + '\n' + separator + '\n' + contents + '\n'
}

export async function updateGlobalThemeDoc(tokenMeta: TokenMeta, themes: ThemeOption[]): Promise<void> {
  const globalThemeDocPath = resolve(__dirname, '../../../packages/site/src/docs/CustomizeTheme.zh.md')
  const content = await readFile(globalThemeDocPath, 'utf8')

  await writeFile(
    globalThemeDocPath,
    content
      .replace(
        /<!-- insert basicTokens start -->([\s\S]*?)<!-- insert basicTokens end -->/,
        '<!-- insert basicTokens start -->\n' +
          formatDoc(themes, tokenMeta.basic) +
          '\n<!-- insert basicTokens end -->',
      )
      .replace(
        /<!-- insert derivedTokens start -->([\s\S]*?)<!-- insert derivedTokens end -->/,
        '<!-- insert derivedTokens start -->\n' +
          formatDoc(themes, tokenMeta.derived) +
          '\n<!-- insert derivedTokens end -->',
      )
      .replace(
        /<!-- insert extendedTokens start -->([\s\S]*?)<!-- insert extendedTokens end -->/,
        '<!-- insert extendedTokens start -->\n' +
          formatDoc(themes, tokenMeta.extended) +
          '\n<!-- insert extendedTokens end -->',
      ),
  )
}

export async function updateCompThemeDoc(tokenMeta: TokenMeta, themes: ThemeOption[], themeKey: string): Promise<void> {
  const { compPath, tokens } = tokenMeta.components[themeKey]
  const docPath = resolve(compPath, `docs/Theme.zh.md`)

  await writeFile(docPath, formatDoc(themes, tokens))
}
