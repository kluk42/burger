type FirebaseError = {
  error: {
    code: number;
    errors: {
      domain: string;
      message: string;
      reason: string;
    }[];
    message: string;
  };
};

export function isFirebaseErrorData(data: any): data is FirebaseError {
  return (
    typeof data.error.code === 'number' &&
    data.error.errors.some(
      (error: any) =>
        error !== undefined && typeof error.domain === 'string' && typeof error.reason === 'string'
    ) &&
    typeof data.error.message === 'string'
  );
}
