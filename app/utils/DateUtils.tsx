// utils/dateUtils.ts

// Convert Gregorian date to Persian (Jalali) for display
export const toPersianDate = (date: string | Date | null): string => {
  if (!date) return "";
  
  const d = typeof date === "string" ? new Date(date) : date;
  
  const year = d.getFullYear() - 621;
  const month = d.getMonth() + 1;
  const day = d.getDate();
  
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
};

// Convert Persian (Jalali) date to Gregorian for storage
export const toGregorianDate = (persianDate: string): string => {
  if (!persianDate) return "";
  
  // You can use a library here, or just store the Persian date as-is
  // For now, we just return the Persian date
  return persianDate;
};

// Validate Persian date format
export const isValidPersianDate = (date: string): boolean => {
  if (!date) return true; // empty is allowed
  const pattern = /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  return pattern.test(date);
};