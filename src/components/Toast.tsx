import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  title: string;
  desc?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        onDismiss(toasts[0].id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        let icon = 'check_circle';
        let bgClass = 'bg-[#1a1c1d] text-white border-[#50443e]';
        let iconColor = 'text-emerald-400';

        if (toast.type === 'warning') {
          icon = 'warning';
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          icon = 'error';
          iconColor = 'text-rose-400';
        } else if (toast.type === 'info') {
          icon = 'info';
          iconColor = 'text-sky-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border ${bgClass} min-w-[320px] max-w-md animate-in slide-in-from-bottom-3 duration-200`}
          >
            <span className={`material-symbols-outlined text-[22px] ${iconColor}`}>
              {icon}
            </span>
            <div className="flex-1">
              <h4 className="font-headline-sm text-[13px] font-bold leading-tight text-white">
                {toast.title}
              </h4>
              {toast.desc && (
                <p className="font-body-sm text-[12px] text-gray-300 mt-0.5 leading-snug">
                  {toast.desc}
                </p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-white text-[18px] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
