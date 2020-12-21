import { task } from 'gulp'
import { copyToSite, generateIcons } from '../icons'

task('icons:start', async done => {
  await generateIcons()
  done()
})

task('icons:copy', async done => {
  copyToSite()
  done()
})
