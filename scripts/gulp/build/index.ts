import { join } from 'path'

import { copy, copyFile } from 'fs-extra'
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

const { packageRoot, projectRoot, icon } = gulpConfig
const { cdkDirname, componentsDirname, proDirname, distDirname } = gulpConfig.build

const cdkDistDirname = join(distDirname, 'cdk')
const cdkOptions = {
  targetDirname: cdkDirname,
  distDirname: cdkDistDirname,
  packageName: 'cdk',
}

const componentsDistDirname = join(distDirname, 'components')
const componentsOptions = {
  targetDirname: componentsDirname,
  distDirname: componentsDistDirname,
  packageName: 'components',
}

const proDistDirname = join(distDirname, 'pro')
const proOptions = {
  targetDirname: proDirname,
  distDirname: proDistDirname,
  packageName: 'pro',
}

export const buildCdk = series(clean(cdkDistDirname), buildPackage(cdkOptions), buildIndex(cdkOptions), complete('CDK'))
export const buildComponents = series(
  clean(componentsDistDirname),
  buildPackage(componentsOptions),
  async () => {
    await copyFile(join(componentsDirname, 'bin.js'), join(componentsDistDirname, 'bin.js'))
    await copy(icon.assetsDirname, join(componentsDistDirname, 'icon/svg'))
  },
  buildIndex(componentsOptions),
  complete('Components'),
)
export const buildPro = series(clean(proDistDirname), buildPackage(proOptions), buildIndex(proOptions), complete('Pro'))

const declarationDirname = join(distDirname, 'packages')
export const buildDeclaration = series(
  moveDeclaration(declarationDirname),
  clean(declarationDirname),
  complete('Declaration'),
)

export const buildStyle = series(
  _buildStyle(cdkDirname, cdkDistDirname, true),
  _buildStyle(componentsDirname, componentsDistDirname, false),
  _buildStyle(proDirname, proDistDirname, false),
  complete('Style'),
)

export const buildVersion = series(
  copyPackageFiles(distDirname, packageRoot, projectRoot),
  syncVersion(distDirname),
  complete('Version'),
)
