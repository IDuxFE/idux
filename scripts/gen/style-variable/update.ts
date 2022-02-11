import { join } from 'path'

import { appendFile, lstatSync, readFile, readdir, writeFile } from 'fs-extra'

import config from './config'

const packageRoot = join(__dirname, '../../../packages')
const insertBeginFlag = `<!--- insert less variable begin  --->`
const insertEndFlag = `<!--- insert less variable end  --->`

async function update() {
  for (const dir of config.dirs ?? []) {
    const curDirPath = join(packageRoot, dir)
    const components = await readdir(curDirPath)
    const requiredUpdate = components.filter(component => isRequired(dir, component, curDirPath))
    for (const component of requiredUpdate) {
      const lessVariable = await readFile(getComponentStylePath(curDirPath, component), 'utf-8')
      const template = getDocsTemplate(file2Array(lessVariable))
      appendVariable(getComponentDocsPath(curDirPath, component), template)
    }
  }
}

function isRequired(dir: string, component: string, curDirPath: string) {
  const curComponentName = `${dir}/${component}`
  if (!lstatSync(join(curDirPath, component)).isDirectory()) {
    return false
  }
  if ((config.includes ?? []).length > 0) {
    return (config.includes ?? []).includes(curComponentName)
  }
  if ((config.excludes ?? []).length > 0) {
    return !(config.excludes ?? []).includes(curComponentName)
  }
  return true
}

function getComponentStylePath(dir: string, component: string) {
  return join(dir, component, 'style/themes/default.variable.less')
}

function getComponentDocsPath(dir: string, component: string) {
  return join(dir, component, 'docs/Index.zh.md')
}

/* eslint-disable */
function getDocsTemplate(variables: string[][]) {
  const existVariables = variables.filter(variable => variable[0] && variable[1])

  if (existVariables.length === 0) {
    return ''
  }

  return `${insertBeginFlag}
## 主题变量

| 名称 | \`default\` | \`dark\` | 备注 |
| --- | --- | --- | --- |
${existVariables
  .map(
    variable => `| \`${variable[0]}\` | \`${variable[1]}\` | - | - |
`,
  )
  .join('')}${insertEndFlag}`
}
/* eslint-enable */

function file2Array(fileContent: string) {
  return fileContent
    .replace(/\/\*(.|\s)*\*\/|\/\/.*/g, '') // 去除注释
    .split(/;\s*/)
    .map(attr => attr.split(/:\s*/).map(item => item.replace(/(^\s*|\s*$|\n|`)/g, ''))) // 去除首尾空格和中间换行
}

async function appendVariable(target: string, template: string) {
  let targetContent = await readFile(target, 'utf-8')
  if (targetContent.includes(insertBeginFlag)) {
    targetContent = targetContent.replace(new RegExp(`${insertBeginFlag}(.|\\s)*${insertEndFlag}`), template) // 匹配原有的内容进行替换
    writeFile(target, targetContent, 'utf-8')
  } else {
    appendFile(target, `\n${template}`)
  }
}

update()
