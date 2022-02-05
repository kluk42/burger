export function firebaseErrMessageHandler(message: string) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Wrong password';
    case 'EMAIL_NOT_FOUND':
      return 'Email not found';
    default:
      return 'Server error has occured. Please try again';
  }
}
