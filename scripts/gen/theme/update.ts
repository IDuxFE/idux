// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PresetTheme, ThemeKeys } from '@idux/components/theme/src/types'

import { resolve } from 'path'

import { kebabCase } from 'lodash-es'

import chalk from 'chalk'
import { writeFile } from 'fs-extra'
import ora from 'ora'
import { format } from 'prettier'

import { type TokenMeta, getTokenMeta, updateCompThemeDoc, updateGlobalThemeDoc } from './updateDoc'
import { createDomEnv } from '../../vite'

async function generateThemeVariables(theme: PresetTheme, tokenMeta: TokenMeta) {
  const { destroy: destroyDomEnv } = createDomEnv()
  const componentsDirPath = resolve(__dirname, '../../../packages/components')
  const proComponentDirPath = resolve(__dirname, '../../../packages/pro')

  /* @vite-ignore */
  const { getThemeTokens, getPresetAlgorithms, getResetTokens } = await import('@idux/components/theme/src/themeTokens')
  /* @vite-ignore */
  const { tokenToCss } = await import('@idux/components/theme/src/utils')

  const algorithms = getPresetAlgorithms(theme)

  const globalTokens = getThemeTokens(theme, undefined, undefined)

  const compTokens: Record<string, any> = {}
  const compVariables: { comp: string; scope: 'components' | 'pro'; content: string }[] = []

  async function updateComponentTokenVariables(themeKey: ThemeKeys, compPath: string) {
    const spin = ora()
    spin.start(`[Theme: ${theme}] generating component ${themeKey} variables...\n`)

    const compName = kebabCase(themeKey)
    const scope = /components/.test(compPath) ? 'components' : 'pro'

    /* @vite-ignore */
    const { getThemeTokens, transforms } = await import(
      /* @vite-ignore */
      resolve(compPath, `theme/index.ts`)
    )

    const tokens = getThemeTokens(globalTokens, theme, algorithms)
    const cssContent =
      `/* ------ ${compName} css variables ------ */\n` +
      tokenToCss(
        {
          key: themeKey,
          tokens,
          hashId: '',
        },
        undefined,
        transforms,
      )

    const formattedCssContent = await format(cssContent, { parser: 'css' })

    compVariables.push({ comp: compName, scope, content: formattedCssContent })
    compTokens[themeKey] = tokens
    await writeFile(resolve(compPath, `theme/${theme}.css`), formattedCssContent)

    spin.succeed(chalk.greenBright(`[Theme: ${theme}] component ${compName} variables generated\n`))
  }

  let globalVariablesContent = ''

  async function updateGlobalTokenVariables() {
    const spin = ora()
    spin.start(`[Theme: ${theme}] generating global variables...\n`)
    const cssContent =
      tokenToCss({
        key: 'global',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tokens: globalTokens as any,
        hashId: '',
      }) +
      tokenToCss({
        key: 'reset',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tokens: getResetTokens(globalTokens) as any,
        hashId: '',
      })
    const formattedCssContent = await format(cssContent, { parser: 'css' })

    globalVariablesContent = formattedCssContent
    await writeFile(resolve(componentsDirPath, `${theme}.css`), formattedCssContent)

    spin.succeed(chalk.greenBright(`[Theme: ${theme}] global variables generated\n`))
  }

  async function updateGlobalFullVariables(scope: 'components' | 'pro') {
    const spin = ora()
    spin.start(`[Theme: ${theme}] generating ${scope} full variables...\n`)

    let cssContent = scope === 'components' ? globalVariablesContent : ''

    for (const comp of compVariables
      .sort((comp1, comp2) => {
        if (comp1.comp < comp2.comp) {
          return -1
        }
        if (comp1.comp > comp2.comp) {
          return 1
        }
        return 0
      })
      .filter(comp => comp.scope === scope)
      .sort()) {
      cssContent += `\n` + comp.content
    }

    await writeFile(
      resolve(scope === 'components' ? componentsDirPath : proComponentDirPath, `${theme}.full.css`),
      cssContent,
    )

    spin.succeed(chalk.greenBright(`[Theme: ${theme}] ${scope} full variables generated\n`))
  }

  const getCompUpdates = () => {
    // const dirPath = scope === 'components' ? componentsDirPath : proComponentDirPath

    // return readdirSync(dirPath)
    //   .filter(
    //     comp =>
    //       comp !== '_private' &&
    //       statSync(resolve(dirPath, comp)).isDirectory() &&
    //       existsSync(resolve(dirPath, `${comp}/theme/index.ts`)),
    //   )
    //   .map(comp =>
    //     updateComponentTokenVariables(dirPath, scope, comp, camelCase(scope === 'components' ? comp : 'pro-' + comp)),
    //   )

    return Object.entries(tokenMeta?.components ?? {}).map(([themeKey, { compPath }]) =>
      updateComponentTokenVariables(themeKey, compPath),
    )
  }

  await Promise.all([updateGlobalTokenVariables(), ...getCompUpdates()])

  await Promise.all([updateGlobalFullVariables('components'), updateGlobalFullVariables('pro')])

  destroyDomEnv()

  return [globalTokens, compTokens] as const
}

const tokenMeta = (await getTokenMeta())!

const [[defaultGlobalTokens, defaultCompTokens], [darkGlobalTokens, darkCompTokens]] = await Promise.all([
  generateThemeVariables('default', tokenMeta),
  generateThemeVariables('dark', tokenMeta),
])

await Promise.all([
  updateGlobalThemeDoc(tokenMeta, [
    {
      theme: 'default',
      tokens: defaultGlobalTokens,
    },
    {
      theme: 'dark',
      tokens: darkGlobalTokens,
    },
  ]),
  Object.keys(tokenMeta?.components ?? {}).map(themeKey => {
    return updateCompThemeDoc(
      tokenMeta,
      [
        {
          theme: 'default',
          tokens: defaultCompTokens[themeKey],
        },
        {
          theme: 'dark',
          tokens: darkCompTokens[themeKey],
        },
      ],
      themeKey,
    )
  }),
])
