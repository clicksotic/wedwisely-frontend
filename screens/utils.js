import { VALIDATION_RULES } from './constants';

/**
 * Validates a single form field based on validation rules
 * @param {string} field - The field name to validate
 * @param {any} value - The value to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (field, value) => {
  const rules = VALIDATION_RULES[field];
  if (!rules) return null;

  // Required field validation
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return rules.message || `${field} is required`;
  }

  // Min length validation
  if (rules.minLength && value && value.length < rules.minLength) {
    return rules.message || `${field} must be at least ${rules.minLength} characters`;
  }

  // Min value validation (for numbers)
  if (rules.min !== undefined && value !== '') {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < rules.min) {
      return rules.message || `${field} must be at least ${rules.min}`;
    }
  }

  // Max value validation (for numbers)
  if (rules.max !== undefined && value !== '') {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue > rules.max) {
      return rules.message || `${field} must be at most ${rules.max}`;
    }
  }

  // Pattern validation (for regex patterns)
  if (rules.pattern && value && !rules.pattern.test(value)) {
    return rules.message || `${field} format is invalid`;
  }

  return null;
};

/**
 * Validates the entire form
 * @param {Object} formData - The form data object
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const validateForm = (formData) => {
  const errors = {};
  
  Object.keys(VALIDATION_RULES).forEach(field => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  // Special validation for confirm password
  if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

/**
 * Formats a phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
};

/**
 * Capitalizes the first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Checks if the device is online
 * @returns {boolean} - True if online, false otherwise
 */
export const isOnline = () => {
  return navigator.onLine !== false;
};

/**
 * Generates a random ID
 * @returns {string} - Random ID string
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}; 