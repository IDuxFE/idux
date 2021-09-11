/**
 * Describes a strategy that will be used by an popper to handle scroll events while it is open.
 */
export interface ScrollStrategy {
  /** Enable this scroll strategy. */
  enable: () => void

  /** Disable this scroll strategy. */
  disable: () => void
}
