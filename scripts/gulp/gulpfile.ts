import { series, task } from 'gulp'

import './tasks/clean'
import './tasks/site'
import './tasks/icons'

task('start:dev', series('icons:copy', 'site:start'))

task('start:icons', series('clean:icons', 'icons:start'))

task('build', series('icons:copy', 'site:build'))
