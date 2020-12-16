import { join } from 'path'

export interface BuildConfig {
  version: string
  packageRoot: string
  docsDir: string
  outputDir: string
  publishDir: string
  libDir: string
  siteDir: string
}

const packageRoot = join(__dirname, '../../packages')

const docsDir = join(__dirname, '../../docs')
const siteDir = join(__dirname, '../../site')
const outputRoot = join(__dirname, '../../output')

export const buildConfig: BuildConfig = {
  version: '0.0.1',
  packageRoot,
  docsDir,
  siteDir,
  outputDir: join(outputRoot, 'dist'),
  publishDir: join(outputRoot, 'publish'),
  libDir: join(outputRoot, 'lib'),
}
