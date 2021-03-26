import { series, TaskFunction } from 'gulp'
import { iconsCopy } from '../icons'
import { execNodeTask } from '../taskHelpers'
import { initSite } from './utils'

const initTask: TaskFunction = done => {
  initSite()
  done()
}

const start: TaskFunction = done => execNodeTask('lerna', ['run', 'start', '--scope', '@idux/site', '--stream'])(done)

const build: TaskFunction = done => execNodeTask('lerna', ['run', 'build', '--scope', '@idux/site', '--stream'])(done)

export const siteStart = series(iconsCopy, initTask, start)
export const siteBuild = series(iconsCopy, initTask, build)
