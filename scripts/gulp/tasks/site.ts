import { task } from 'gulp'

import { execNodeTask } from './taskHelpers'
import { initSite } from '../site'

task('site:init', done => {
  initSite()
  done()
})

task('site:serve', done => {
  execNodeTask('lerna', 'lerna', ['run', 'start', '--stream'])(done)
})

task('site:build', done => {
  execNodeTask('lerna', 'lerna', ['run', 'build', '--stream'])(done)
})
