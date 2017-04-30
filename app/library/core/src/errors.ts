export const ERROR_ORIGINAL_ERROR = 'ngOriginalError';
export function getOriginalError(error: Error): Error {
  return (error as any)[ERROR_ORIGINAL_ERROR];
}
