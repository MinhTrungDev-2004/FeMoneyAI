import React, { useRef, useEffect, type KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    disabled?: boolean;
    placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
    value,
    onChange,
    onSend,
    disabled = false,
    placeholder = "Nhắn tin với Money AI...",
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }, [value]);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Send on Enter (not Shift+Enter)
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && value.trim()) {
                onSend();
            }
        }
    };

    return (
        <div className="flex items-end gap-2 px-3 py-3 border-t border-gray-100 bg-white">
            <textarea
                ref={textareaRef}
                rows={1}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder={placeholder}
                className="flex-1 resize-none overflow-hidden rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all disabled:opacity-50 leading-relaxed"
            />
            <button
                onClick={onSend}
                disabled={disabled || !value.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
                aria-label="Gửi tin nhắn"
            >
                <Send size={15} strokeWidth={2.2} />
            </button>
        </div>
    );
};

export default ChatInput;
