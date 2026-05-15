// Indian Rupee formatting utility
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const parseINR = (value) => {
  return parseFloat(value) || 0;
};

// Currency thresholds for Indian market
export const INR_THRESHOLDS = {
  LOW: 5000,
  MODERATE: 20000,
  HIGH: 50000
};
