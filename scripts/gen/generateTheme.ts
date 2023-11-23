import { resolve } from 'path'

import { existsSync, mkdir, readFile, writeFile } from 'fs-extra'
import { camelCase, kebabCase, upperFirst } from 'lodash'
import { format } from 'prettier'

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { getNewThemesDefaultTemplate, getNewThemesIndexTemplate, getNewThemesTokensTemplate } from './template'

// @ts-ignore
async function generateTheme(compName: string) {
  const compDirPath = resolve(__dirname, `../../packages/components/${kebabCase(compName)}`)
  const themeDirPath = resolve(compDirPath, 'theme')

  if (existsSync(themeDirPath)) {
    return
  }

  await mkdir(themeDirPath)

  const tasks = [
    writeFile(resolve(themeDirPath, 'tokens.ts'), getNewThemesTokensTemplate(compName)),
    writeFile(resolve(themeDirPath, 'default.ts'), getNewThemesDefaultTemplate('components', compName)),
    writeFile(resolve(themeDirPath, 'index.ts'), getNewThemesIndexTemplate('components', compName)),
    appendThemeExport(compName),
    appendThemeImport(compName),
  ]

  await Promise.all(tasks)
}

async function appendThemeExport(compName: string) {
  const indexPath = resolve(__dirname, `../../packages/components/${kebabCase(compName)}`, 'index.ts')

  const indexContent = await readFile(indexPath, 'utf8')

  await writeFile(
    indexPath,
    indexContent +
      `
export type { ${upperFirst(camelCase(compName))}ThemeTokens } from './theme'
`,
  )
}

async function appendThemeImport(compName: string) {
  const componentThemesDirPath = resolve(__dirname, `../../packages/components/theme`)
  const componentTokenTypesPath = resolve(componentThemesDirPath, './src/types/themeTokens/componentTokens.ts')

  const typesContent = await readFile(componentTokenTypesPath, 'utf8')

  const insertIndex = typesContent.indexOf(`export type ComponentThemeTokens = {`) - 1

  const importAppendedContent =
    typesContent.slice(0, insertIndex) +
    `import type { ${upperFirst(camelCase(compName))}ThemeTokens } from '@idux/components/${kebabCase(compName)}'\n` +
    typesContent.slice(insertIndex)

  const exportAppendedContent = importAppendedContent.replace(
    /export type ComponentThemeTokens = \{([\s\S]*?)\}/,
    (_, content) => {
      const lines = [
        ...content.split('\n').filter(Boolean),
        `${camelCase(compName)}: ${upperFirst(camelCase(compName))}ThemeTokens`,
      ]
        .map(str => str.trim())
        .sort((line1, line2) => {
          return line1.charCodeAt(0) - line2.charCodeAt(0)
        })

      return `export type ComponentThemeTokens = {
${lines.join('\n')}
}
`
    },
  )

  await writeFile(componentTokenTypesPath, await format(exportAppendedContent, { parser: 'typescript' }))
}

;(async () => {
  const compName = process.argv[2]

  if (!compName) {
    return
  }

  await generateTheme(compName)
})()
