import { series, task } from 'gulp'

import './tasks/site'
import './tasks/icons'

task('start', series('icons:copy', 'site:init', 'site:serve'))

task('build', series('icons:copy', 'site:init', 'site:build'))

task('icons', series('icons:clean', 'icons:generate'))
