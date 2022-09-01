import type { UpdateStyleVariableConfig } from './config'
import type { Pattern } from 'fast-glob'

import { basename, join } from 'path'

import fg from 'fast-glob'
import { lstatSync, readFile, readdir, writeFile } from 'fs-extra'

import config from './config'

const packageRoot = join(__dirname, '../../../packages')

class UpdateStyleVariable {
  public async start(config: UpdateStyleVariableConfig) {
    for (const dir of config.dirs ?? []) {
      const curDirPath = join(packageRoot, dir)
      const components = await readdir(curDirPath)
      const requiredUpdate = components.filter(component => this.isRequired(dir, component, curDirPath, config))
      for (const component of requiredUpdate) {
        const themeFiles = await this.getComponentStylePath(curDirPath, component, config.sourcePattern)
        const lessVariables = await this.getLessVariable(themeFiles)
        const themes = themeFiles.map(themeFile => this.getTheme(themeFile))
        const template = this.getDocsTemplate(lessVariables, themes)
        await this.appendVariable(this.getComponentDocsPath(curDirPath, component, config.targetDocs), template)
      }
    }
  }

  private async getLessVariable(themeFiles: string[]) {
    return await Promise.all(themeFiles.map(themeFile => readFile(themeFile, 'utf-8'))).then(fileContents =>
      fileContents.reduce((acc, fileContent, index) => {
        const curTheme = this.getTheme(themeFiles?.[index])
        if (!curTheme) {
          console.warn('Invalid file naming about variable less')
          return acc
        }
        const obj = this.file2Obj(fileContent)
        for (const objKey in obj) {
          acc[objKey] = acc[objKey] ? { ...acc[objKey], [curTheme]: obj[objKey] } : { [curTheme]: obj[objKey] }
        }
        return acc
      }, {} as Record<string, Record<string, string>>),
    )
  }

  private getTheme(themeFile: string) {
    return basename(themeFile, '.variable.less')
  }

  private isRequired(dir: string, component: string, curDirPath: string, config: UpdateStyleVariableConfig) {
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

  private async getComponentStylePath(dir: string, component: string, sourcePattern: Pattern) {
    const variablesPath = await fg(sourcePattern, { cwd: join(dir, component) })
    return variablesPath.map(variablePath => join(dir, component, variablePath))
  }

  private getComponentDocsPath(dir: string, component: string, targetDocs: string) {
    return join(dir, component, targetDocs)
  }

  /* eslint-disable */
  private getDocsTemplate(variables: Record<string, Record<string, string>>, themes: (string | undefined)[]) {
    const variablesEntries = Object.entries(variables).filter(
      variable => variable[0] && Object.values(variable[1]).some(item => item),
    )
    const exitThemes = themes.filter(theme => theme) as string[]
    if (Object.keys(variablesEntries).length === 0) {
      return `## 主题变量

| 名称 | ${exitThemes.join(' | ')} | 备注 |
| --- | --- | --- | --- |
`
    }

    return `## 主题变量

| 名称 | ${exitThemes.join(' | ')} | 备注 |
| --- | --- | --- | --- |
${variablesEntries
  .map(variable => {
    const themeValue = exitThemes
      .map(theme => {
        const value = variable[1][theme]
        return value ? `\`${value.replace(/[\r\n]/g, '')}\`` : '-'
      })
      .join(' | ')
    return `| \`${variable[0]}\` | ${themeValue} | - |
`
  })
  .join('')}`
  }

  /* eslint-enable */

  private file2Obj(fileContent: string) {
    return fileContent
      .replace(/\/\*(.|\s)*\*\/|\/\/.*/g, '') // 去除注释
      .split(/;\s*/)
      .map(attr => attr.split(/:\s*/).map(item => item.replace(/(^\s*|\s*$|\n|`)/g, ''))) // 去除首尾空格和中间换行
      .reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {} as Record<string, string>)
  }

  private async appendVariable(target: string, template: string) {
    writeFile(target, `${template.trim()}\n`, 'utf-8')
    // const targetContent = await readFile(target, 'utf-8')
    // if (!targetContent.length) {
    //   writeFile(target, targetContent, 'utf-8')
    // } else {
    //   template.trim() && appendFile(target, `\n${template}`)
    // }
  }
}

const updater = new UpdateStyleVariable()
updater.start(config).then(() => console.log('Update completed!'))
