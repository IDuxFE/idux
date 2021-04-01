import { series } from 'gulp'
import { join } from 'path'
import { gulpConfig } from '../gulpConfig'
import { clean } from '../taskHelpers'
import { buildPackages, buildPackageIndex, buildStyle as _buildStyle, complete, moveDeclaration } from './gulpUtils'

const { cdkDirname, componentsDirname, declarationDirname } = gulpConfig.build

const cdkDistDirname = join(cdkDirname, 'dist')
const cdkOptions = {
  targetDirname: cdkDirname,
  distDirname: cdkDistDirname,
  packageName: 'cdk',
}

export const buildCdk = series(clean(join(cdkDirname, 'dist')), buildPackages(cdkOptions), complete('Cdk'))

const componentsDistDirname = join(componentsDirname, 'dist')
const componentsOptions = {
  targetDirname: componentsDirname,
  distDirname: componentsDistDirname,
  packageName: 'components',
}

export const buildComponents = series(
  clean([componentsDistDirname, declarationDirname]),
  buildPackages(componentsOptions),
  buildPackageIndex(componentsOptions),
  complete('Components'),
)

export const buildDeclaration = series(
  moveDeclaration(declarationDirname),
  clean(declarationDirname),
  complete('Declaration'),
)

export const buildStyle = series(_buildStyle(componentsDirname), complete('Style'))
