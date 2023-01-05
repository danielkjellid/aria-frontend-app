import { ProductStatusEnum, VariantListInternalOutput } from '~~/@types'

import { FormBlock } from '../types'
import { Status } from '~~/composables/useProductStatus'

const productOptionGeneralForm = (statuses: Status[]): FormBlock[] => [
  {
    name: 'Generelt',
    blocks: [
      {
        type: 'select',
        label: 'Status',
        remoteProperty: 'status',
        options: statuses,
        initialValue: ProductStatusEnum.Available.toString(),
        meta: { optionNameProperty: 'name', optionValueProperty: 'value' },
      },
      {
        type: 'numberInput',
        label: 'Pris',
        remoteProperty: 'price',
        meta: { helpText: 'Prisen for dette alternativet.' },
      },
    ],
  },
]

const productOptionSizeForm = (
  disableHeightWidthDepth: boolean,
  disableCircumference: boolean
): FormBlock[] => [
  {
    name: 'Størrelse',
    columns: 3,
    remoteProperty: 'size',
    blocks: [
      {
        type: 'numberInput',
        label: 'Bredde i cm',
        remoteProperty: 'width',
        meta: { disabled: disableHeightWidthDepth },
      },
      {
        type: 'numberInput',
        label: 'Høyde i cm',
        remoteProperty: 'height',
        meta: { disabled: disableHeightWidthDepth },
      },
      {
        type: 'numberInput',
        label: 'Dybde i cm',
        remoteProperty: 'depth',
        meta: { disabled: disableHeightWidthDepth },
      },
      {
        type: 'numberInput',
        label: 'Omkrets i cm',
        remoteProperty: 'circumference',
        meta: {
          colSpan: 3,
          disabled: disableCircumference,
          helpText:
            'Omkrets kan brukes dersom alternativet har en sfærisk form fremfor en kvadratisk en. Feltet kan ikke benyttes når de andre størrelsesfeltene er fylt ut.',
        },
      },
    ],
  },
]

const productOptionVariantForm = (
  variants: Pick<VariantListInternalOutput, 'id' | 'name'>[]
): FormBlock[] => [
  {
    name: 'Variant',
    blocks: [
      {
        type: 'listBoxFilterNumber',
        label: 'Variant',
        remoteProperty: 'variantId',
        options: variants,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'id',
        },
      },
    ],
  },
]

export { productOptionGeneralForm, productOptionSizeForm, productOptionVariantForm }
