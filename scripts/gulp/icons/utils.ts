import { join } from 'path'

import { copy, existsSync, readFile, readdir, writeFile } from 'fs-extra'
import { camelCase, upperFirst } from 'lodash'
import { OptimizeOptions, OptimizedSvg, optimize } from 'svgo'

import { gulpConfig } from '../gulpConfig'

const definitionTemplate = `export const {{definitionName}} = {
  name: '{{name}}',
  svg: '{{svg}}',
}
`

const allIconsTemplate = `export const allIcons = [
{{names}}
]
`

const { assetsDirname, publicDirname, definitionsFilename, allIconsFilename } = gulpConfig.icon

const options: OptimizeOptions = {
  plugins: [
    { name: 'cleanupAttrs' },
    { name: 'cleanupEnableBackground' },
    { name: 'cleanupIDs' },
    { name: 'cleanupNumericValues' },
    { name: 'collapseGroups' },
    { name: 'convertColors' },
    { name: 'convertPathData' },
    { name: 'convertShapeToPath' },
    { name: 'convertStyleToAttrs' },
    { name: 'convertTransform' },
    { name: 'mergePaths' },
    { name: 'moveElemsAttrsToGroup' },
    { name: 'moveGroupAttrsToElems' },
    { name: 'removeAttrs', params: { attrs: ['class', 'fill'] } },
    { name: 'removeComments' },
    { name: 'removeDesc' },
    { name: 'removeDimensions' },
    { name: 'removeDoctype' },
    { name: 'removeEditorsNSData' },
    { name: 'removeEmptyAttrs' },
    { name: 'removeEmptyContainers' },
    { name: 'removeEmptyText' },
    { name: 'removeHiddenElems' },
    { name: 'removeNonInheritableGroupAttrs' },
    { name: 'removeMetadata' },
    { name: 'removeRasterImages', active: false },
    { name: 'removeTitle' },
    { name: 'removeUnknownsAndDefaults' },
    { name: 'removeUnusedNS' },
    { name: 'removeUselessDefs' },
    { name: 'removeUselessStrokeAndFill' },
    { name: 'removeViewBox', active: false },
    { name: 'removeXMLNS' },
    { name: 'removeXMLProcInst' },
    { name: 'sortAttrs' },
    {
      name: 'adjustViewBox',
      type: 'perItem',
      fn: node => {
        if (node.name === 'svg') {
          if (node.removeAttr('viewBox', '0 0 1024 1024')) {
            node.addAttr({ name: 'viewBox', value: '64 64 896 896' })
          }
        }
      },
    },
  ],
}

export async function generateIcons(): Promise<void> {
  const iconPaths = await readdir(assetsDirname)

  const definitionPromises = iconPaths.map(async iconName => {
    const iconContent = await readFile(join(assetsDirname, iconName), 'utf8')
    const optimizeData = optimize(iconContent, options)
    if (optimizeData.error) {
      throw Error(optimizeData.error)
    }

    const { data } = optimizeData as OptimizedSvg

    await writeFile(join(assetsDirname, iconName), data, 'utf8')

    return createDefinition(iconName, data)
  })

  const definitions = await Promise.all(definitionPromises)

  await writeFile(definitionsFilename, definitions.map(item => item.definition).join('\n'), 'utf8')

  const names = allIconsTemplate.replace('{{names}}', definitions.map(item => `  '${item.name}',`).join('\n'))
  await writeFile(allIconsFilename, names, 'utf8')
}

function createDefinition(iconName: string, data: string) {
  const _iconName = `${iconName.replace('.svg', '')}`
  const camelCaseName = camelCase(_iconName)
  const definitionName = upperFirst(camelCaseName)
  return {
    name: _iconName,
    definition: definitionTemplate
      .replace('{{definitionName}}', definitionName)
      .replace('{{name}}', _iconName)
      .replace('{{svg}}', data),
  }
}

export async function copyToSite(): Promise<void> {
  // 不存在的时候才 copy
  if (!existsSync(publicDirname)) {
    await copy(assetsDirname, publicDirname)
  }
}
