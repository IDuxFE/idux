import { copy, copyFile, pathExists, readdirSync, readFile, writeFile } from 'fs-extra'
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

export async function compileLess(targetDirname: string, distDirname: string): Promise<void | void[]> {
  const promiseList = []

  for (const componentDirname of readdirSync(distDirname)) {
    const styleDirname = `${targetDirname}/${componentDirname}/style`
    const outputDirname = `${distDirname}/${componentDirname}/style`

    // Compile less files to CSS and delete the indexPath.
    const indexPath = `${styleDirname}/index.less`
    if (await pathExists(indexPath)) {
      // Copy style files for each component.
      await copy(styleDirname, outputDirname)

      const componentLess = await readFile(indexPath, { encoding: 'utf8' })

      promiseList.push(compile(componentLess, path.join(outputDirname, `index.css`), false, indexPath))
      promiseList.push(compile(componentLess, path.join(outputDirname, `index.min.css`), true, indexPath))
    }
  }

  // Copy concentrated less files.
  await copy(path.resolve(targetDirname, 'style'), path.resolve(distDirname, 'style'))
  await copyFile(`${targetDirname}/components.less`, `${distDirname}/components.less`)
  await copyFile(`${targetDirname}/index.less`, `${distDirname}/index.less`)

  // Compile concentrated less file to CSS file.
  const lessContent = `@import "${path.posix.join(distDirname, 'index.less')}";`
  promiseList.push(compile(lessContent, path.join(distDirname, 'index.css'), false))
  promiseList.push(compile(lessContent, path.join(distDirname, 'index.min.css'), true))

  // Compile css file that doesn't have component-specific styles.
  const baseLessPath = path.join(targetDirname, 'style', 'base.less')
  const baseLess = await readFile(baseLessPath, { encoding: 'utf8' })
  promiseList.push(compile(baseLess, path.join(distDirname, 'style', 'base.css'), false, baseLessPath))
  promiseList.push(compile(baseLess, path.join(distDirname, 'style', 'base.min.css'), true, baseLessPath))
  return Promise.all(promiseList).catch(e => console.log(e))
}
