import { copySync, ensureDirSync, existsSync, readdirSync, readFileSync, writeFile, writeFileSync } from 'fs-extra'
import { camelCase, upperFirst } from 'lodash'
import { join } from 'path'
import { optimize, OptimizeOptions } from 'svgo'
import { buildConfig } from '../buildConfig'

const definitionTemplate = `export const {{definitionName}} = {
  name: '{{name}}',
  svgString: '{{svgString}}',
}
`
const { iconAssetsDir, iconDefinitionsDir } = buildConfig
const { iconAssetsDir: siteIconAssetsDir } = buildConfig.site
const outputDefinitionNames: string[] = []

const options: OptimizeOptions = {
  plugins: [
    { name: 'removeAttrs', params: { attrs: ['fill', 'class'] } },
    { name: 'sortAttrs' },
    { name: 'removeDimensions' },
  ],
}

export async function generateIcons(): Promise<void> {
  const iconDirname = join(iconAssetsDir)
  const iconPaths = readdirSync(iconDirname)

  iconPaths.forEach(async iconName => {
    const iconFile = join(iconAssetsDir, iconName)
    const iconFileContent = readFileSync(iconFile, 'utf8')
    output(iconFileContent, iconName)
  })

  const indexContent =
    outputDefinitionNames.map(item => `export { ${upperFirst(item)} } from './${item}'`).join('\n') + '\n'
  writeFile(join(iconDefinitionsDir, `index.ts`), indexContent, 'utf8')
}

async function output(content: string, iconName: string) {
  const { data } = optimize(content, options)
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
  // 不存在的时候才 copy
  if (!existsSync(siteIconAssetsDir)) {
    copySync(iconAssetsDir, siteIconAssetsDir)
  }
}
