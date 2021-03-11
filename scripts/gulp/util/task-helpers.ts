/* eslint-disable @typescript-eslint/ban-ts-comment */
import _childProcess from 'child_process'
import gulp from 'gulp'

// @ts-ignore
import gulpClean from 'gulp-clean'
// @ts-ignore
import resolveBin from 'resolve-bin'

export function cleanTask(glob: string | string[]): gulp.TaskFunction {
  return () => gulp.src(glob, { read: false, allowEmpty: true }).pipe(gulpClean(null))
}

export function execTask(binPath: string, args: string[], env = {}): gulp.TaskFunction {
  return (done: (err?: Error | null) => void) => {
    const childProcess = _childProcess.spawn(binPath, args, {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit',
    })

    childProcess.on('close', (code: number) => {
      code != 0 ? done(new Error(`Process failed with code ${code}`)) : done()
    })
  }
}

export function execNodeTask(
  packageName: string,
  executable: string | string[],
  args?: string[],
  env = {},
): gulp.TaskFunction {
  if (!args) {
    args = executable as string[]
    executable = ''
  }

  return (done: (err?: Error | null) => void) => {
    resolveBin(packageName, { executable: executable }, (err: Error, binPath: string) => {
      if (err) {
        done(err)
      } else {
        execTask('node', ['--max_old_space_size=10240', binPath].concat(args || []), env)(done)
      }
    })
  }
}
