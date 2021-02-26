import { series, task } from 'gulp'
import detectPort from 'detect-port'

import { execNodeTask } from '../util/task-helpers'
import { initSite } from '../site'

/** Parse demos and docs to site directory. */
task('init:site', done => {
  initSite()
  done()
})

/** Run `vite` */
task('serve:site', done => {
  detectPort(3000).then((port: number) => {
    execNodeTask('vite', 'vite', ['--port', port === 3000 ? '3000' : '0', '--open'])(done)
  })
})

/** Run `vite build` */
task('build:site', execNodeTask('vite', 'vite', ['build']))

/** Init site directory, and start watch and vite */
task('site:start', series('init:site', 'serve:site'))

task('site:build', series('init:site', 'build:site'))
