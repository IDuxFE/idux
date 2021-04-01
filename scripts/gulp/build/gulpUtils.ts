import { readdir, statSync, copy, copyFile, readJSON, writeFile } from 'fs-extra'
import { TaskFunction } from 'gulp'
import { join } from 'path'
import { rollup, OutputOptions } from 'rollup'
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

// rollup 打包, 逐个组件
export const buildPackage = (options: Options): TaskFunction => {
  const { targetDirname, distDirname, packageName } = options
  const buildPackage: TaskFunction = async done => {
    const childrenDirs = await readdir(targetDirname)
    const components = childrenDirs.filter(dirname => {
      return !filters.includes(dirname) && statSync(join(targetDirname, dirname)).isDirectory()
    })

    const outputs = components.map(async compName => {
      const { output, ...inputOptions } = getRollupOptions({ targetDirname, distDirname, packageName, compName })
      const bundle = await rollup(inputOptions)
      return await bundle.write(output as OutputOptions)
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
            return await copy(srcDirname, destDirname)
          }),
        )
      }),
    )
    done()
  }

  return moveDeclaration
}

export const buildStyle = (targetDirname: string, distDirname: string): TaskFunction => {
  const buildStyle: TaskFunction = async done => {
    await compileLess(targetDirname, distDirname)
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
      })
    done()
  }
  return syncVersion
}
