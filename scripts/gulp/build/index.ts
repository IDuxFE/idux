import { join } from 'path'

import { copy } from 'fs-extra'
import { series } from 'gulp'

import { gulpConfig } from '../gulpConfig'
import { clean } from '../taskHelpers'
import {
  buildDeclaration as _buildDeclaration,
  buildFullIndex as _buildFullIndex,
  buildStyle as _buildStyle,
  buildApiJson,
  buildIndex,
  buildPackage,
  complete,
  copyPackageFiles,
  moveDeclaration,
  syncVersion,
} from './utils'

const { packageRoot, projectRoot, icon } = gulpConfig
const { cdkDirname, componentsDirname, proDirname, distDirname } = gulpConfig.build

export const buildClean = clean(distDirname)

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

export const buildCdk = series(
  buildPackage(cdkOptions),
  buildIndex(cdkOptions),
  buildApiJson(cdkOptions),
  complete('CDK'),
)
export const buildComponents = series(
  buildPackage(componentsOptions),
  async () => {
    await copy(icon.assetsDirname, join(componentsDistDirname, 'icon/assets'))
  },
  buildIndex(componentsOptions),
  buildApiJson(componentsOptions),
  complete('Components'),
)
export const buildPro = series(
  buildPackage(proOptions),
  buildIndex(proOptions),
  buildApiJson(proOptions, true),
  complete('Pro'),
)

const declarationDirname = join(distDirname, 'packages')
export const buildDeclaration = series(
  _buildDeclaration(proOptions),
  moveDeclaration(declarationDirname),
  clean(declarationDirname),
  complete('Declaration'),
)

export const buildStyle = series(
  _buildStyle(cdkDirname, cdkDistDirname, 'cdk'),
  _buildStyle(componentsDirname, componentsDistDirname, 'components'),
  _buildStyle(proDirname, proDistDirname, 'pro'),
  complete('Style'),
)

export const buildVersion = series(
  copyPackageFiles(distDirname, packageRoot, projectRoot),
  syncVersion(distDirname),
  complete('Version'),
)

export const buildFullIndex = series(
  _buildFullIndex(cdkOptions),
  _buildFullIndex({ ...cdkOptions, minify: true }),
  _buildFullIndex(componentsOptions),
  _buildFullIndex({ ...componentsOptions, minify: true }),
  _buildFullIndex(proOptions),
  _buildFullIndex({ ...proOptions, minify: true }),
)
