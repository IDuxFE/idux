// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import path from 'path'

import { copy, copyFile, mkdir, pathExists, readFile, readdirSync, remove, writeFile } from 'fs-extra'
import less from 'less'

import { gulpConfig } from '../gulpConfig'

const { themes } = gulpConfig.build

export async function compile(content: string, savePath: string, rootPath?: string): Promise<void> {
  const plugins = []

  const lessOptions = {
    plugins,
    javascriptEnabled: true,
  }

  if (rootPath) {
    lessOptions.paths = [path.dirname(rootPath)]
    lessOptions.filename = rootPath
  }

  return less
    .render(content, lessOptions)
    .then(({ css }) => writeFile(savePath, css))
    .catch(err => Promise.reject(err))
}

function compileEntry(content: string, saveDirname: string) {
  return [
    writeFile(`${saveDirname}/index.js`, content),
    writeFile(
      `${saveDirname}/index_css.js`,
      content.replace(/index.less/g, `index.css`).replace(/\/style/g, '/style/index_css.js'),
    ),
    remove(`${saveDirname}/index.ts`),
  ]
}

async function compileThemeEntry(themes: string, targetDirname: string, distDirname: string) {
  const entryPath = `${targetDirname}/style/index.ts`
  if (!(await pathExists(entryPath))) {
    return
  }

  const outputThemeDirname = `${distDirname}/theme`

  if (!(await pathExists(outputThemeDirname))) {
    await mkdir(outputThemeDirname)
  }

  const entryContent = await readFile(entryPath, { encoding: 'utf8' })

  const compile = async (theme: string) => {
    const themePath = `${targetDirname}/theme/${theme}.css`
    const outputThemePath = `${distDirname}/theme/${theme}.css`
    if (await pathExists(themePath)) {
      await copy(themePath, outputThemePath)
    } else {
      await writeFile(outputThemePath, '\n')
    }

    const lines = entryContent.split('\n').map(line => line.trim())
    const content = lines
      .map(line => {
        if (/^\/\//.test(line)) {
          return line
        }

        if (/_private/.test(line)) {
          return
        }

        if (/\.\/index.less/.test(line)) {
          return `import './${theme}.css'`
        }

        return line.replace(/\/style/, `/theme/${theme}`)
      })
      .filter(Boolean)
      .join('\n')

    await writeFile(`${distDirname}/theme/${theme}.js`, content)
  }

  await Promise.all(themes.map(theme => compile(theme)))
}

export async function compileLess(
  targetDirname: string,
  distDirname: string,
  packageName: string,
): Promise<void | void[]> {
  const promiseList = []

  const copyAndCompile = async (styleDirname: string, outputDirname: string) => {
    if (await pathExists(styleDirname)) {
      // Copy style files for each component.
      await copy(styleDirname, outputDirname)

      const lessPath = `${styleDirname}/index.less`
      const lessContent = await readFile(lessPath, { encoding: 'utf8' })

      promiseList.push(compile(lessContent, path.join(outputDirname, `index.css`), lessPath))

      const entryPath = `${styleDirname}/index.ts`
      const entryContent = await readFile(entryPath, { encoding: 'utf8' })
      promiseList.push(...compileEntry(entryContent, outputDirname))
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

        await copyAndCompile(styleDirname, outputDirname)
      }
    } else {
      const styleDirname = `${targetDirname}/${componentDirname}/style`
      const outputDirname = `${distDirname}/${componentDirname}/style`

      await copyAndCompile(styleDirname, outputDirname)

      promiseList.push(
        compileThemeEntry(themes, `${targetDirname}/${componentDirname}`, `${distDirname}/${componentDirname}`),
      )
    }
  }

  if (packageName === 'cdk') {
    await copyFile(`${targetDirname}/index.less`, `${distDirname}/index.less`)
    const entryContent = `@import "${path.posix.join(distDirname, 'index.less')}";`
    promiseList.push(compile(entryContent, path.join(distDirname, `index.css`)))
  } else {
    // Compile concentrated less file to CSS file.
    await copy(path.resolve(targetDirname, 'style'), path.resolve(distDirname, 'style'))
    await copyFile(`${targetDirname}/index.less`, `${distDirname}/index.less`)
    const entryContent = `@import "${path.posix.join(distDirname, 'index.less')}";`
    promiseList.push(compile(entryContent, path.join(distDirname, 'index.css')))

    if (packageName === 'components') {
      await copyFile(`${targetDirname}/index.full.less`, `${distDirname}/index.full.less`)

      const entryFullContent = `@import "${path.posix.join(distDirname, 'index.full.less')}";`
      promiseList.push(compile(entryFullContent, path.join(distDirname, 'index.full.css')))

      const resetPath = path.join(targetDirname, 'style/core', `reset.less`)
      const resetContent = await readFile(resetPath, { encoding: 'utf8' })
      promiseList.push(compile(resetContent, path.join(distDirname, 'style/core', `reset.css`), resetPath))

      const resetScrollPath = path.join(targetDirname, 'style/core', `reset-scroll.less`)
      const resetScrollContent = await readFile(resetScrollPath, { encoding: 'utf8' })
      promiseList.push(
        compile(resetScrollContent, path.join(distDirname, 'style/core', `reset-scroll.css`), resetScrollPath),
      )
    }

    for (const theme of themes) {
      if (await pathExists(`${targetDirname}/${theme}.css`)) {
        await copyFile(`${targetDirname}/${theme}.css`, `${distDirname}/${theme}.css`)
      }
      if (await pathExists(`${targetDirname}/${theme}.full.css`)) {
        await copyFile(`${targetDirname}/${theme}.full.css`, `${distDirname}/${theme}.full.css`)
      }
    }
  }

  return Promise.all(promiseList).catch(e => console.log(e))
}
