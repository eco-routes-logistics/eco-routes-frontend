import { format as dateFnsFormat, formatDistanceToNow } from 'date-fns';

/**
 * Format currency with proper symbol and locale
 */
export const formatCurrency = (amount: number, currency: 'NGN' | 'GBP' | 'USD' = 'NGN'): string => {
  const symbols = {
    NGN: '₦',
    GBP: '£',
    USD: '$',
  };
  
  const symbol = symbols[currency];
  const formatted = amount.toLocaleString('en-US', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  
  return `${symbol}${formatted}`;
};

/**
 * Format date with custom format string
 */
export const formatDate = (date: string | Date, formatStr = 'MMM dd, yyyy'): string => {
  try {
    return dateFnsFormat(new Date(date), formatStr);
  } catch {
    return 'Invalid date';
  }
};

/**
 * Format date as relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return 'Invalid date';
  }
};

/**
 * Format phone number based on region
 */
export const formatPhone = (phone: string, region: 'NG' | 'GB' | 'US' = 'NG'): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  if (region === 'NG') {
    // Nigeria: +234 XXX XXX XXXX
    if (digits.startsWith('234')) {
      return `+234 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 13)}`;
    }
    if (digits.startsWith('0')) {
      return `+234 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
    }
  } else if (region === 'GB') {
    // UK: +44 XXXX XXXXXX
    if (digits.startsWith('44')) {
      return `+44 ${digits.slice(2, 6)} ${digits.slice(6)}`;
    }
  }
  
  return phone;
};

/**
 * Format file size in human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
