import { TaskFunction, series } from 'gulp'

import { execNodeTask } from '../taskHelpers'
import { initSite } from './utils'

const init: TaskFunction = done => {
  initSite()
  done()
}

const start: TaskFunction = done => execNodeTask('vite', ['--host'])(done)

const build: TaskFunction = done => execNodeTask('lerna', ['run', 'build', '--scope', '@idux/site'])(done)

const buildPreVersion: TaskFunction = done =>
  execNodeTask('lerna', ['run', 'build:pre-version', '--scope', '@idux/site'])(done)

export const siteStart = series(init, start)
export const siteBuild = series(init, build)
export const siteBuildPreVersion = series(init, buildPreVersion)
