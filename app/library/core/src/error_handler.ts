


import { ERROR_ORIGINAL_ERROR } from './errors';

export function wrappedError(message: string, originalError: any): Error {
  const msg =
    `${message} caused by: ${originalError instanceof Error ? originalError.message: originalError }`;
  const error = Error(msg);
  (error as any)[ERROR_ORIGINAL_ERROR] = originalError;
  return error;
}
