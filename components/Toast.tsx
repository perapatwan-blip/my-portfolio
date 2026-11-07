'use client'

import React from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bento-card shadow-2xl border border-zinc-700 bg-zinc-950/95 text-white text-xs font-semibold transform transition-all duration-300 animate-in slide-in-from-bottom-2"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-gold-metallic flex-shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertTriangle className="w-4 h-4 text-crimson-500 flex-shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-gold-amber flex-shrink-0" />
            )}
            <span className="truncate">{toast.message}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
