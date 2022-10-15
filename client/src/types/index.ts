export interface ErrorType {
  error(arg0: string, error: any): unknown;
  message(arg0: string, message: any): unknown;
  /* data: {
    message?: string;
    statusCode?: number;
  }; */
}
