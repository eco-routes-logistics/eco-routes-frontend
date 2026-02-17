import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#101622] p-4">
                    <div className="max-w-md w-full bg-white dark:bg-[#1a202c] rounded-2xl shadow-lg p-8 text-center">
                        <div className="size-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl text-red-600 dark:text-red-400">
                                error
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Something went wrong
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
                        </p>

                        {this.state.error && (
                            <details className="text-left mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <summary className="text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer mb-2">
                                    Error Details
                                </summary>
                                <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                                    {this.state.error.message}
                                </pre>
                            </details>
                        )}

                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                            <Button variant="primary" fullWidth onClick={this.handleReset}>
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
