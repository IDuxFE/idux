import { spawn, SpawnOptions } from 'child_process'
import { TaskFunction } from 'gulp'
import { remove } from 'fs-extra'

export function clean(glob: string | string[]): TaskFunction {
  const clean: TaskFunction = async done => {
    const globs = Array.isArray(glob) ? glob : [glob]
    await Promise.all(globs.map(path => remove(path)))
    done()
  }
  return clean
}

export function execTask(binPath: string, args: string[], env = {}): TaskFunction {
  return done => {
    const options: SpawnOptions = {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit',
    }

    spawn(binPath, args, options).on('close', code => {
      done(code !== 0 ? new Error(`Process failed with code ${code}`) : null)
    })
  }
}

export function execNodeTask(binName: string, args: string[] = [], env = {}): TaskFunction {
  const binPath = `../../node_modules/.bin/${binName}`
  return done => execTask('node', ['--max_old_space_size=4096', binPath].concat(args), env)(done)
}
