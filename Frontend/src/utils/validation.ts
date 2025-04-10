/**
 * Form validation utilities
 */

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters
  return password.length >= 8;
};

// Password complexity check (optional)
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 8) {
    return 'weak';
  }
  
  // Check for complexity (numbers, symbols, uppercase, lowercase)
  let score = 0;
  
  // Has uppercase
  if (/[A-Z]/.test(password)) score++;
  
  // Has lowercase
  if (/[a-z]/.test(password)) score++;
  
  // Has numbers
  if (/[0-9]/.test(password)) score++;
  
  // Has special characters
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score >= 3) return 'strong';
  if (score >= 2) return 'medium';
  return 'weak';
};

// Generic required field validation
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Minimum length validation
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

// Maximum length validation
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

// Numeric value validation
export const isNumeric = (value: string): boolean => {
  return /^\d+$/.test(value);
};

// Phone number validation (simple)
export const isPhone = (value: string): boolean => {
  return /^\+?[\d\s()-]{10,15}$/.test(value);
};

// Form validator (generic)
export const validateForm = <T extends Record<string, any>>(
  values: T,
  rules: Record<keyof T, ((value: any) => boolean | string)[]>
): Record<keyof T, string | undefined> => {
  const errors: Partial<Record<keyof T, string | undefined>> = {};
  
  for (const field in rules) {
    const fieldRules = rules[field];
    const value = values[field];
    
    for (const rule of fieldRules) {
      const result = rule(value);
      
      if (typeof result === 'string') {
        errors[field] = result;
        break;
      } else if (result === false) {
        errors[field] = `Invalid ${String(field)}`;
        break;
      }
    }
  }
  
  return errors as Record<keyof T, string | undefined>;
}; 