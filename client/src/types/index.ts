export interface ErrorType {
  message(arg0: string, message: any): unknown;
  data: {
    message?: string;
    statusCode?: number;
  };
}
