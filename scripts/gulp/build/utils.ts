import { join } from 'path'

// import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'
import { copy, copyFile, readJSON, readdir, statSync, writeFile, writeJson } from 'fs-extra'
import { TaskFunction } from 'gulp'
import { OutputOptions, rollup } from 'rollup'

import { filterComponents, mergeExtraAPIs, parseComponentInfo, processAPIs } from './apiParse'
import { compileLess } from './less'
import { getRollupDeclarationOptions, getRollupFullOptions, getRollupSingleOptions } from './rollup'

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
  minify?: boolean
}

const writePackageJson = (distDirname: string, packageName: string, compName: string) => {
  return writeFile(
    join(distDirname, compName, 'package.json'),
    `{
  "name": "@idux/${packageName}/${compName}",
  "main": "./index.js",
  "module": "./index.js",
  "typings": "./index.d.ts",
  "style": "./style/themes/default.css",
  "sideEffects": false
}`,
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
      const { output, ...inputOptions } = getRollupSingleOptions({ targetDirname, distDirname, packageName, compName })
      const bundle = await rollup(inputOptions)
      const outputs = Array.isArray(output) ? output : [output]
      const writes = outputs.map(output => bundle.write(output!))
      await Promise.all(writes)
      return writePackageJson(distDirname, packageName, compName)
    })

    await Promise.all(outputs)
    done()
  }
  return buildPackage
}

// rollup 打包 Index
export const buildIndex = (options: Options): TaskFunction => {
  const buildIndex: TaskFunction = async done => {
    const { output, ...inputOptions } = getRollupSingleOptions(options)
    const bundle = await rollup(inputOptions)
    const outputs = Array.isArray(output) ? output : [output]
    const writes = outputs.map(output => bundle.write(output!))
    await Promise.all(writes)
    done()
  }
  return buildIndex
}

// rollup 打包 Index
export const buildFullIndex = (options: Options): TaskFunction => {
  const buildIndex: TaskFunction = async done => {
    const { output, ...inputOptions } = getRollupFullOptions(options)
    const bundle = await rollup(inputOptions)
    const outputs = Array.isArray(output) ? output : [output]
    const writes = outputs.map(output => bundle.write(output!))
    await Promise.all(writes)
    done()
  }
  return buildIndex
}

export const buildDeclaration = (options: Options): TaskFunction => {
  const buildDeclaration: TaskFunction = async done => {
    const { output, ...inputOptions } = getRollupDeclarationOptions(options)
    const bundle = await rollup(inputOptions)
    await bundle.write(output as OutputOptions)
    done()
  }
  return buildDeclaration
}

// const extractorConfigFileName = 'api-extractor.json'
// const extractorConfigTemplate = `{
//   "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
//   "mainEntryPointFilePath": "./index.d.ts",
//   "dtsRollup": {
//     "enabled": true,
//     "publicTrimmedFilePath": "./index.d.ts",
//   },
//   "apiReport": {
//     "enabled": false
//   },
//   "docModel": {
//     "enabled": false
//   },
//   "tsdocMetadata": {
//     "enabled": false
//   },
//   "compiler": {
//     "skipLibCheck": true
//   },
// }`

// // api-extractor 整理 .d.ts 文件
// const apiExtractorGenerate = async (path: string) => {
//   const extractorConfigPath = join(path, extractorConfigFileName)
//   await writeFile(extractorConfigPath, extractorConfigTemplate)

//   const extractorConfig = await ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
//   const extractorResult = await Extractor.invoke(extractorConfig, { localBuild: false })

//   if (extractorResult.succeeded) {
//     console.log('API Extractor completed successfully')
//   } else {
//     console.error(
//       `API Extractor completed with ${extractorResult.errorCount} errors` +
//         ` and ${extractorResult.warningCount} warnings`,
//     )
//     process.exitCode = 1
//   }
// }

export const moveDeclaration = (declarationDirname: string): TaskFunction => {
  // const filterDirnames = ['_private', 'node_modules', 'style']
  const moveDeclaration: TaskFunction = async done => {
    const declarations = await readdir(declarationDirname)
    await Promise.all(
      declarations.map(async packageName => {
        const packageDirname = join(declarationDirname, packageName)
        const components = await readdir(packageDirname)
        return Promise.all(
          components
            .filter(componentName => componentName !== 'temp.js')
            .map(async componentName => {
              const srcDirname = join(packageDirname, componentName)
              const destDirname = join(declarationDirname, '..', packageName, componentName)
              // // 跳过合并类型声明
              // if (!filterDirnames.includes(componentName) && statSync(srcDirname).isDirectory()) {
              //   await apiExtractorGenerate(srcDirname)
              //   return await copyFile(join(srcDirname, 'index.d.ts'), join(destDirname, 'index.d.ts'))
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

export const copyPackageFiles = (distDirname: string, projectRoot: string, packageRoot: string): TaskFunction => {
  const copyPackageFiles: TaskFunction = async done => {
    const filterPackages = ['site', 'packages']
    const packages = await readdir(distDirname)
    packages
      .filter(packageName => !filterPackages.includes(packageName))
      .map(async packageName => {
        await copyFile(join(projectRoot, packageName, 'package.json'), join(distDirname, packageName, 'package.json'))
        await copyFile(join(projectRoot, packageName, 'types.d.ts'), join(distDirname, packageName, 'types.d.ts'))
        await copyFile(join(packageRoot, 'README.md'), join(distDirname, packageName, 'README.md'))
        await copyFile(join(packageRoot, 'LICENSE'), join(distDirname, packageName, 'LICENSE'))
      })
    done()
  }

  return copyPackageFiles
}

export const syncVersion = (distDirname: string): TaskFunction => {
  const syncVersion: TaskFunction = async done => {
    const filterPackages = ['site', 'packages']
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

export const buildStyle = (targetDirname: string, distDirname: string, packageName: string): TaskFunction => {
  const buildStyle: TaskFunction = async done => {
    await compileLess(targetDirname, distDirname, packageName)
    done()
  }
  return buildStyle
}

export const buildApiJson = (options: Options): TaskFunction => {
  const { distDirname, targetDirname } = options
  const buildApiJson: TaskFunction = async done => {
    const components = filterComponents(await readdir(targetDirname), targetDirname)
    const componentsApi = processAPIs(await Promise.all(components.map(comp => parseComponentInfo(comp))))

    mergeExtraAPIs(componentsApi, join(targetDirname, 'api.extra.json'))
    writeJson(join(distDirname, 'api.json'), componentsApi)

    done()
  }
  return buildApiJson
}
