import { readFileSync } from 'fs-extra'
import { join } from 'path'
import { CodeBoxProps } from './types'

const templatePath = join(__dirname, '../template/code-box.html')
const template = readFileSync(templatePath, { encoding: 'utf-8' })

export function generateCodeBox(props: CodeBoxProps): string {
  const { title, packageName, componentName, demoKey, rawCode, highlightCode, docs } = props
  return template
    .replace(/{{title}}/g, title)
    .replace(/{{packageName}}/g, packageName)
    .replace(/{{componentName}}/g, componentName)
    .replace(/{{demoKey}}/g, demoKey)
    .replace(/{{rawCode}}/g, rawCode)
    .replace(/{{highlightCode}}/g, highlightCode)
    .replace(/{{docs}}/g, docs)
}
