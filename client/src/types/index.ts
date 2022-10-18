export interface ErrorType {
  data?: {
    message?: string;
    statusCode?: number;
  };
  error?: string;
  status: string | number;
}
