import { TaskFunction, series } from 'gulp'

import { gulpConfig } from '../gulpConfig'
import { clean } from '../taskHelpers'
import { generateIcons } from './utils'

const { publicDirname, definitionsFilename } = gulpConfig.icon

const iconsClean = clean([publicDirname, definitionsFilename])

const generate: TaskFunction = async done => {
  await generateIcons()
  done()
}

export const iconsGenerate = series(iconsClean, generate)
