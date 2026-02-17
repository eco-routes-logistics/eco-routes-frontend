export interface Transaction {
  id: string;
  orderId: string;
  clientId: string;
  clientName: string;
  riderId: string;
  riderName: string;
  deliveryModel: 'Standard' | 'Premium'; // Standard = Company Fleet, Premium = Gig/Dropper
  totalFee: number;
  platformCommission: number;
  riderPayout: number; // 0 for Standard (salary), 75% for Premium
  status: 'Pending' | 'Processed' | 'Disputed';
  date: string;
  processedAt?: string;
}

export interface RevenueStats {
  totalRevenue: number;
  standardRevenue: number;
  premiumRevenue: number;
  platformEarnings: number;
  riderPayouts: number; // Premium model payouts
  operationalExpenses: number; // Standard model expenses (estimated)
  netProfit: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
