/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Ref, isRef, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export type Precision = 0 | 1 | 2 | 3

export interface Countdown {
  hours: Ref<string>
  minutes: Ref<string>
  seconds: Ref<string>
  milliseconds: Ref<string>
  active: Ref<boolean>
  reset: () => void
}

export interface Options {
  immediate?: boolean
  precision?: Precision | Ref<Precision>
  fps?: number
  onFinish?: () => void
}

export function useCountdown(time: number, options?: Options): Countdown {
  const hours = ref('00')
  const minutes = ref('00')
  const seconds = ref('00')
  const milliseconds = ref('000')
  const active = ref(options?.immediate ?? false)
  let precision = options?.precision ? (isRef(options.precision) ? options.precision.value : options.precision) : 0
  let finished = false
  let startTime = 0
  let remainingTime = time
  let timeoutId: number | null = null

  const setTimeInfo = (timeDiff: number, precision: Precision) => {
    let _timeDiff = timeDiff
    if (precision === 0) {
      _timeDiff += 999
    } else if (precision === 1) {
      _timeDiff += 99
    } else if (precision === 2) {
      _timeDiff += 9
    }
    const _hours = Math.floor(_timeDiff / (1000 * 60 * 60))
      .toString()
      .padStart(2, '0')
    const _minutes = Math.floor((_timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0')
    const _seconds = Math.floor((_timeDiff % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0')
    const _milliseconds = (_timeDiff % 1000).toString().padStart(3, '0').substring(0, precision)
    hours.value = _hours
    minutes.value = _minutes
    seconds.value = _seconds
    milliseconds.value = _milliseconds
  }

  const reset = () => {
    startTime = Date.now()
    remainingTime = time
    if (!active.value) {
      setTimeInfo(time, precision)
    } else if (finished) {
      updateCountDown()
    }
    finished = false
  }

  const updateCountDown = () => {
    const timeDiff = Math.max(remainingTime - (Date.now() - startTime), 0)
    setTimeInfo(timeDiff, precision)
    if (timeDiff === 0) {
      options?.onFinish?.()
      finished = true
      stopTimer()
    } else {
      timeoutId = setTimeout(updateCountDown, options?.fps ?? 1000 / 30)
    }
  }

  const stopTimer = () => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  onMounted(() => {
    watch(
      active,
      value => {
        if (value) {
          startTime = Date.now()
          updateCountDown()
        } else {
          if (startTime !== 0) {
            remainingTime -= Date.now() - startTime
          }
          stopTimer()
        }
      },
      {
        immediate: true,
      },
    )

    if (options && isRef(options.precision)) {
      watch(options.precision, val => {
        precision = val
        if (!active.value) {
          setTimeInfo(time, precision)
        }
      })
    }
  })

  onBeforeUnmount(() => {
    stopTimer()
  })

  setTimeInfo(time, precision)

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
    active,
    reset,
  }
}
