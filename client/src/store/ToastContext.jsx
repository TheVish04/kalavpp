import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const success = useCallback((msg) => toast(msg, 'success'), [toast]);
    const error = useCallback((msg) => toast(msg, 'error'), [toast]);
    const info = useCallback((msg) => toast(msg, 'info'), [toast]);

    return (
        <ToastContext.Provider value={{ toast, success, error, info }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in ${
                            t.type === 'error'
                                ? 'bg-red-500/90 text-white'
                                : t.type === 'success'
                                ? 'bg-green-500/90 text-white'
                                : 'bg-[#1e1e1e] border border-white/10 text-white'
                        }`}
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider;
