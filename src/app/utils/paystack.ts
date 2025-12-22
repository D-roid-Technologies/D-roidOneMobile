// Paystack configuration
export const PAYSTACK_PUBLIC_KEY = 'pk_live_d2b967eddda456841f504b85549767fc33cc9fd4';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const generateReference = (): string => {
  const prefix = "PT";
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
