export interface OptionObj {
  nameProperty: string
  valueProperty: string
  options: any[]
}

export interface Option {
  [blockId: string]: OptionObj
}
