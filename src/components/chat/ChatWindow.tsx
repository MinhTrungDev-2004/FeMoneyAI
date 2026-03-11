import React, { useRef, useEffect } from "react";
import { X, Minimize2, RotateCcw, Bot } from "lucide-react";
import ChatMessage, { type Message } from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
    messages: Message[];
    inputValue: string;
    isLoading: boolean;
    onInputChange: (value: string) => void;
    onSend: () => void;
    onClose: () => void;
    onMinimize: () => void;
    onReset: () => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex gap-2.5 flex-row">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Bot size={14} className="text-orange-500" />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
        </div>
    </div>
);

const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    inputValue,
    isLoading,
    onInputChange,
    onSend,
    onClose,
    onMinimize,
    onReset,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="flex flex-col w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4 fade-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot size={18} className="text-white" />
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold leading-tight">Money AI Assistant</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                            <span className="text-white/80 text-[10px]">Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={onReset}
                        title="Bắt đầu lại"
                        className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    >
                        <RotateCcw size={14} />
                    </button>
                    <button
                        onClick={onMinimize}
                        title="Thu nhỏ"
                        className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    >
                        <Minimize2 size={14} />
                    </button>
                    <button
                        onClick={onClose}
                        title="Đóng"
                        className="w-7 h-7 rounded-lg hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-gray-50/50"
            >
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                            <Bot size={28} className="text-orange-500" />
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold text-sm">Xin chào! 👋</p>
                            <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                Tôi là trợ lý AI tài chính. Hỏi tôi về chi tiêu, tiết kiệm, ngân sách nhé!
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center mt-1">
                            {["💸 Chi tiêu hôm nay", "📊 Lập ngân sách", "💡 Tips tiết kiệm"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => onInputChange(s.replace(/^.{2}\s/, ""))}
                                    className="text-[11px] bg-white border border-orange-200 text-orange-600 rounded-full px-3 py-1 hover:bg-orange-50 transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
            </div>

            {/* Input */}
            <ChatInput
                value={inputValue}
                onChange={onInputChange}
                onSend={onSend}
                disabled={isLoading}
            />
        </div>
    );
};

export default ChatWindow;
