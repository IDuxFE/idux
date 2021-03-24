import { task } from 'gulp'
import { buildConfig } from '../buildConfig'
import { cleanTask } from '../util/taskHelpers'

task('clean', cleanTask([buildConfig.outputDir, buildConfig.publishDir]))

task('clean:icons', cleanTask([buildConfig.iconAssetsDir, buildConfig.iconDefinitionsDir]))
