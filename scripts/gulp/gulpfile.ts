import { series, task } from 'gulp'

import { buildCdk, buildComponents, buildDeclaration, buildStyle, buildVersion } from './build'
import { iconsGenerate } from './icons'
import { siteStart, siteBuild } from './site'

task('start', series(siteStart))

task('build', series(buildCdk, buildComponents, buildDeclaration, buildStyle, buildVersion, siteBuild))

task('icons', iconsGenerate)
