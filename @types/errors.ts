interface ApiErrorExtra {
  [x: string]: string
}

export interface ApiError {
  message: string
  extra?: ApiErrorExtra
}
