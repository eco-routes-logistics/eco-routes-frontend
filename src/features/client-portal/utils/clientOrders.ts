import type { DeliveryModel, DeliveryType } from '../api/clientAuth';

// Mirrors eco-routes-backend/src/utils/fee.utils.ts calculateDeliveryFee; keep in sync
const BASE_FEE = 500;
const WEIGHT_RATE = 50;
export const DELIVERY_TYPE_MULTIPLIER: Record<DeliveryType, number> = { standard: 1, express: 1.5, same_day: 2 };
export const PREMIUM_MULTIPLIER = 1.5;

export const estimateDeliveryFee = (weightKg: number, type: DeliveryType, model: DeliveryModel) => {
  const subtotal = BASE_FEE + Math.max(0, weightKg) * WEIGHT_RATE;
  return Math.round(subtotal * DELIVERY_TYPE_MULTIPLIER[type] * (model === 'Premium' ? PREMIUM_MULTIPLIER : 1));
};

// The client orders endpoint returns display labels; map them back to raw statuses for StatusBadge and filters
const LABEL_TO_STATUS: Record<string, string> = {
  Pending: 'pending',
  Accepted: 'assigned',
  'Picked Up': 'picked_up',
  'In Transit': 'in_transit',
  Delivered: 'delivered',
  Cancelled: 'cancelled',
};

export const toStatusKey = (label: string) => LABEL_TO_STATUS[label] ?? label.toLowerCase().replace(/\s+/g, '_');

export const isActiveOrder = (label: string) => !['delivered', 'cancelled'].includes(toStatusKey(label));

export const DELIVERY_TYPE_LABELS: Record<string, string> = {
  standard: 'Standard',
  express: 'Express',
  same_day: 'Same day',
};
