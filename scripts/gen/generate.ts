import type { QuestionCollection } from 'inquirer'

import { resolve } from 'path'
import { textSync } from 'figlet'
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'
import * as ora from 'ora'
import { camelCase, kebabCase, upperFirst } from 'lodash'
import { mkdir, pathExistsSync, readFile, writeFile } from 'fs-extra'

import {
  getIndexTemplate,
  getLessTemplate,
  getTestTemplate,
  getTypesTemplate,
  getDocsZhTemplate,
  getVueTemplate,
  getDemoTemplate,
  getDemoVueTemplate,
  getCdkUseTemplate,
  getCdkTestTemplate,
} from './template'

type AnswerType =
  | 'General_通用'
  | 'Layout_布局'
  | 'Navigation_导航'
  | 'Data Entry_数据录入'
  | 'Data Display_数据展示'
  | 'Feedback_反馈'
  | 'Other_其他'

interface AnswerOptions {
  category: 'cdk' | 'components' | 'pro'
  type?: AnswerType
  name: string
}

const questions: QuestionCollection<AnswerOptions>[] = [
  {
    name: 'category',
    message: 'Please select the category you want to generate.',
    type: 'list',
    choices: ['cdk', 'components', 'pro'],
  },
  {
    name: 'type',
    message: 'Please select the type you want to generate.',
    type: 'list',
    when(answer) {
      return answer.category === 'components'
    },
    choices: [
      'General_通用',
      'Layout_布局',
      'Navigation_导航',
      'Data Entry_数据录入',
      'Data Display_数据展示',
      'Feedback_反馈',
      'Other_其他',
    ],
  },
  { name: 'name', message: 'Please enter the name.' },
]

class Generate {
  private packageRoot: string
  private dirPath: string

  constructor() {
    this.init()
  }

  private async init() {
    console.log(chalk.greenBright(textSync('IDux Generate Tool')))

    const { category, name, type } = await inquirer.prompt<AnswerOptions>(questions)

    const spin = ora()
    spin.start('Template is being generated, please wait...\n')
    this.packageRoot = resolve(__dirname, '../', '../', 'packages', category)

    const dirName = kebabCase(name)
    this.dirPath = resolve(this.packageRoot, dirName)

    if (pathExistsSync(this.dirPath)) {
      spin.fail(chalk.redBright(`${name} is already exists in ${category}, please change it!`))
    }
    await this.createDir()
    await this.generate(category, name, type)

    spin.succeed(`The template is successfully created, enjoy coding ${chalk.bgRed.bold('   o(*≧▽≦)ツ┏━┓   ')}`)
    console.log(chalk.bold.yellowBright(textSync('Hello World!')))
  }

  private async createDir() {
    await mkdir(this.dirPath)
    return Promise.all([
      mkdir(`${this.dirPath}/src`),
      mkdir(`${this.dirPath}/__tests__`),
      mkdir(`${this.dirPath}/docs`),
      mkdir(`${this.dirPath}/demo`),
    ])
  }

  private generate(category: AnswerOptions['category'], name: string, type?: AnswerType) {
    switch (category) {
      case 'components':
        this.generateComponents(name)
        break
      case 'cdk':
        this.generateCdk(name)
        break
      // todo pro
    }

    const docsZhTemplate = getDocsZhTemplate(name, category, upperFirst(camelCase(name)), type)
    const docsEnTemplate = getDocsZhTemplate(name, category, upperFirst(camelCase(name)), type, true)
    const demoTemplate = getDemoTemplate()
    const demoVueTemplate = getDemoVueTemplate(kebabCase(name))

    return Promise.all([
      writeFile(resolve(this.dirPath, 'docs', 'index.zh.md'), docsZhTemplate),
      writeFile(resolve(this.dirPath, 'docs', 'index.en.md'), docsEnTemplate),
      writeFile(resolve(this.dirPath, 'demo', 'basic.md'), demoTemplate),
      writeFile(resolve(this.dirPath, 'demo', 'Basic.vue'), demoVueTemplate),
    ])
  }

  private async generateComponents(name: string) {
    await mkdir(`${this.dirPath}/style`)
    const upperFirstName = upperFirst(camelCase(name))
    const lessTemplate = getLessTemplate(kebabCase(name))
    const typesTemplate = getTypesTemplate(upperFirstName)
    const vueTemplate = getVueTemplate(upperFirstName)
    const indexTemplate = getIndexTemplate(upperFirstName)
    const testTemplate = getTestTemplate(upperFirstName)

    await Promise.all([
      writeFile(`${this.dirPath}/style/index.less`, lessTemplate),
      writeFile(`${this.dirPath}/src/types.ts`, typesTemplate),
      writeFile(`${this.dirPath}/src/${upperFirstName}.vue`, vueTemplate),
      writeFile(`${this.dirPath}/index.ts`, indexTemplate),
      writeFile(`${this.dirPath}/__tests__/${camelCase(name)}.spec.ts`, testTemplate),
    ])

    // 这里都是硬编码，有没有更好的实现方式？
    let currIndexContent = await readFile(resolve(this.packageRoot, 'index.ts'), 'utf-8')
    currIndexContent = currIndexContent
      .replace(
        '// --- import end ---',
        `// --- import end ---\nimport { Ix${upperFirstName} } from './${kebabCase(name)}'`,
      )
      .replace('// --- components end ---', `// --- components end ---\n  Ix${upperFirstName},`)
      .replace('// --- export end ---', `// --- export end ---\n  Ix${upperFirstName},`)
    const curLess = await readFile(resolve(this.packageRoot, 'components.less'))
    writeFile(resolve(this.packageRoot, 'index.ts'), currIndexContent)
    writeFile(
      resolve(this.packageRoot, 'components.less'),
      curLess + `@import './${kebabCase(name)}/style/index.less';\n`,
    )
  }

  private async generateCdk(name: string) {
    const cdkTemplate = getCdkUseTemplate(upperFirst(camelCase(name)))
    const indexTemplate = `export * from './src/use${upperFirst(camelCase(name))}'\
    `
    const testTemplate = getCdkTestTemplate(upperFirst(camelCase(name)), camelCase(name))

    return Promise.all([
      writeFile(resolve(this.dirPath, 'src', `use${upperFirst(camelCase(name))}.ts`), cdkTemplate),
      writeFile(resolve(this.dirPath, 'index.ts'), indexTemplate),
      writeFile(resolve(this.dirPath, '__tests__', `${upperFirst(camelCase(name))}.spec.ts`), testTemplate),
    ])
  }
}

new Generate()
