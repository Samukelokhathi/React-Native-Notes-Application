export const validateRegistration = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (!name.trim()) {
    return 'Name is required';
  }

  if (!email.trim()) {
    return 'Email is required';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Enter a valid email address';
  }

  if (password.length < 8) {
    return 'Password must contain at least 8 characters';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return null;
};