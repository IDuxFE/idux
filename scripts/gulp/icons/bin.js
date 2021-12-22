#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

const cwd = process.cwd()

async function init() {
  try {
    const [, , command] = process.argv
    switch (command) {
      case 'icon':
        return copyIconsToPublic()
      default:
        console.log(`Command [${command}] not supported`)
    }
  } catch (err) {
    console.error(err)
  }
}

function copyIconsToPublic() {
  console.log('Copy `@idux/components/icons/inline-icons` to public')

  const publicDirname = path.join(cwd, 'public/inline-icons')
  const iconDirname = path.join(__dirname, './icon/inline-icons')

  copy(iconDirname, publicDirname)
}

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

init().catch(err => console.error(err))
