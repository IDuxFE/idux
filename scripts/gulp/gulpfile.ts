import { series, task } from 'gulp'

import { buildCdk, buildComponents, buildDeclaration, buildPro, buildStyle, buildVersion } from './build'
import { iconsGenerate } from './icons'
import { siteBuild, siteStart } from './site'

task('start', series(siteStart))

task('build', series(buildCdk, buildComponents, buildPro, buildDeclaration, buildStyle, buildVersion, siteBuild))

task('icons', iconsGenerate)
