import { readdir, statSync, copy } from 'fs-extra'
import { TaskFunction } from 'gulp'
import { join } from 'path'
import { rollup, OutputOptions } from 'rollup'
import { compileLess } from './less'
import { getRollupOptions } from './rollup.config'

export const complete = (packageName: string): TaskFunction => {
  return done => {
    console.log(`---- ${packageName} built completed ----`)
    done()
  }
}

const filters = ['node_modules', 'dist', 'style']

interface Options {
  targetDirname: string
  distDirname: string
  packageName: string
}

// rollup 打包, 逐个组件
export const buildPackages = (options: Options): TaskFunction => {
  const { targetDirname, distDirname, packageName } = options
  return async done => {
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
    console.log(`${packageName} built successfully`)
  }
}

// rollup 打包 Index, 同时生成声明文件
export const buildPackageIndex = (options: Options): TaskFunction => {
  return async done => {
    const { output, ...inputOptions } = getRollupOptions(options)
    const bundle = await rollup(inputOptions)
    await bundle.write(output as OutputOptions)
    done()
    console.log(`Index built successfully`)
  }
}

export const moveDeclaration = (declarationDirname: string): TaskFunction => {
  return async done => {
    const packagesName = join(declarationDirname, 'packages')
    const packages = await readdir(packagesName)

    await Promise.all(
      packages.map(async packageName => {
        const distDirname = join(declarationDirname, '../packages', packageName, 'dist')
        const packageDirname = join(packagesName, packageName)
        const components = await readdir(packageDirname)
        return Promise.all(
          components.map(async componentName => {
            const srcDirname = join(packageDirname, componentName)
            const destDirname = join(distDirname, componentName)
            return await copy(srcDirname, destDirname)
          }),
        )
      }),
    )
    done()
  }
}

export const buildStyle = (targetDirname: string): TaskFunction => {
  return async done => {
    await compileLess(targetDirname)
    done()
    console.log(`Style built successfully`)
  }
}
