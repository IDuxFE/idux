import { join } from 'path'

import { copy, copyFile, readJSON, readdir, statSync, writeFile } from 'fs-extra'
import { TaskFunction } from 'gulp'
import { OutputOptions, rollup } from 'rollup'

// import { Extractor, ExtractorConfig, ExtractorResult } from '@microsoft/api-extractor'
import { compileLess } from './less'
import { getRollupOptions } from './rollup.config'

export const complete = (taskName: string): TaskFunction => {
  const complete: TaskFunction = done => {
    done()
    console.log(`---- ${taskName} task completed ----`)
  }

  return complete
}

const filters = ['node_modules', 'style']

interface Options {
  targetDirname: string
  distDirname: string
  packageName: string
}

const writePackageJson = (distDirname: string, packageName: string, compName: string) => {
  return writeFile(
    join(distDirname, compName, 'package.json'),
    `{
  "name": "@idux/${packageName}/${compName}",
  "main": "index.js",
  "module": "index.js",
  "typings": "index.d.ts",
  "sideEffects": false
}
`,
  )
}

// rollup 打包, 逐个组件
export const buildPackage = (options: Options): TaskFunction => {
  const { targetDirname, distDirname, packageName } = options
  const buildPackage: TaskFunction = async done => {
    const childrenDirs = await readdir(targetDirname)
    const components: string[] = []
    const dirs = childrenDirs.map(async dirname => {
      if (filters.includes(dirname) || !statSync(join(targetDirname, dirname)).isDirectory()) {
        return
      }
      if (dirname !== '_private') {
        components.push(dirname)
        return
      }
      const privateDirs = await readdir(join(targetDirname, dirname))
      components.push(...privateDirs.map(privateName => `${dirname}/${privateName}`))
    })

    await Promise.all(dirs)

    const outputs = components.map(async compName => {
      const { output, ...inputOptions } = getRollupOptions({ targetDirname, distDirname, packageName, compName })
      const bundle = await rollup(inputOptions)
      await bundle.write(output as OutputOptions)
      return writePackageJson(distDirname, packageName, compName)
    })

    await Promise.all(outputs)
    done()
  }
  return buildPackage
}

// rollup 打包 Index, 同时生成声明文件
export const buildIndex = (options: Options): TaskFunction => {
  const buildIndex: TaskFunction = async done => {
    const { output, ...inputOptions } = getRollupOptions(options)
    const bundle = await rollup(inputOptions)
    await bundle.write(output as OutputOptions)
    done()
    console.log(`Index built successfully`)
  }
  return buildIndex
}

/**
 * TODO: Merge declaration files
 * Error: The expression contains an import() type, which is not yet supported by API Extractor
 * See: https://github.com/microsoft/rushstack/issues/2140, https://github.com/microsoft/rushstack/issues/1050
 */

// const apiExtractor = `{
//   "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
//   "mainEntryPointFilePath": "./index.d.ts",
//   "dtsRollup": {
//     "enabled": true,
//     "publicTrimmedFilePath": "./index.d.ts"
//   },
//   "apiReport": {
//     "enabled": false
//   },
//   "docModel": {
//     "enabled": false
//   }
// }`

// // api-extractor 整理 .d.ts 文件
// const apiExtractorGenerate = async (dirname: string) => {
//   const extractorFileName = 'api-extractor.json'
//   const extractorDirname = join(dirname, extractorFileName)
//   await writeFile(extractorDirname, apiExtractor)

//   const apiExtractorJsonPath = join(extractorDirname)
//   const extractorConfig: ExtractorConfig = await ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath)

//   await remove(extractorDirname)

//   const isExist: boolean = await pathExists(extractorConfig.mainEntryPointFilePath)

//   if (!isExist) {
//     console.error(`API Extractor not find ${dirname} index.d.ts`)
//     return
//   }

//   const extractorResult: ExtractorResult = await Extractor.invoke(extractorConfig, { localBuild: true })

//   if (extractorResult.succeeded) {
//     // 删除多余的文件
//     const distFiles: string[] = await readdir(dirname)
//     distFiles.forEach(async file => {
//       if (!file.includes('index')) {
//         await remove(join(dirname, file))
//       }
//     })
//     console.log('API Extractor completed successfully')
//   } else {
//     console.error(
//       `API Extractor completed with ${extractorResult.errorCount} errors` +
//         ` and ${extractorResult.warningCount} warnings`,
//     )
//   }
// }

export const moveDeclaration = (declarationDirname: string): TaskFunction => {
  const moveDeclaration: TaskFunction = async done => {
    const declarations = await readdir(declarationDirname)

    await Promise.all(
      declarations.map(async packageName => {
        const packageDirname = join(declarationDirname, packageName)
        const components = await readdir(packageDirname)
        return Promise.all(
          components.map(async componentName => {
            const srcDirname = join(packageDirname, componentName)
            const destDirname = join(declarationDirname, '..', packageName, componentName)
            // if (statSync(srcDirname).isDirectory()) {
            //   await apiExtractorGenerate(srcDirname)
            // }
            return await copy(srcDirname, destDirname)
          }),
        )
      }),
    )
    done()
  }

  return moveDeclaration
}

export const buildStyle = (targetDirname: string, distDirname: string, isCdk: boolean): TaskFunction => {
  const buildStyle: TaskFunction = async done => {
    await compileLess(targetDirname, distDirname, isCdk)
    done()
    console.log(`Style built successfully`)
  }
  return buildStyle
}

export const copyPackageFiles = (distDirname: string, projectRoot: string, packageRoot: string): TaskFunction => {
  const copyPackageFiles: TaskFunction = async done => {
    const filterPackages = ['site']
    const packages = await readdir(distDirname)
    packages
      .filter(packageName => !filterPackages.includes(packageName))
      .map(async packageName => {
        await copyFile(join(projectRoot, packageName, 'package.json'), join(distDirname, packageName, 'package.json'))
        await copyFile(join(projectRoot, packageName, 'types.d.ts'), join(distDirname, packageName, 'types.d.ts'))
        await copyFile(join(packageRoot, 'README.md'), join(distDirname, packageName, 'README.md'))
      })
    done()
  }

  return copyPackageFiles
}

export const syncVersion = (distDirname: string): TaskFunction => {
  const syncVersion: TaskFunction = async done => {
    const filterPackages = ['site']
    const packages = await readdir(distDirname)
    packages
      .filter(packageName => !filterPackages.includes(packageName))
      .map(async packageName => {
        const { version } = await readJSON(join(distDirname, packageName, 'package.json'))
        const versionString = `export const version = '${version}'`
        await writeFile(join(distDirname, packageName, 'version/index.js'), versionString)
        const versionDeclarationString = `export declare const version = '${version}'`
        await writeFile(join(distDirname, packageName, 'version/index.d.ts'), versionDeclarationString)
      })
    done()
  }
  return syncVersion
}
