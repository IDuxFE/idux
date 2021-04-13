import { copy, existsSync, readdir, readFile, writeFile } from 'fs-extra'
import { camelCase, upperFirst } from 'lodash'
import { join } from 'path'
import { optimize, OptimizeOptions } from 'svgo'
import { gulpConfig } from '../gulpConfig'

const definitionTemplate = `export const {{definitionName}} = {
  name: '{{name}}',
  svgString: '{{svgString}}',
}
`
const { assetsDirname, publicDirname, definitionsFilename } = gulpConfig.icon

const options: OptimizeOptions = {
  plugins: [
    { name: 'removeAttrs', params: { attrs: ['fill', 'class'] } },
    { name: 'sortAttrs' },
    { name: 'removeDimensions' },
  ],
}

export async function generateIcons(): Promise<void> {
  const iconPaths = await readdir(assetsDirname)
  const definitionPromises = iconPaths.map(async iconName => {
    const iconContent = await readFile(join(assetsDirname, iconName), 'utf8')
    const { data } = optimize(iconContent, options)

    await writeFile(join(assetsDirname, iconName), data, 'utf8')

    return getDefinition(iconName, data)
  })

  const definitions = await Promise.all(definitionPromises)

  await writeFile(definitionsFilename, definitions.join('\n'), 'utf8')
}

function getDefinition(iconName: string, data: string) {
  const _iconName = `${iconName.replace('.svg', '')}`
  const camelCaseName = camelCase(_iconName)
  const definitionName = upperFirst(camelCaseName)
  return definitionTemplate
    .replace('{{definitionName}}', definitionName)
    .replace('{{name}}', _iconName)
    .replace('{{svgString}}', data)
}

export async function copyToSite(): Promise<void> {
  // 不存在的时候才 copy
  if (!existsSync(publicDirname)) {
    await copy(assetsDirname, publicDirname)
  }
}
