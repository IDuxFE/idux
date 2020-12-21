import { task } from 'gulp'
import { buildConfig } from '../buildConfig'
import { cleanTask } from '../util/task-helpers'

task('clean', cleanTask([buildConfig.outputDir, buildConfig.publishDir, buildConfig.siteDir]))

task('clean:site', cleanTask([buildConfig.siteDir]))

task('clean:icons', cleanTask([buildConfig.iconAssetsDir, buildConfig.iconDefinitionsDir]))
