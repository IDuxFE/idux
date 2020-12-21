import { series, task } from 'gulp'

import './tasks/clean'
import './tasks/site'
import './tasks/icons'

task('start:dev', series('clean:site', 'icons:copy', 'site:start'))

task('start:icons', series('clean:icons', 'icons:start'))
