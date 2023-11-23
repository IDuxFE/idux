// @ts-nocheck

import { readFileSync } from 'fs'
import { resolve } from 'path'

import * as ts from 'typescript'


const tsConfig = readFileSync(resolve(__dirname, '../../tsconfig.json'), 'utf-8')
const typeFile = resolve(__dirname, '../../packages/components/theme/src/types/designTokens/index.ts')

// 读取类型定义文件
const program = ts.createProgram([typeFile], JSON.parse(tsConfig))
const sourceFile = program.getSourceFile(typeFile)

// 获取类型定义
const typeChecker = program.getTypeChecker()

const typeStatement = sourceFile?.statements.find(statement => ts.isInterfaceDeclaration(statement) && statement.name.text === 'DesignTokens')
const symbol = typeChecker.getSymbolAtLocation((typeStatement as ts.InterfaceDeclaration)!.name)

const type = typeChecker.getDeclaredTypeOfSymbol(symbol!)

// 生成 JSON 结构
const json = generateJsonFromType(type)

console.log(json)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateJsonFromType(type: ts.Type): any {
  if (type.isUnion()) {
    // 如果是联合类型，则递归处理每个类型
    const types = type.types.map(t => generateJsonFromType(t))
    return types
  } else if (type.isIntersection()) {
    // 如果是交叉类型，则递归处理每个类型，并将结果合并
    const types = type.types.map(t => generateJsonFromType(t))
    return Object.assign({}, ...types)
  } else if (type.isClassOrInterface()) {
    // 如果是对象类型，则递归处理每个属性
    const properties = type.getProperties()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {}
    properties.forEach(p => {
      obj[p.name] = generateJsonFromType(typeChecker.getTypeOfSymbolAtLocation(p, sourceFile!))
    })
    return obj
  }

  return {}
}
