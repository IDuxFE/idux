import { join } from 'path'

import { series } from 'gulp'

import { gulpConfig } from '../gulpConfig'
import { clean } from '../taskHelpers'
import {
  buildStyle as _buildStyle,
  buildIndex,
  buildPackage,
  complete,
  copyPackageFiles,
  moveDeclaration,
  syncVersion,
} from './gulpUtils'

const { packageRoot, projectRoot } = gulpConfig
const { cdkDirname, componentsDirname, distDirname } = gulpConfig.build

const cdkDistDirname = join(distDirname, 'cdk')
const cdkOptions = {
  targetDirname: cdkDirname,
  distDirname: cdkDistDirname,
  packageName: 'cdk',
}

export const buildCdk = series(clean(cdkDistDirname), buildPackage(cdkOptions), complete('CDK'))

const componentsDistDirname = join(distDirname, 'components')
const componentsOptions = {
  targetDirname: componentsDirname,
  distDirname: componentsDistDirname,
  packageName: 'components',
}

export const buildComponents = series(
  clean(componentsDistDirname),
  buildPackage(componentsOptions),
  buildIndex(componentsOptions),
  complete('Components'),
)

const declarationDirname = join(distDirname, 'packages')
export const buildDeclaration = series(
  moveDeclaration(declarationDirname),
  clean(declarationDirname),
  complete('Declaration'),
)

export const buildStyle = series(
  _buildStyle(cdkDirname, cdkDistDirname, true),
  _buildStyle(componentsDirname, componentsDistDirname, false),
  complete('Style'),
)

export const buildVersion = series(
  copyPackageFiles(distDirname, packageRoot, projectRoot),
  syncVersion(distDirname),
  complete('Version'),
)
