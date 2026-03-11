import React from "react";
import { AlertCircle, X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = "Xác nhận",
    cancelText = "Hủy",
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onCancel();
            }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle size={18} strokeWidth={2.5} />
                        <h2 className="text-base font-bold">{title}</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-5 py-5 text-sm text-gray-600 leading-relaxed text-center">
                    {message}
                </div>

                {/* Footer buttons */}
                <div className="px-5 py-4 bg-gray-50 flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600
                                   hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onCancel();
                        }}
                        className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 active:scale-95
                                   text-white text-sm font-bold transition-all shadow-sm shadow-red-100 cursor-pointer"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
