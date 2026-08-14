// utils/dateUtils.ts

// تبدیل تاریخ میلادی به شمسی (برای نمایش)
export const toPersianDate = (date: string | Date | null): string => {
  if (!date) return "";
  
  const d = typeof date === "string" ? new Date(date) : date;
  
  const year = d.getFullYear() - 621;
  const month = d.getMonth() + 1;
  const day = d.getDate();
  
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
};

// تبدیل تاریخ شمسی به میلادی (برای ذخیره)
export const toGregorianDate = (persianDate: string): string => {
  if (!persianDate) return "";
  
  // اینجا میتونی از کتابخونه استفاده کنی یا همون شمسی رو ذخیره کنی
  // فعلاً همون شمسی رو برمیگردونیم
  return persianDate;
};

// اعتبارسنجی تاریخ شمسی
export const isValidPersianDate = (date: string): boolean => {
  if (!date) return true; // خالی مجاز
  const pattern = /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  return pattern.test(date);
};