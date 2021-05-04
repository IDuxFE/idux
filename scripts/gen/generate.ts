import type { QuestionCollection } from 'inquirer'

import { resolve } from 'path'
import { textSync } from 'figlet'
import chalk from 'chalk'
import inquirer from 'inquirer'
import ora from 'ora'
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
  getTsxTemplate,
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
  {
    name: 'useTsx',
    message: 'Do you want to use tsx?',
    type: 'confirm',
    default: false,
    when(answer) {
      return answer.category === 'components'
    },
  },
]

class Generate {
  private packageRoot!: string
  private siteRoot = resolve(__dirname, '../../packages/site')
  private dirPath!: string
  private useTsx = false

  constructor() {
    this.init()
  }

  private async init() {
    console.log(chalk.greenBright(textSync('IDux Generate Tool')))

    const { category, name, type, useTsx } = await inquirer.prompt<AnswerOptions>(questions)

    this.useTsx = !!useTsx
    const spin = ora()
    spin.start('Template is being generated, please wait...\n')
    this.packageRoot = resolve(__dirname, '../../packages', category)

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
        this.generateComponents(name, type!)
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
      writeFile(resolve(this.dirPath, 'docs', 'Index.zh.md'), docsZhTemplate),
      writeFile(resolve(this.dirPath, 'docs', 'Index.en.md'), docsEnTemplate),
      writeFile(resolve(this.dirPath, 'demo', 'Basic.md'), demoTemplate),
      writeFile(resolve(this.dirPath, 'demo', 'Basic.vue'), demoVueTemplate),
    ])
  }

  private async generateComponents(name: string, type: AnswerType) {
    await mkdir(`${this.dirPath}/style`)
    const camelCaseName = camelCase(name)
    const upperFirstName = upperFirst(camelCaseName)
    const lessTemplate = getLessTemplate(kebabCase(name))
    const typesTemplate = getTypesTemplate(upperFirstName, camelCaseName)
    const tsxTemplate = getTsxTemplate(upperFirstName, camelCaseName)
    const vueTemplate = getVueTemplate(upperFirstName, camelCaseName)
    const indexTemplate = getIndexTemplate(upperFirstName)
    const testTemplate = getTestTemplate(upperFirstName)

    await Promise.all([
      writeFile(`${this.dirPath}/style/index.less`, lessTemplate),
      writeFile(`${this.dirPath}/src/types.ts`, typesTemplate),
      this.useTsx
        ? writeFile(`${this.dirPath}/src/${camelCaseName}.tsx`, tsxTemplate)
        : writeFile(`${this.dirPath}/src/${upperFirstName}.vue`, vueTemplate),
      writeFile(`${this.dirPath}/index.ts`, indexTemplate),
      writeFile(`${this.dirPath}/__tests__/${camelCaseName}.spec.ts`, testTemplate),
    ])

    const [typeEn] = type.split('_')

    const [importRegx, componentsRegx, exportRegx] = [
      `// import ${typeEn}`,
      `// components ${typeEn}`,
      `// export ${typeEn}`,
    ]

    const currIndexPath = resolve(this.packageRoot, 'index.ts')
    let currIndexContent = await readFile(currIndexPath, 'utf-8')
    currIndexContent = currIndexContent
      .replace(importRegx, `${importRegx}\nimport { Ix${upperFirstName} } from './${kebabCase(name)}'`)
      .replace(componentsRegx, `${componentsRegx}\n  Ix${upperFirstName},`)
      .replace(exportRegx, `${exportRegx}\n  Ix${upperFirstName},`)
    writeFile(currIndexPath, currIndexContent)

    const currSiteComponentsPath = resolve(this.siteRoot, 'src/iduxComponents.ts')
    let currSiteComponentsContent = await readFile(currSiteComponentsPath, 'utf-8')
    currSiteComponentsContent = currSiteComponentsContent
      .replace(importRegx, `${importRegx}\nimport { Ix${upperFirstName} } from '@idux/components/${kebabCase(name)}'`)
      .replace(componentsRegx, `${componentsRegx}\n  Ix${upperFirstName},`)
    writeFile(currSiteComponentsPath, currSiteComponentsContent)

    const currLessPath = resolve(this.packageRoot, 'components.less')
    let curLessContent = await readFile(currLessPath, 'utf-8')
    curLessContent = curLessContent.replace(
      importRegx,
      `${importRegx}\n@import './${kebabCase(name)}/style/index.less';`,
    )

    writeFile(currLessPath, curLessContent)
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
