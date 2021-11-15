import type { QuestionCollection } from 'inquirer'

import { resolve } from 'path'

import chalk from 'chalk'
import { textSync } from 'figlet'
import { mkdir, pathExistsSync, readFile, writeFile } from 'fs-extra'
import inquirer from 'inquirer'
import { camelCase, kebabCase, upperFirst } from 'lodash'
import ora from 'ora'

import {
  getCdkTestTemplate,
  getCdkUseTemplate,
  getDemoTemplate,
  getDemoVueTemplate,
  getDocsTemplate,
  getIndexTemplate,
  getLessTemplate,
  getStyleIndexTemplate,
  getTestTemplate,
  getThemesTemplate,
  getTsxTemplate,
  getTypesTemplate,
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
  isPrivate?: boolean
  type?: AnswerType
  useTsx?: boolean
  name: string
}

const questions: QuestionCollection<AnswerOptions>[] = [
  {
    name: 'category',
    message: 'Please select the category you want to generate.',
    type: 'list',
    choices: ['cdk', 'components', 'pro'],
    default: 'components',
  },
  {
    name: 'isPrivate',
    message: 'Whether or not a private component?',
    type: 'confirm',
    default: false,
    when(answer) {
      return answer.category === 'components'
    },
  },
  {
    name: 'type',
    message: 'Please select the type you want to generate.',
    type: 'list',
    when(answer) {
      return answer.category === 'components' && !answer.isPrivate
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
  private packageRoot!: string
  private dirPath!: string
  private isPrivate = false

  constructor() {
    this.init()
  }

  private async init() {
    console.log(chalk.greenBright(textSync('IDux Generate Tool')))

    const { category, name, type, isPrivate } = await inquirer.prompt<AnswerOptions>(questions)

    this.isPrivate = !!isPrivate

    const spin = ora()
    spin.start('Template is being generated, please wait...\n')
    this.packageRoot = resolve(__dirname, '../../packages', category)

    const dirName = kebabCase(name)
    const dirPath = resolve(this.packageRoot, isPrivate ? '_private' : '')

    if (!pathExistsSync(dirPath)) {
      await mkdir(dirPath)
    }

    this.dirPath = resolve(dirPath, dirName)

    if (pathExistsSync(this.dirPath)) {
      spin.fail(chalk.redBright(`${name} is already exists in ${category}, please change it!`))
      return
    }
    await this.createDir()
    await this.generate(category, name, type)

    spin.succeed(`The template is successfully created, enjoy coding ${chalk.bgRed.bold('   o(*≧▽≦)ツ┏━┓   ')}`)
    console.log(chalk.bold.yellowBright(textSync('Hello World!')))
  }

  private async createDir() {
    await mkdir(this.dirPath)
    const tasks = [
      mkdir(`${this.dirPath}/src`),
      mkdir(`${this.dirPath}/__tests__`),
      !this.isPrivate && mkdir(`${this.dirPath}/docs`),
      !this.isPrivate && mkdir(`${this.dirPath}/demo`),
    ]
    return Promise.all(tasks.filter(item => item) as Promise<void>[])
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

    if (this.isPrivate) {
      return Promise.resolve()
    }

    const compName = upperFirst(camelCase(name))
    const docsZhTemplate = getDocsTemplate(category, compName, type)
    const docsEnTemplate = getDocsTemplate(category, compName, type, true)
    const demoTemplate = getDemoTemplate()
    const demoVueTemplate = getDemoVueTemplate(compName)

    return Promise.all([
      writeFile(resolve(this.dirPath, 'docs', 'Index.zh.md'), docsZhTemplate),
      writeFile(resolve(this.dirPath, 'docs', 'Index.en.md'), docsEnTemplate),
      writeFile(resolve(this.dirPath, 'demo', 'Basic.md'), demoTemplate),
      writeFile(resolve(this.dirPath, 'demo', 'Basic.vue'), demoVueTemplate),
    ])
  }

  private async generateComponents(name: string) {
    await mkdir(`${this.dirPath}/style`)
    await mkdir(`${this.dirPath}/style/themes`)
    const camelCaseName = camelCase(name)
    const upperFirstName = upperFirst(camelCaseName)

    const testTemplate = getTestTemplate(upperFirstName)

    const tsxTemplate = getTsxTemplate(upperFirstName, camelCaseName)
    const typesTemplate = getTypesTemplate(upperFirstName, camelCaseName)

    const themesTemplate = getThemesTemplate(this.isPrivate)
    const lessTemplate = getLessTemplate(kebabCase(name))
    const styleIndexTemplate = getStyleIndexTemplate()

    const indexTemplate = getIndexTemplate(upperFirstName)

    await Promise.all([
      writeFile(`${this.dirPath}/__tests__/${camelCaseName}.spec.ts`, testTemplate),
      writeFile(`${this.dirPath}/src/${upperFirstName}.tsx`, tsxTemplate),
      writeFile(`${this.dirPath}/src/types.ts`, typesTemplate),
      writeFile(`${this.dirPath}/style/themes/default.less`, themesTemplate),
      writeFile(`${this.dirPath}/style/index.less`, lessTemplate),
      writeFile(`${this.dirPath}/style/index.ts`, styleIndexTemplate),
      writeFile(`${this.dirPath}/index.ts`, indexTemplate),
    ])

    if (this.isPrivate) {
      const currIndexPath = resolve(this.packageRoot, '_private/index.ts')
      let currIndexContent = await readFile(currIndexPath, 'utf-8')
      currIndexContent += `\nexport *  from './${kebabCase(name)}'`

      writeFile(currIndexPath, currIndexContent)
    } else {
      const currIndexPath = resolve(this.packageRoot, 'index.ts')
      let currIndexContent = await readFile(currIndexPath, 'utf-8')
      currIndexContent += `\nimport { Ix${upperFirstName} } from '@idux/components/${kebabCase(name)}'`

      writeFile(currIndexPath, currIndexContent)

      const currLessPath = resolve(this.packageRoot, 'components.less')
      let curLessContent = await readFile(currLessPath, 'utf-8')
      curLessContent += `\n@import './${kebabCase(name)}/style/index.less';`

      writeFile(currLessPath, curLessContent)
    }

    const currPrefixPath = resolve(this.packageRoot, 'style/variable/prefix.less')
    let currPrefixContent = await readFile(currPrefixPath, 'utf-8')
    currPrefixContent += `\n@${kebabCase(name)}-prefix: ~'@{idux-prefix}-${kebabCase(name)}';`

    writeFile(currPrefixPath, currPrefixContent)
  }

  private async generateCdk(name: string) {
    const cdkTemplate = getCdkUseTemplate(upperFirst(camelCase(name)))
    const indexTemplate = `export * from './src/use${upperFirst(camelCase(name))}'\
    `
    const testTemplate = getCdkTestTemplate(upperFirst(camelCase(name)), camelCase(name))

    return Promise.all([
      writeFile(resolve(this.dirPath, 'src', `use${upperFirst(camelCase(name))}.ts`), cdkTemplate),
      writeFile(resolve(this.dirPath, 'index.ts'), indexTemplate),
      writeFile(resolve(this.dirPath, '__tests__', `${camelCase(name)}.spec.ts`), testTemplate),
    ])
  }
}

new Generate()
