import { UseFormSetError, FieldValues, Path } from 'react-hook-form';

/**
 * Maps Laravel validation errors back to react-hook-form fields
 */
export function handleValidationError<T extends FieldValues>(
  errors: Record<string, string[]>,
  setError: UseFormSetError<T>
) {
  Object.keys(errors).forEach((key) => {
    setError(key as Path<T>, {
      type: 'server',
      message: errors[key][0],
    });
  });
}

/**
 * Standard Pagination Interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

/**
 * Helper to build pagination query params
 */
export function getPaginationParams(page: number = 1, limit: number = 15) {
  return { page, limit };
}
