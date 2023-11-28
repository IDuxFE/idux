// @ts-nocheck

import type { PresetTheme, ThemeKeys } from '@idux/components/theme/src/types'

import { resolve } from 'path'

import { camelCase } from 'lodash-es'

import chalk from 'chalk'
import { existsSync, readdirSync, statSync, writeFile } from 'fs-extra'
import ora from 'ora'
import { format } from 'prettier'

import { createDomEnv } from '../../vite'

async function generateThemeVariables(theme: PresetTheme) {
  const { destroy: destroyDomEnv } = createDomEnv()
  const componentsDirPath = resolve(__dirname, '../../../packages/components')
  const proComponentDirPath = resolve(__dirname, '../../../packages/pro')

  /* @vite-ignore */
  const { getThemeTokens, getPresetAlgorithms, getResetTokens } = await import('@idux/components/theme/src/themeTokens')
  /* @vite-ignore */
  const { tokenToCss } = await import('@idux/components/theme/src/utils')

  const algorithms = getPresetAlgorithms(theme)

  const globalTokens = getThemeTokens(theme)

  const compVariables: { comp: string; scope: 'components' | 'pro'; content: string }[] = []

  async function updateComponentTokenVariables(
    dirPath: string,
    scope: 'components' | 'pro',
    compName: string,
    themeKey: ThemeKeys,
  ) {
    const spin = ora()
    spin.start(`[Theme: ${theme}] generating component ${compName} variables...\n`)

    /* @vite-ignore */
    const { getThemeTokens, transforms } = await import(
      /* @vite-ignore */
      resolve(dirPath, `${compName}/theme/index.ts`)
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
        transforms,
      )

    const formattedCssContent = await format(cssContent, { parser: 'css' })

    compVariables.push({ comp: compName, scope, content: formattedCssContent })
    await writeFile(resolve(dirPath, `${compName}/theme/${theme}.css`), formattedCssContent)

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

    for (const comp of compVariables.filter(comp => comp.scope === scope).sort()) {
      cssContent += `\n` + comp.content
    }

    await writeFile(
      resolve(scope === 'components' ? componentsDirPath : proComponentDirPath, `${theme}.full.css`),
      cssContent,
    )

    spin.succeed(chalk.greenBright(`[Theme: ${theme}] ${scope} full variables generated\n`))
  }

  const getCompUpdates = (scope: 'components' | 'pro') => {
    const dirPath = scope === 'components' ? componentsDirPath : proComponentDirPath

    return readdirSync(dirPath)
      .filter(
        comp =>
          comp !== '_private' &&
          statSync(resolve(dirPath, comp)).isDirectory() &&
          existsSync(resolve(dirPath, `${comp}/theme/index.ts`)),
      )
      .map(comp =>
        updateComponentTokenVariables(dirPath, scope, comp, camelCase(scope === 'components' ? comp : 'pro-' + comp)),
      )
  }

  await Promise.all([updateGlobalTokenVariables(), ...getCompUpdates('components'), ...getCompUpdates('pro')])

  await Promise.all([updateGlobalFullVariables('components'), updateGlobalFullVariables('pro')])

  destroyDomEnv()
}

await Promise.all([generateThemeVariables('default'), generateThemeVariables('dark')])
