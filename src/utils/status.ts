/**
 * Single source of truth for how backend statuses look in the UI.
 * Keys are the raw values the API returns.
 */

export type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface StatusStyle {
  label: string;
  tone: Tone;
}

export const ORDER_STATUS_STYLES: Record<string, StatusStyle> = {
  pending: { label: 'Pending', tone: 'warning' },
  assigned: { label: 'Assigned', tone: 'info' },
  picked_up: { label: 'Picked up', tone: 'info' },
  in_transit: { label: 'In transit', tone: 'primary' },
  delivered: { label: 'Delivered', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

export const RIDER_STATUS_STYLES: Record<string, StatusStyle> = {
  active: { label: 'Online', tone: 'success' },
  busy: { label: 'On a job', tone: 'warning' },
  inactive: { label: 'Offline', tone: 'neutral' },
  pending: { label: 'Pending approval', tone: 'info' },
  rejected: { label: 'Rejected', tone: 'danger' },
};

export const CLIENT_STATUS_STYLES: Record<string, StatusStyle> = {
  active: { label: 'Active', tone: 'success' },
  inactive: { label: 'Suspended', tone: 'neutral' },
  pending: { label: 'Pending approval', tone: 'warning' },
};

export const STAFF_STATUS_STYLES: Record<string, StatusStyle> = {
  active: { label: 'Active', tone: 'success' },
  inactive: { label: 'Deactivated', tone: 'neutral' },
};

export const TRANSACTION_STATUS_STYLES: Record<string, StatusStyle> = {
  Pending: { label: 'Pending', tone: 'warning' },
  Processed: { label: 'Processed', tone: 'success' },
  Disputed: { label: 'Disputed', tone: 'danger' },
};

export type StatusKind = 'order' | 'rider' | 'client' | 'staff' | 'transaction';

const MAPS: Record<StatusKind, Record<string, StatusStyle>> = {
  order: ORDER_STATUS_STYLES,
  rider: RIDER_STATUS_STYLES,
  client: CLIENT_STATUS_STYLES,
  staff: STAFF_STATUS_STYLES,
  transaction: TRANSACTION_STATUS_STYLES,
};

const humanize = (s: string) => s.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

export const getStatusStyle = (status: string, kind: StatusKind = 'order'): StatusStyle => {
  return MAPS[kind][status] ?? { label: humanize(status), tone: 'neutral' };
};
