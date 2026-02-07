import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-red-900/20 text-white p-8 font-mono">
                    <h1 className="text-3xl font-bold mb-4">SOMETHING WENT WRONG</h1>
                    <div className="bg-black/50 p-4 rounded border border-red-500 overflow-auto max-h-[60vh]">
                        <p className="text-red-400 font-bold mb-2">{this.state.error && this.state.error.toString()}</p>
                        <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
