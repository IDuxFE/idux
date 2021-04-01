import { series, task } from 'gulp'

import { buildCdk, buildComponents, buildDeclaration, buildStyle } from './build'
import { iconsGenerate } from './icons'
import { siteStart, siteBuild } from './site'

task('start', series(siteStart))

task('build', series(buildCdk, buildComponents, buildDeclaration, buildStyle, siteBuild))

task('icons', iconsGenerate)
