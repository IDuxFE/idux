import { mkdirSync, pathExistsSync, readFileSync, writeFileSync } from 'fs-extra'
import { camelCase, upperFirst } from 'lodash'
import { join } from 'path'
import { Log } from '../utils/log'
import {
  getCdkTestTemplate,
  getCdkUseTemplate,
  getDocsZhTemplate,
  getDomeTemplate,
  getIndexTemplate,
  getLessTemplate,
  getTestTemplate,
  getTypesTemplate,
  getVueTemplate,
} from './template'

const [, , compName, moduleName = 'components'] = process.argv

// TODO: support pro
const moduleNames = ['components', 'cdk']

if (!compName || !moduleNames.includes(moduleName)) {
  Log.error('Please usage: ', '`npm run gen button` or `npm run gen clipboard cdk`\n')
  process.exit(1)
}

const moduleDirname = join(__dirname, '../../packages', moduleName)
const componentDirname = join(moduleDirname, compName)

if (pathExistsSync(componentDirname)) {
  Log.error(`${compName} component already exists, please change it\n`)
  process.exit(1)
}

mkdirSync(componentDirname)
mkdirSync(`${componentDirname}/src`)
mkdirSync(`${componentDirname}/__tests__`)
mkdirSync(`${componentDirname}/docs`)
mkdirSync(`${componentDirname}/demo`)

const camelCaseComponentName = camelCase(compName)
const upperFirstComponentName = upperFirst(camelCaseComponentName)
const indexFilePath = join(moduleDirname, 'index.ts')
const componentsLessPath = join(moduleDirname, 'components.less')

if (moduleName === 'components') {
  mkdirSync(`${componentDirname}/style`)
  const lessTemplate = getLessTemplate(compName)
  writeFileSync(`${componentDirname}/style/index.less`, lessTemplate)

  const typesTemplate = getTypesTemplate(upperFirstComponentName)
  writeFileSync(`${componentDirname}/src/types.ts`, typesTemplate)

  const vueTemplate = getVueTemplate(upperFirstComponentName)
  writeFileSync(`${componentDirname}/src/${upperFirstComponentName}.vue`, vueTemplate)

  const indexTemplate = getIndexTemplate(upperFirstComponentName)
  writeFileSync(`${componentDirname}/index.ts`, indexTemplate)

  const testTemplate = getTestTemplate(upperFirstComponentName)
  writeFileSync(`${componentDirname}/__tests__/${camelCaseComponentName}.spec.ts`, testTemplate)

  // 这里都是硬编码，有没有更好的实现方式？
  let currIndexContent = readFileSync(indexFilePath, 'utf-8')
  currIndexContent = currIndexContent
    .replace('\n\n', `\nimport { Ix${upperFirstComponentName} } from './${compName}'\n\n`)
    .replace(']', `, Ix${upperFirstComponentName}]`)
  currIndexContent += `export * from './${compName}'\n`
  writeFileSync(indexFilePath, currIndexContent)

  const currLess = readFileSync(componentsLessPath, 'utf-8')
  writeFileSync(componentsLessPath, currLess + `@import './${compName}/style/index.less';\n`)
} else if (moduleName === 'cdk') {
  const useTemplate = getCdkUseTemplate(upperFirstComponentName)
  writeFileSync(`${componentDirname}/src/use${upperFirstComponentName}.ts`, useTemplate)

  const indexTemplate = `export * from './src/use${upperFirstComponentName}'`
  writeFileSync(`${componentDirname}/index.ts`, indexTemplate)

  const testTemplate = getCdkTestTemplate(upperFirstComponentName, camelCaseComponentName)
  writeFileSync(`${componentDirname}/__tests__/${camelCaseComponentName}.spec.ts`, testTemplate)
}

const docsZhTemplate = getDocsZhTemplate(upperFirstComponentName, moduleName)
writeFileSync(`${componentDirname}/docs/index.zh.md`, docsZhTemplate)

const domeTemplate = getDomeTemplate(upperFirstComponentName, moduleName)
writeFileSync(`${componentDirname}/demo/basic.md`, domeTemplate)
