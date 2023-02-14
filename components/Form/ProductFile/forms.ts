import { FormBlock } from '../types'

const productFileForm: FormBlock[] = [
  {
    name: 'Generelt',
    blocks: [{ type: 'textInput', label: 'Navn', remoteProperty: 'name', required: true }],
  },
  {
    name: 'Fil',
    blocks: [{ type: 'file', label: 'Fil', remoteProperty: 'file', meta: { hiddenLabel: true } }],
  },
]

// eslint-disable-next-line import/prefer-default-export
export { productFileForm }
