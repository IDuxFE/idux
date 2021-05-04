import { spawn, SpawnOptions } from 'child_process'
import { TaskFunction } from 'gulp'
import { remove } from 'fs-extra'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import resolveBin from 'resolve-bin'

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

export function execNodeTask(binName: string, args: string[], env?: Record<string, unknown>): TaskFunction
export function execNodeTask(
  binName: string,
  executable: string,
  args: string[],
  env?: Record<string, unknown>,
): TaskFunction
export function execNodeTask(
  binName: string,
  executableOrArgs: string | string[],
  argsOrEnv?: string[] | Record<string, unknown>,
  env?: Record<string, unknown>,
): TaskFunction {
  let executable: string
  let args: string[]
  if (Array.isArray(executableOrArgs)) {
    executable = binName
    args = executableOrArgs
    env = argsOrEnv as Record<string, unknown>
  } else {
    executable = executableOrArgs
    args = argsOrEnv as string[]
  }

  return (done: (err?: Error | null) => void) => {
    resolveBin(binName, { executable }, (err: Error, binPath: string) => {
      if (err) {
        done(err)
      } else {
        execTask('node', ['--max_old_space_size=4096', binPath].concat(args || []), env)(done)
      }
    })
  }
}
