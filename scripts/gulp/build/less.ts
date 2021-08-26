import { copy, copyFile, pathExists, readdirSync, readFile, remove, writeFile } from 'fs-extra'
import less from 'less'
import path from 'path'

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

function compileIndex(content: string, saveDirname: string) {
  return [
    writeFile(`${saveDirname}/index.js`, content),
    writeFile(`${saveDirname}/css.js`, content.replace(/\.less/g, '.css')),
    remove(`${saveDirname}/index.ts`),
  ]
}

export async function compileLess(targetDirname: string, distDirname: string, isCdk: boolean): Promise<void | void[]> {
  const promiseList = []

  for (const componentDirname of readdirSync(distDirname)) {
    // handler private components
    if (componentDirname === '_private') {
      for (const privateComponentName of readdirSync(path.resolve(distDirname, componentDirname))) {
        const styleDirname = `${targetDirname}/${componentDirname}/${privateComponentName}/style`
        const outputDirname = `${distDirname}/${componentDirname}/${privateComponentName}/style`
        const indexPath = `${styleDirname}/index.less`
        if (await pathExists(indexPath)) {
          // Copy style files for each component.
          await copy(styleDirname, outputDirname)
        }
      }
    }

    const styleDirname = `${targetDirname}/${componentDirname}/style`
    const outputDirname = `${distDirname}/${componentDirname}/style`

    // Compile less files to CSS
    const lessPath = `${styleDirname}/index.less`
    if (await pathExists(lessPath)) {
      // Copy style files for each component.
      await copy(styleDirname, outputDirname)
      const lessContent = await readFile(lessPath, { encoding: 'utf8' })

      promiseList.push(compile(lessContent, path.join(outputDirname, `index.css`), false, lessPath))
      promiseList.push(compile(lessContent, path.join(outputDirname, `index.min.css`), true, lessPath))

      const indexPath = `${styleDirname}/index.ts`
      const indexContent = await readFile(indexPath, { encoding: 'utf8' })
      promiseList.push(...compileIndex(indexContent, outputDirname))
    }
  }

  if (!isCdk) {
    // Compile concentrated less file to CSS file.
    await copy(path.resolve(targetDirname, 'style'), path.resolve(distDirname, 'style'))
    await copyFile(`${targetDirname}/components.less`, `${distDirname}/components.less`)
    await copyFile(`${targetDirname}/index.less`, `${distDirname}/index.less`)
    const entryContent = `@import "${path.posix.join(distDirname, 'index.less')}";`
    promiseList.push(compile(entryContent, path.join(distDirname, 'index.css'), false))
    promiseList.push(compile(entryContent, path.join(distDirname, 'index.min.css'), true))

    // Compile css file that doesn't have component-specific styles.
    const lessPath = path.join(targetDirname, 'style', 'index.less')
    const lessContent = await readFile(lessPath, { encoding: 'utf8' })
    promiseList.push(compile(lessContent, path.join(distDirname, 'style', 'index.css'), false, lessPath))
    promiseList.push(compile(lessContent, path.join(distDirname, 'style', 'index.min.css'), true, lessPath))

    const indexPath = path.join(targetDirname, 'style', 'index.ts')
    const indexContent = await readFile(indexPath, { encoding: 'utf8' })
    promiseList.push(...compileIndex(indexContent, path.join(distDirname, 'style')))
  }

  return Promise.all(promiseList).catch(e => console.log(e))
}
