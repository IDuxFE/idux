import type { DefineComponent } from 'vue'
import type { ResultStatus } from '@idux/components/config'

export interface ResultProps {
  /* the name of `ix-icon` to replace the default icon. */
  icon?: string
  /**
   * the status of result.
   * It has different color of text and icon.
   */
  status?: ResultStatus
  /**
   * the subtitle of result.
   * you can use slot.
   * slot has higher level than prop.
   */
  subtitle?: string
  /**
   * the title of result.
   * you can use slot.
   * slot has higher level than prop.
   */
  title?: string
}

export type ResultComponent = InstanceType<DefineComponent<ResultProps>>
