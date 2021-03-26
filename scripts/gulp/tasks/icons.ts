import { task } from 'gulp'
import { buildConfig } from '../buildConfig'
import { copyToSite, generateIcons } from '../icons'
import { cleanTask } from './taskHelpers'

const { publicDirname, definitionsFilename } = buildConfig.icon

task('icons:clean', cleanTask([publicDirname, definitionsFilename]))

task('icons:generate', async done => {
  await generateIcons()
  done()
})

task('icons:copy', async done => {
  await copyToSite()
  done()
})
