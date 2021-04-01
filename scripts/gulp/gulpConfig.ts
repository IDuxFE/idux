import { join } from 'path'

const packageRoot = join(__dirname, '../../packages')

const componentsDirname = join(packageRoot, 'components')
const siteDirname = join(packageRoot, 'site')

export const gulpConfig = {
  packageRoot,
  icon: {
    assetsDirname: join(__dirname, 'icons/assets'),
    publicDirname: join(siteDirname, 'public/icon-svg'),
    definitionsFilename: join(componentsDirname, 'icon/src/definitions.ts'),
  },
  site: {
    siteDirname,
    docsDirname: join(siteDirname, 'src/docs'),
    sideNavFilename: join(siteDirname, 'src/sideNav.ts'),
    routerFilename: join(siteDirname, 'src/router.ts'),
  },
  build: {
    cdkDirname: join(packageRoot, 'cdk'),
    componentsDirname: join(packageRoot, 'components'),
    declarationDirname: join(packageRoot, '../dist'),
  },
} as const
