import { FormBlock } from '../types'

const variantForm: FormBlock[] = [
  {
    name: 'Generelt',
    blocks: [
      { type: 'textInput', label: 'Navn', remoteProperty: 'name', required: true },
      {
        type: 'checkbox',
        label: 'Er standard variant',
        remoteProperty: 'is_standard',
        meta: {
          helpText:
            'Standard varianter er en variant som ofte er planlagt å tilknyttes en mengde alternativer. Kan f.eks. være en typisk farge eller finish som tilbys på en større del av et leverandørsortiment.',
        },
      },
    ],
  },
  { name: 'Bilde', blocks: [{ type: 'image', label: 'Bilde', remoteProperty: 'file' }] },
]

// eslint-disable-next-line import/prefer-default-export
export { variantForm }
