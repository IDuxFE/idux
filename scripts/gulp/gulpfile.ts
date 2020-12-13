import { series, task } from 'gulp'

import './tasks/clean'
import './tasks/site'

task('start:dev', series('clean', 'start:site'))
