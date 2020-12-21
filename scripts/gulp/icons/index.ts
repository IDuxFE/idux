import { copySync, ensureDirSync, readdirSync, readFileSync, removeSync, writeFileSync } from 'fs-extra'
import { camelCase, upperFirst } from 'lodash'
import { join } from 'path'
import SVGO from 'svgo'
import { buildConfig } from '../buildConfig'

const definitionTemplate = `export const {{definitionName}} = {
  name: '{{name}}',
  svgString: '{{svgString}}',
}
`
const { iconAssetsDir, iconDefinitionsDir, siteIconAssetsDir } = buildConfig

const outputDefinitionNames: string[] = []

const options: SVGO.Options = {
  plugins: [{ removeAttrs: { attrs: ['fill', 'class'] } }, { sortAttrs: true }, { removeDimensions: true }],
}

const svgo = new SVGO(options)

export async function generateIcons(): Promise<void> {
  const iconDirname = join(iconAssetsDir)
  const iconPaths = readdirSync(iconDirname)

  const outputIcons = iconPaths.map(async iconName => {
    const iconFile = join(iconAssetsDir, iconName)
    const iconFileContent = readFileSync(iconFile, 'utf8')
    await output(iconFileContent, iconName)
  })
  await Promise.all(outputIcons)

  const indexContent = outputDefinitionNames.map(item => `export * from './${item}'`).join('\n') + '\n'
  writeFileSync(join(iconDefinitionsDir, `index.ts`), indexContent, 'utf8')
}

async function output(content: string, iconName: string) {
  const { data } = await svgo.optimize(content)
  outputIcons(iconName, data)
  outputDefinitions(iconName, data)
}

function outputIcons(iconName: string, data: string) {
  ensureDirSync(iconAssetsDir)
  writeFileSync(join(iconAssetsDir, iconName), data, 'utf8')
}

function outputDefinitions(iconName: string, data: string) {
  ensureDirSync(iconDefinitionsDir)
  const _iconName = `${iconName.replace('.svg', '')}`
  const camelCaseName = camelCase(_iconName)
  const definitionName = upperFirst(camelCaseName)
  const iconDefinition = definitionTemplate
    .replace('{{definitionName}}', definitionName)
    .replace('{{name}}', _iconName)
    .replace('{{svgString}}', data)
  writeFileSync(join(iconDefinitionsDir, `${camelCaseName}.ts`), iconDefinition, 'utf8')
  outputDefinitionNames.push(`${camelCaseName}`)
}

export function copyToSite(): void {
  removeSync(siteIconAssetsDir)
  copySync(iconAssetsDir, siteIconAssetsDir)
}
