import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '@/lib/queryClient';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'rgb(var(--color-text-primary))',
                            color: 'rgb(var(--color-surface-raised))',
                            borderRadius: '14px',
                            fontWeight: 600,
                            fontSize: '14px',
                        },
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: 'rgb(var(--color-success))',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            duration: 5000,
                            iconTheme: {
                                primary: 'rgb(var(--color-danger))',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
