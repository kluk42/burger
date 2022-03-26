export function firebaseErrMessageHandler(message: string) {
  console.log(message);
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Wrong password';
    case 'EMAIL_NOT_FOUND':
      return 'Email not found';
    case 'EMAIL_EXISTS':
      return 'Email exists';
    default:
      return 'Server error has occured. Please try again';
  }
}
