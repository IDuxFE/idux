import { object } from 'vue-types'
import { AbstractControl } from '@idux/cdk/forms'
import { PropTypes } from '@idux/cdk/utils'

export const FormControlPropType = PropTypes.oneOfType([PropTypes.string, object<AbstractControl>()])
