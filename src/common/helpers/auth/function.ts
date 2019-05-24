export function isPasswordSecureEnough(password: string): boolean {
  if (password.length < 8) {
    return false;
  }
  // TODO add more security criteria
  return true;
}
