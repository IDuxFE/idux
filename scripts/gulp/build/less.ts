import path from 'path'

import { copy, copyFile, pathExists, readFile, readdirSync, remove, writeFile } from 'fs-extra'
import less from 'less'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LessPluginCleanCSS from 'less-plugin-clean-css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NpmImportPlugin from 'less-plugin-npm-import'

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

export async function compileLess(targetDirname: string, distDirname: string, isCdk: boolean): Promise<void | void[]> {
  const promiseList = []

  const copyAndCompile = async (styleDirname: string, outputDirname: string, themeName: string) => {
    if (await pathExists(styleDirname)) {
      // Copy style files for each component.
      await copy(styleDirname, outputDirname)

      const lessPath = `${styleDirname}/themes/${themeName}.less`
      const lessContent = await readFile(lessPath, { encoding: 'utf8' })

      promiseList.push(compile(lessContent, path.join(outputDirname, `themes/${themeName}.css`), false, lessPath))
      promiseList.push(compile(lessContent, path.join(outputDirname, `themes/${themeName}.min.css`), true, lessPath))

      const themePath = `${styleDirname}/themes/${themeName}.ts`
      const themeContent = await readFile(themePath, { encoding: 'utf8' })
      promiseList.push(...compileTheme(themeContent, `${outputDirname}/themes`, themeName))
    }
  }

  for (const componentDirname of readdirSync(distDirname)) {
    // handler private components
    if (componentDirname === '_private') {
      for (const privateComponentName of readdirSync(path.resolve(distDirname, componentDirname))) {
        const styleDirname = `${targetDirname}/${componentDirname}/${privateComponentName}/style`
        const outputDirname = `${distDirname}/${componentDirname}/${privateComponentName}/style`
        await copyAndCompile(styleDirname, outputDirname, 'default')
      }
    } else {
      const styleDirname = `${targetDirname}/${componentDirname}/style`
      const outputDirname = `${distDirname}/${componentDirname}/style`
      await copyAndCompile(styleDirname, outputDirname, 'default')
    }
  }

  if (!isCdk) {
    // Compile concentrated less file to CSS file.
    await copy(path.resolve(targetDirname, 'style'), path.resolve(distDirname, 'style'))
    await copyFile(`${targetDirname}/default.less`, `${distDirname}/default.less`)
    const entryContent = `@import "${path.posix.join(distDirname, 'default.less')}";`
    promiseList.push(compile(entryContent, path.join(distDirname, 'default.css'), false))
    promiseList.push(compile(entryContent, path.join(distDirname, 'default.min.css'), true))

    // Compile css file that doesn't have component-specific styles.
    const lessPath = path.join(targetDirname, 'style/core', 'default.less')
    const lessContent = await readFile(lessPath, { encoding: 'utf8' })
    promiseList.push(compile(lessContent, path.join(distDirname, 'style/core', 'default.css'), false, lessPath))
    promiseList.push(compile(lessContent, path.join(distDirname, 'style/core', 'default.min.css'), true, lessPath))

    const themePath = path.join(targetDirname, 'style/core', 'default.ts')
    const themeContent = await readFile(themePath, { encoding: 'utf8' })
    promiseList.push(...compileTheme(themeContent, path.join(distDirname, 'style/core'), 'default'))
  }

  return Promise.all(promiseList).catch(e => console.log(e))
}
