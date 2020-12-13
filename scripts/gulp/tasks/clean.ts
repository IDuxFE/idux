import { task } from 'gulp'
import { buildConfig } from '../buildConfig'
import { cleanTask } from '../util/task-helpers'

/** Deletes the dist/ publish/ directory. */
task('clean', cleanTask([buildConfig.outputDir, buildConfig.publishDir]))
