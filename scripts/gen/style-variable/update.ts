import { join } from 'path'

import { appendFile, lstatSync, readFile, readdir, writeFile } from 'fs-extra'

import config from './config'

const packageRoot = join(__dirname, '../../../packages')
const mdVariableTitle = `### 主题变量`

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
  return join(dir, component, 'docs/Design.zh.md')
}

/* eslint-disable */
function getDocsTemplate(variables: string[][]) {
  return `${mdVariableTitle}

| 名称 | \`default\` | \`dark\` | 备注 |
| --- | --- | --- | --- |
${variables
  .filter(variable => variable[0] && variable[1])
  .map(
    variable => `| \`${variable[0]}\` | \`${variable[1]}\` | - | - |
`,
  )
  .join('')}`
}
/* eslint-enable */

function file2Array(fileContent: string) {
  return fileContent
    .replace(/\/\*(.|\s)*\*\/|\/\/.*/g, '')
    .split(/;\s*/)
    .map(attr => attr.split(/:\s*/).map(item => item.replace(/(^\s*|\s*$|\n|`)/g, ''))) // 去除首尾空格和中间换行
}

async function appendVariable(target: string, template: string) {
  let targetContent = await readFile(target, 'utf-8')
  if (targetContent.includes(mdVariableTitle)) {
    targetContent = targetContent.replace(new RegExp(`${mdVariableTitle}(.|\\s)*(?=(#+)(.*))?`), template) // 匹配md中两个标题之间的内容进行替换
    writeFile(target, targetContent, 'utf-8')
  } else {
    appendFile(target, `\n${template}`)
  }
}

update()
