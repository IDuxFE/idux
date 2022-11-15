import { series, task } from 'gulp'

import {
  buildCdk,
  buildClean,
  buildComponents,
  buildDeclaration,
  buildFullIndex,
  buildPro,
  buildStyle,
  buildVersion,
} from './build'
import { iconsGenerate } from './icons'
import { siteBuild, siteBuildPreVersion, siteStart } from './site'

task('start', series(siteStart))

task('build:clean', series(buildClean))

task('build:lib', series(buildCdk, buildComponents, buildPro, buildVersion, buildFullIndex))

task('build:declaration', series(buildDeclaration))

task('build:style', series(buildStyle))

task('build:site', series(siteBuild))

task('build:site-pre-version', series(siteBuildPreVersion))

task('icons', iconsGenerate)
