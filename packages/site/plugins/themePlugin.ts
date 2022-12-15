import { mkdirSync, readFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import path from 'path'

import { existsSync, writeFileSync } from 'fs-extra'
import rimraf from 'rimraf'
import { Plugin } from 'vite'

import { compile } from '../../../scripts/gulp/build/less'

export const themePlugin = (options?: Options): Plugin => {
  const srcPath = path.join(process.cwd(), 'src')
  let outputDir = ''

  const themeDirName = 'themes'
  let basePath = ''
  let isBuild = false
  let originalThemeLess = ''

  const changeRuntimeTheme = async (theme: string): Promise<void> => {
    const lessFilePath = path.join(srcPath, 'styles/themes', 'index.less')
    return writeFile(lessFilePath, `@import './${theme}.less';`)
  }

  return {
    name: 'idux:site-theme-plugin',
    enforce: 'pre',
    configResolved(config) {
      basePath = config.base
      outputDir = config.build.outDir
      if (config.command === 'build') {
        isBuild = true
      }
      // generate themes menus
      writeFileSync(
        path.join(srcPath, 'components/global/themeConfig.ts'),
        `export const themeConfig = ${JSON.stringify(options?.themes)}`,
      )
    },
    async configureServer(server) {
      // default theme
      await changeRuntimeTheme('default')
      // change theme func on dev mode
      server.middlewares.use('/themes/s', async (ctx, resp) => {
        await changeRuntimeTheme(ctx.url!.split('/')[1])
        resp.write('hello idux!')
        resp.end()
      })
    },
    // clear user theme selected,and avoid theme css into chunk
    buildStart() {
      if (isBuild) {
        const topPath = path.join(process.cwd(), 'src')
        const lessFilePath = path.join(topPath, 'index.less')

        const themeContent = readFileSync(lessFilePath).toString()
        if (!originalThemeLess) {
          originalThemeLess = themeContent.match(/\/\/==themes\n(.*?)\n\/\/==/s)?.[1] ?? ''
        }
        writeFileSync(lessFilePath, themeContent.replace(originalThemeLess, ''))
      }
    },
    // restore user last modified theme code
    buildEnd() {
      if (isBuild) {
        const lessFilePath = path.join(srcPath, 'index.less')
        const themeContent = readFileSync(lessFilePath).toString()
        writeFileSync(
          lessFilePath,
          themeContent.replace(/(\/\/==themes\n)(.*?)(\n\/\/==)/s, (_1, b, _2, d) => b + originalThemeLess + d),
        )
      }
    },
    async generateBundle() {
      const buildThemeDir = path.join(outputDir, themeDirName)
      if (existsSync(buildThemeDir)) {
        rimraf.sync(buildThemeDir)
      }
      mkdirSync(buildThemeDir)
      // resolve theme absolute path
      const themeLessContent = originalThemeLess.replaceAll('./styles/', 'src/styles/')
      // compile all theme
      await Promise.all(
        options!.themes!.map(async theme => {
          const themeLess = themeLessContent.replace('themes/index', `themes/${theme.key}`)
          await compile(themeLess, path.join(buildThemeDir, `${theme.key}.css`))
        }),
      )
    },
    // inject the default theme-css link and changeTheme() to index.html
    transformIndexHtml(html) {
      if (!isBuild) {
        return html
      } else {
        return {
          html,
          tags: [
            {
              tag: 'link',
              attrs: {
                type: 'text/css',
                rel: 'stylesheet',
                href: `${basePath}themes/default.css`,
                id: 'theme-link',
              },
              injectTo: 'head',
            },
            {
              tag: 'script',
              //language='javascript'
              children: `
                const createThemeLinkTag = (id, href) => {
                  const link = document.createElement('link')
                  link.type = 'text/css'
                  link.rel = 'stylesheet'
                  link.id = id
                  link.href = href
                  return link
                }
                window.changeTheme = (theme) => {
                  const linkId = 'theme-link'
                  const href = "${basePath}${themeDirName}/" + theme + ".css"
                  let styleLink = document.getElementById(linkId)
                  if (styleLink) {
                    styleLink.id = linkId + "_old"
                    const newLink = createThemeLinkTag(linkId, href)
                    if (styleLink.nextSibling) {
                      styleLink.parentNode.insertBefore(newLink, styleLink.nextSibling)
                    } else {
                      styleLink.parentNode.appendChild(newLink)
                    }
                    newLink.onload = () => {
                      requestAnimationFrame(() => {
                        styleLink.parentNode.removeChild(styleLink)
                        styleLink = null
                      })
                    }
                    return
                  }
                  document.head.appendChild(createThemeLinkTag(linkId, href))
                }`,
              injectTo: 'body',
            },
          ],
        }
      }
    },
  }
}

export interface Theme {
  key: string
  label: string
}

export interface Options {
  /**
   * theme config
   *
   * @default 'default'
   */
  themes: Theme[]
}
