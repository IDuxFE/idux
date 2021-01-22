import { join } from 'path'

const packageRoot = join(__dirname, '../../packages')

const docsDir = join(__dirname, '../../docs')
const siteDir = join(__dirname, '../../site')
const outputRoot = join(__dirname, '../../output')

export const buildConfig = {
  version: '0.0.1',
  packageRoot,
  docsDir,
  site: {
    dir: siteDir,
    iconAssetsDir: join(siteDir, '../public/icon-svg'),
    navConfigFilename: join(siteDir, './docs/sideNav.ts'),
    routerFilename: join(siteDir, './docs/router.ts'),
  },

  outputDir: join(outputRoot, 'dist'),
  publishDir: join(outputRoot, 'publish'),
  libDir: join(outputRoot, 'lib'),
  iconAssetsDir: join(__dirname, 'icons/assets'),
  iconDefinitionsDir: join(packageRoot, 'components/icon/definitions'),
}
