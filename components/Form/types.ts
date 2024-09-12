export interface BlockMeta {
  optionNameProperty?: string
  optionValueProperty?: string
  optionInitialValue?: string
  allowMultiple?: boolean
  allowSetPrimaryImage?: boolean
  allowSetFilterImage?: boolean
  displayWordCount?: boolean
  hiddenLabel?: boolean
  disabled?: boolean
  helpText?: string
  placeholder?: string
  colSpan?: number
}

export interface Block {
  type:
    | 'textInput'
    | 'numberInput'
    | 'checkbox'
    | 'select'
    | 'multiselect'
    | 'listBoxFilter'
    | 'listBoxFilterNumber'
    | 'editor'
    | 'action'
    | 'image'
    | 'file'
  label: string
  remoteProperty: string // Remote property must match whatever the api endpoint expects the value to be named.
  required?: boolean
  initialValue?: any | any[]

  options?: any[]

  meta?: BlockMeta
}

export interface FormBlock {
  name: string
  remoteProperty?: string
  columns?: number
  blocks: Block[]
}
