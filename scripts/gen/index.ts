import { mkdirSync, pathExistsSync, writeFileSync } from 'fs-extra'
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

const dirname = join(__dirname, '../../packages', moduleName, compName)

if (pathExistsSync(dirname)) {
  Log.error(`${compName} component already exists, please change it\n`)
  process.exit(1)
}

mkdirSync(dirname)
mkdirSync(`${dirname}/src`)
mkdirSync(`${dirname}/__tests__`)
mkdirSync(`${dirname}/docs`)
mkdirSync(`${dirname}/demo`)

const camelCaseComponentName = camelCase(compName)
const upperFirstComponentName = upperFirst(camelCaseComponentName)

if (moduleName === 'components') {
  mkdirSync(`${dirname}/style`)
  const lessTemplate = getLessTemplate(compName)
  writeFileSync(`${dirname}/style/index.less`, lessTemplate)

  const typesTemplate = getTypesTemplate(upperFirstComponentName)
  writeFileSync(`${dirname}/src/types.ts`, typesTemplate)

  const vueTemplate = getVueTemplate(upperFirstComponentName)
  writeFileSync(`${dirname}/src/${upperFirstComponentName}.vue`, vueTemplate)

  const indexTemplate = getIndexTemplate(upperFirstComponentName)
  writeFileSync(`${dirname}/index.ts`, indexTemplate)

  const testTemplate = getTestTemplate(upperFirstComponentName)
  writeFileSync(`${dirname}/__tests__/${camelCaseComponentName}.spec.ts`, testTemplate)
} else if (moduleName === 'cdk') {
  const useTemplate = getCdkUseTemplate(upperFirstComponentName)
  writeFileSync(`${dirname}/src/use${upperFirstComponentName}.ts`, useTemplate)

  const indexTemplate = `export * from './src/use${upperFirstComponentName}'`
  writeFileSync(`${dirname}/index.ts`, indexTemplate)

  const testTemplate = getCdkTestTemplate(upperFirstComponentName, camelCaseComponentName)
  writeFileSync(`${dirname}/__tests__/${camelCaseComponentName}.spec.ts`, testTemplate)
}

const docsZhTemplate = getDocsZhTemplate(upperFirstComponentName, moduleName)
writeFileSync(`${dirname}/docs/index.zh-CN.md`, docsZhTemplate)

const domeTemplate = getDomeTemplate(upperFirstComponentName, moduleName)
writeFileSync(`${dirname}/demo/basic.md`, domeTemplate)
