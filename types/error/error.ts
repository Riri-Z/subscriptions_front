export interface CustomError extends Error {
  message: string;
  statusCode: number;
}
