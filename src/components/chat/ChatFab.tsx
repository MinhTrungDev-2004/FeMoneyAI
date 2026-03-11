import React from "react";
import { Bot, X } from "lucide-react";

interface ChatFabProps {
    isOpen: boolean;
    unreadCount: number;
    onToggle: () => void;
}

const ChatFab: React.FC<ChatFabProps> = ({ isOpen, unreadCount, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            aria-label={isOpen ? "Đóng chat" : "Mở chat AI"}
            className={`relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group
                ${isOpen
                    ? "bg-gradient-to-br from-red-400 to-orange-500 rotate-0 scale-95"
                    : "bg-gradient-to-br from-orange-400 to-red-500 hover:scale-110"
                }`}
        >
            {/* Ping animation when closed */}
            {!isOpen && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-red-500 animate-ping opacity-25" />
            )}

            {/* Icon */}
            <div className={`transition-all duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}>
                {isOpen ? (
                    <X size={22} className="text-white" strokeWidth={2.5} />
                ) : (
                    <Bot size={22} className="text-white" strokeWidth={1.8} />
                )}
            </div>

            {/* Unread badge */}
            {!isOpen && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-emerald-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center px-1 shadow-sm">
                    {unreadCount > 9 ? "9+" : unreadCount}
                </span>
            )}

            {/* Tooltip */}
            {!isOpen && (
                <span className="absolute right-16 bg-gray-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                    Chat với AI 💬
                    <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </span>
            )}
        </button>
    );
};

export default ChatFab;
