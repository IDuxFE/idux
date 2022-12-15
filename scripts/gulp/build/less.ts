import path from 'path'

import { copy, copyFile, pathExists, readFile, readdirSync, remove, writeFile } from 'fs-extra'

// @ts-ignore
import less from 'less'

import { gulpConfig } from '../gulpConfig'

const { themes } = gulpConfig.build

export async function compile(content: string, savePath: string, rootPath?: string): Promise<void> {
  const plugins: any[] = []

  const lessOptions: any = { plugins, javascriptEnabled: true }

  if (rootPath) {
    lessOptions.paths = [path.dirname(rootPath)]
    lessOptions.filename = rootPath
  }

  return less
    .render(content, lessOptions)
    .then(({ css }: any) => writeFile(savePath, css))
    .catch((err: any) => Promise.reject(err))
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

      promiseList.push(compile(lessContent, path.join(outputDirname, `themes/${themeName}.css`), lessPath))

      const themePath = `${styleDirname}/themes/${themeName}.ts`
      const themeContent = await readFile(themePath, { encoding: 'utf8' })
      promiseList.push(...compileTheme(themeContent, `${outputDirname}/themes`, themeName))
    }
  }

  for (const componentDirname of readdirSync(targetDirname)) {
    // handler cdk
    if (packageName === 'cdk') {
      const styleDirname = `${targetDirname}/${componentDirname}/style`
      const outputDirname = `${distDirname}/${componentDirname}/style`
      if (await pathExists(styleDirname)) {
        // Copy style files for each component.
        await copy(styleDirname, outputDirname)
        const lessPath = `${styleDirname}/index.less`
        const lessContent = await readFile(lessPath, { encoding: 'utf8' })
        promiseList.push(compile(lessContent, path.join(outputDirname, `index.css`), lessPath))
      }

      // handler private components
    } else if (componentDirname === '_private') {
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

  if (packageName === 'cdk') {
    await copyFile(`${targetDirname}/index.less`, `${distDirname}/index.less`)
    const entryContent = `@import "${path.posix.join(distDirname, 'index.less')}";`
    promiseList.push(compile(entryContent, path.join(distDirname, `index.css`)))
  } else {
    // Compile concentrated less file to CSS file.
    await copy(path.resolve(targetDirname, 'style'), path.resolve(distDirname, 'style'))
    for (const theme of themes) {
      await copyFile(`${targetDirname}/${theme}.less`, `${distDirname}/${theme}.less`)
      const entryContent = `@import "${path.posix.join(distDirname, theme + '.less')}";`
      promiseList.push(compile(entryContent, path.join(distDirname, `${theme}.css`)))

      // Compile css file that doesn't have component-specific styles.
      if (packageName === 'components') {
        await copyFile(`${targetDirname}/${theme}.full.less`, `${distDirname}/${theme}.full.less`)
        const entryFullContent = `@import "${path.posix.join(distDirname, theme + '.full.less')}";`
        promiseList.push(compile(entryFullContent, path.join(distDirname, `${theme}.full.css`)))

        const resetPath = path.join(targetDirname, 'style/core', `reset.${theme}.less`)
        const resetContent = await readFile(resetPath, { encoding: 'utf8' })
        promiseList.push(compile(resetContent, path.join(distDirname, 'style/core', `reset.${theme}.css`), resetPath))

        const resetScrollPath = path.join(targetDirname, 'style/core', `reset-scroll.${theme}.less`)
        const resetScrollContent = await readFile(resetScrollPath, { encoding: 'utf8' })
        promiseList.push(
          compile(
            resetScrollContent,
            path.join(distDirname, 'style/core', `reset-scroll.${theme}.css`),
            resetScrollPath,
          ),
        )
      }
    }
  }

  return Promise.all(promiseList).catch(e => console.log(e))
}
