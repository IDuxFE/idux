import { resolve } from 'path'

import chalk from 'chalk'
import ora from 'ora'

import { getViteNodeRunner } from '../../vite'
;(async () => {
  const spin = ora()
  spin.start(chalk.bold('generating color less variables...\n'))
  const runner = await getViteNodeRunner()

  // execute the file
  await runner.run(resolve(__dirname, './update.ts'))

  // close the vite server
  await runner.destroy()

  spin.succeed(chalk.bold(chalk.green('color less variables generated!')))
})()
