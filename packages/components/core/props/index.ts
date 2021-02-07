import type { AbstractControl } from '@idux/cdk/forms'

import { object } from 'vue-types'
import { PropTypes, withUndefined } from '@idux/cdk/utils'

export const FormControlPropType = withUndefined(PropTypes.oneOfType([PropTypes.string, object<AbstractControl>()]))

export const TitlePropType = withUndefined(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string,
      subTitle: PropTypes.string,
      extra: withUndefined(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
      size: PropTypes.oneOf(['extraLarge', 'large', 'medium', 'small'] as const),
      prefix: PropTypes.string,
    }),
  ]),
)
