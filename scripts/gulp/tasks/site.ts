import { parallel, series, task, watch } from 'gulp'
import { debounce } from 'lodash'
import { join } from 'path'
import { buildConfig } from '../buildConfig'
import { execNodeTask } from '../util/task-helpers'

import detectPort from 'detect-port'

import { generateSite } from '../site/generateSite'
import { Log } from '../../utils/log'

const siteGlob = join(buildConfig.packageRoot, `**/+(docs|demo)/*.(md|vue)`)

/** Parse demos and docs to site directory. */
task('site:init', done => {
  generateSite('init')
  done()
})

/**
 * Development app watch task,
 * to ensures the demos and docs have changes are rebuild.
 */
task('site:watch', () => {
  // Globs accepts the Unix-style path separators only
  const globs = [siteGlob].map(p => p.replace(/\\/g, '/'))
  watch(globs).on(
    'change',
    debounce(path => {
      const p = path.replace(/\\/g, '/')
      const execArray = /packages\/(cdk|components|pro)\/(.+)\/(docs|demo)/.exec(p)
      if (execArray && execArray[1] && execArray[2]) {
        const componentType = execArray[1]
        const componentName = execArray[2]
        Log.success(`Reload '${componentType}/${componentName}'`)
        generateSite(componentType, componentName)
      }
    }, 3000),
  )
})

/** Run `vite` */
task('site:serve', done => {
  detectPort(3000).then((port: number) => {
    execNodeTask('vite', 'vite', ['--port', port === 3000 ? '3000' : '0', '--open'])(done)
  })
})

/** Init site directory, and start watch and vite */
task('site:start', series('site:init', parallel('site:watch', 'site:serve')))
