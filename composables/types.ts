export class RequestError extends Error {
  public response?: Response & {
    data?: any
  }

  constructor(message: string, response?: Response, data?: any) {
    super(message)
    this.response = response
    if (this.response) this.response.data = data
  }
}

export type Getter = <T>(url: string, options?: any) => Promise<T>
export type Setter = <T>(url: string, data: any, options?: any) => Promise<T>
