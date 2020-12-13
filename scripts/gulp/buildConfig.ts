import { join } from 'path'

export interface BuildConfig {
  version: string
  root: string
  docsDir: string
  outputDir: string
  publishDir: string
  libDir: string
  siteDir: string
}

const packageRoot = join(__dirname, '../../packages')
const output = join(__dirname, '../../output')
const docs = join(__dirname, '../../docs')
const site = join(__dirname, '../../site')

export const buildConfig: BuildConfig = {
  version: '0.0.1',
  root: packageRoot,
  outputDir: join(output, 'dist'),
  publishDir: join(output, 'publish'),
  libDir: join(output, 'lib'),
  docsDir: docs,
  siteDir: site,
}
