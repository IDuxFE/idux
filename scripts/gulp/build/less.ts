import path from 'path'

import { copy, copyFile, pathExists, readFile, readdirSync, remove, writeFile } from 'fs-extra'
import less from 'less'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LessPluginCleanCSS from 'less-plugin-clean-css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NpmImportPlugin from 'less-plugin-npm-import'

import { gulpConfig } from '../gulpConfig'

const { themes } = gulpConfig.build

async function compile(content: string, savePath: string, min: boolean, rootPath?: string): Promise<void> {
  const plugins: Less.Plugin[] = []
  if (min) {
    plugins.push(new LessPluginCleanCSS({ advanced: true }))
  }

  const lessOptions: Less.Options = { plugins, javascriptEnabled: true }

  if (rootPath) {
    lessOptions.paths = [path.dirname(rootPath)]
    lessOptions.filename = rootPath
    plugins.push(new NpmImportPlugin({ prefix: '~' }))
  }

  return less
    .render(content, lessOptions)
    .then(({ css }) => writeFile(savePath, css))
    .catch(err => Promise.reject(err))
}

function compileTheme(content: string, saveDirname: string, themeName: string) {
  const regExp = new RegExp(themeName, 'g')
  return [
    writeFile(`${saveDirname}/${themeName}.js`, content),
    writeFile(
      `${saveDirname}/${themeName}_css.js`,
      content.replace(regExp, `${themeName}_css`).replace(/_css\.less/g, '.css'),
    ),
    remove(`${saveDirname}/${themeName}.ts`),
  ]
}

export async function compileLess(
  targetDirname: string,
  distDirname: string,
  packageName: string,
): Promise<void | void[]> {
  const promiseList = []

  const copyAndCompile = async (styleDirname: string, outputDirname: string, themeName: string) => {
    if (await pathExists(styleDirname)) {
      // Copy style files for each component.
      await copy(styleDirname, outputDirname)

      const lessPath = `${styleDirname}/themes/${themeName}.less`
      const lessContent = await readFile(lessPath, { encoding: 'utf8' })

      promiseList.push(compile(lessContent, path.join(outputDirname, `themes/${themeName}.css`), false, lessPath))

      const themePath = `${styleDirname}/themes/${themeName}.ts`
      const themeContent = await readFile(themePath, { encoding: 'utf8' })
      promiseList.push(...compileTheme(themeContent, `${outputDirname}/themes`, themeName))
    }
  }

  for (const componentDirname of readdirSync(targetDirname)) {
    // handler private components
    if (componentDirname === '_private') {
      for (const privateComponentName of readdirSync(path.resolve(targetDirname, componentDirname))) {
        const styleDirname = `${targetDirname}/${componentDirname}/${privateComponentName}/style`
        const outputDirname = `${distDirname}/${componentDirname}/${privateComponentName}/style`
        for (const theme of themes) {
          await copyAndCompile(styleDirname, outputDirname, theme)
        }
      }
    } else {
      const styleDirname = `${targetDirname}/${componentDirname}/style`
      const outputDirname = `${distDirname}/${componentDirname}/style`
      for (const theme of themes) {
        await copyAndCompile(styleDirname, outputDirname, theme)
      }
    }
  }

  if (packageName !== 'cdk') {
    // Compile concentrated less file to CSS file.
    await copy(path.resolve(targetDirname, 'style'), path.resolve(distDirname, 'style'))
    for (const theme of themes) {
      await copyFile(`${targetDirname}/${theme}.less`, `${distDirname}/${theme}.less`)
      const entryContent = `@import "${path.posix.join(distDirname, theme + '.less')}";`
      promiseList.push(compile(entryContent, path.join(distDirname, `${theme}.css`), false))
      promiseList.push(compile(entryContent, path.join(distDirname, `${theme}.min.css`), true))

      // Compile css file that doesn't have component-specific styles.
      if (packageName === 'components') {
        const resetPath = path.join(targetDirname, 'style/core', `reset.${theme}.less`)
        const resetContent = await readFile(resetPath, { encoding: 'utf8' })
        promiseList.push(
          compile(resetContent, path.join(distDirname, 'style/core', `reset.${theme}.css`), false, resetPath),
        )
        promiseList.push(
          compile(resetContent, path.join(distDirname, 'style/core', `reset.${theme}.min.css`), true, resetPath),
        )

        const resetScrollPath = path.join(targetDirname, 'style/core', `reset-scroll.${theme}.less`)
        const resetScrollContent = await readFile(resetScrollPath, { encoding: 'utf8' })
        promiseList.push(
          compile(
            resetScrollContent,
            path.join(distDirname, 'style/core', `reset-scroll.${theme}.css`),
            false,
            resetScrollPath,
          ),
        )
        promiseList.push(
          compile(
            resetScrollContent,
            path.join(distDirname, 'style/core', `reset-scroll.${theme}.min.css`),
            true,
            resetScrollPath,
          ),
        )
      }
    }
  }

  return Promise.all(promiseList).catch(e => console.log(e))
}
