import {
  CategoryListInternalOutput,
  ColorListInternalOutput,
  ShapeListInternalOutput,
  SupplierListInternalOutput,
} from '~~/@types'

import { FormBlock } from '../types'
import { Status } from '~~/composables/useProductStatus'

interface Attribute {
  name: string
  value: string
}

const productDetailForm = (
  suppliers: Pick<SupplierListInternalOutput, 'id' | 'name'>[],
  statuses: Status[],
  categories: Pick<CategoryListInternalOutput, 'id' | 'displayName'>[],
  colors: Pick<ColorListInternalOutput, 'id' | 'name'>[],
  shapes: Pick<ShapeListInternalOutput, 'id' | 'name'>[],
  rooms: Attribute[],
  materials: Attribute[]
): FormBlock[] => [
  {
    name: 'Generelt',
    blocks: [
      {
        type: 'textInput',
        label: 'Navn',
        remoteProperty: 'name',
        required: true,
        meta: { displayWordCount: true },
      },
      {
        type: 'select',
        label: 'Leverandør',
        remoteProperty: 'supplier',
        required: true,
        options: suppliers,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'id',
          optionInitialValue: 'Velg leverandør...',
        },
      },
      {
        type: 'select',
        label: 'Status',
        initialValue: '3',
        remoteProperty: 'status',
        options: statuses,
        meta: { optionNameProperty: 'name', optionValueProperty: 'value' },
      },
      {
        type: 'editor',
        label: 'Beskrivelse',
        remoteProperty: 'description',
        required: true,
      },
      {
        type: 'action',
        label: 'Slug',
        remoteProperty: 'slug',
        required: true,
      },
    ],
  },
  {
    name: 'Kategorier',
    blocks: [
      {
        type: 'multiselect',
        label: 'Kategorier',
        remoteProperty: 'categories',
        required: true,
        // initialValue: [20, 22],
        options: categories,
        meta: {
          optionNameProperty: 'displayName',
          optionValueProperty: 'id',
          allowMultiple: true,
          helpText: 'Velg alle kategoriene some egner seg til produktet.',
        },
      },
    ],
  },
  {
    name: 'Kommersielt',
    blocks: [
      {
        type: 'checkbox',
        label: 'Kan kjøpes på nett',
        remoteProperty: 'canBePurchasedOnline',
        meta: {
          helpText: 'Kunder kan legge inn bestilling på produktet, og få prouktet sendt hjem.',
        },
      },
      {
        type: 'checkbox',
        label: 'Kan hentes i butikk',
        remoteProperty: 'canBePickedUp',
        meta: {
          helpText: 'Kunder kan legge inn klikk og hent ordre.',
        },
      },
      {
        type: 'checkbox',
        label: 'Vis pris til kunde',
        remoteProperty: 'displayPriceToCustomer',
        meta: {
          helpText: 'Prisen på produktet er tilgjengelig i nettbutikken.',
        },
      },
      {
        type: 'select',
        label: 'Enhet',
        remoteProperty: 'unit',
        required: true,
        initialValue: 'stk',
        options: [
          { name: 'Stk', value: 'stk' },
          { name: 'm2', value: 'm2' },
        ],
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'value',
        },
      },
      {
        type: 'textInput',
        label: 'MVA Sats',
        remoteProperty: 'vatRate',
        required: true,
        initialValue: '0.25',
        meta: {
          helpText: 'Prosentvis sats for MVA i desimalform. E.g. 0.25 for 25%.',
        },
      },
      {
        type: 'textInput',
        label: 'Søkeord',
        remoteProperty: 'searchKeywords',
        meta: {
          helpText:
            'Separer ord med mellomrom. Navn, leverandør og materiale er allerede inkludert.',
        },
      },
    ],
  },
  {
    name: 'Atributter',
    blocks: [
      {
        type: 'multiselect',
        label: 'Farger',
        remoteProperty: 'colors',
        required: true,
        options: colors,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'id',
          allowMultiple: true,
          helpText: 'Velg alle fargene some egner seg til produktet.',
        },
      },
      {
        type: 'multiselect',
        label: 'Fasonger',
        remoteProperty: 'shapes',
        required: true,
        options: shapes,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'id',
          allowMultiple: true,
          helpText: 'Velg alle fasongene some egner seg til produktet.',
        },
      },
      {
        type: 'multiselect',
        label: 'Materialer',
        remoteProperty: 'materials',
        options: materials,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'value',
          allowMultiple: true,
          helpText: 'Velg alle materialene some egner seg til produktet.',
        },
      },
      {
        type: 'multiselect',
        label: 'Rom',
        remoteProperty: 'rooms',
        options: rooms,
        meta: {
          optionNameProperty: 'name',
          optionValueProperty: 'value',
          allowMultiple: true,
          helpText: 'Velg alle rommene some egner seg til produktet.',
        },
      },
      {
        type: 'textInput',
        label: 'Absorberingsevne',
        remoteProperty: 'absorption',
        meta: {
          helpText:
            'Gjelder kun fliser. Flisens absorberingsvene. Verdi i hele prosent - e.g. 0.5 for 0.5%.',
        },
      },
      {
        type: 'checkbox',
        label: 'Tilgjengelig i spesialstørrelser',
        remoteProperty: 'availableInSpecialSizes',
        meta: { helpText: 'Prouktets størrelse kan tilpasses etter kundens behov.' },
      },
    ],
  },
]

const productDetailImageForm: FormBlock[] = [
  {
    name: 'Bilder',
    blocks: [
      {
        type: 'image',
        label: 'Bilder',
        remoteProperty: 'images',
        meta: { hiddenLabel: true, allowMultiple: true, allowSetPrimaryImage: true },
      },
    ],
  },
]

export { productDetailForm, productDetailImageForm }
