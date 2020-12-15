import { task } from 'gulp'
import { generateIcons } from '../icons'

task('icons:init', async done => {
  await generateIcons()
  done()
})
