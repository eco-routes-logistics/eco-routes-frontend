import { create } from 'zustand';

export type TransactionType = 'credit' | 'debit';

export interface WalletTransaction {
    id: string;
    clientId: string;
    amount: number;
    type: TransactionType;
    description: string;
    date: string;
    status: 'success' | 'pending' | 'failed';
    reference?: string;
}

export interface ClientWallet {
    clientId: string;
    balance: number;
    currency: string;
    monthlyCreditLimit?: number; // For corporate clients
    creditUsed?: number;         // For corporate clients
}

interface WalletState {
    wallets: ClientWallet[];
    transactions: WalletTransaction[];
    getWallet: (clientId: string) => ClientWallet | undefined;
    getClientTransactions: (clientId: string) => WalletTransaction[];
    addTransaction: (tx: Omit<WalletTransaction, 'id' | 'date'>) => void;
}

// Seed Data
const MOCK_WALLETS: ClientWallet[] = [
    {
        clientId: 'CLI-A1B2',
        balance: 45000,
        currency: 'NGN',
    }
];

const MOCK_TRANSACTIONS: WalletTransaction[] = [
    {
        id: 'TXN-001',
        clientId: 'CLI-A1B2',
        amount: 50000,
        type: 'credit',
        description: 'Wallet Top-up via Paystack',
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        status: 'success',
        reference: 'T123456789'
    },
    {
        id: 'TXN-002',
        clientId: 'CLI-A1B2',
        amount: 5000,
        type: 'debit',
        description: 'Order Delivery Fee (ORD-8891)',
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        status: 'success',
    }
];

export const useWalletStore = create<WalletState>((set, get) => ({
    wallets: MOCK_WALLETS,
    transactions: MOCK_TRANSACTIONS,
    
    getWallet: (clientId) => {
        const wallet = get().wallets.find(w => w.clientId === clientId);
        // Auto-create a zero balance wallet if it doesn't exist
        if (!wallet) {
            const newWallet: ClientWallet = { clientId, balance: 0, currency: 'NGN' };
            set(state => ({ wallets: [...state.wallets, newWallet] }));
            return newWallet;
        }
        return wallet;
    },
    
    getClientTransactions: (clientId) => {
        return get().transactions
            .filter(t => t.clientId === clientId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    
    addTransaction: (tx) => {
        set(state => {
            const newTx: WalletTransaction = {
                ...tx,
                id: `TXN-${Date.now()}`,
                date: new Date().toISOString()
            };
            
            // Update wallet balance if transaction is successful
            const updatedWallets = state.wallets.map(w => {
                if (w.clientId === tx.clientId && tx.status === 'success') {
                    const balanceChange = tx.type === 'credit' ? tx.amount : -tx.amount;
                    return { ...w, balance: w.balance + balanceChange };
                }
                return w;
            });
            
            return {
                transactions: [newTx, ...state.transactions],
                wallets: updatedWallets
            };
        });
    }
}));
