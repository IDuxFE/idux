import type { DefineComponent } from 'vue'
import type { TooltipProps } from '@idux/components/tooltip'

export interface PopoverProps extends TooltipProps {
  /**
   * content of popover
   */
  content: string
}

export type PopoverComponent = InstanceType<DefineComponent<PopoverProps>>
