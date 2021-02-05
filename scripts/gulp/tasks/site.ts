import { series, task } from 'gulp'
import detectPort from 'detect-port'

import { execNodeTask } from '../util/task-helpers'
import { initSite } from '../site'

/** Parse demos and docs to site directory. */
task('site:init', done => {
  initSite()
  done()
})

/** Run `vite` */
task('site:serve', done => {
  detectPort(3000).then((port: number) => {
    execNodeTask('vite', 'vite', ['--port', port === 3000 ? '3000' : '0', '--open'])(done)
  })
})

/** Init site directory, and start watch and vite */
task('site:start', series('site:init', 'site:serve'))
