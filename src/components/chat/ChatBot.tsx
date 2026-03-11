import React, { useState, useCallback } from "react";
import { sendMessage, resetChatSession } from "../../services/geminiService";
import ChatFab from "./ChatFab";
import ChatWindow from "./ChatWindow";
import { type Message } from "./ChatMessage";

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
        if (!isOpen) {
            setUnreadCount(0);
        }
    };

    const handleMinimize = () => {
        setIsOpen(false);
        setIsMinimized(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsMinimized(false);
    };

    const handleReset = useCallback(() => {
        resetChatSession();
        setMessages([]);
        setInputValue("");
    }, []);

    const handleSend = useCallback(async () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isLoading) return;

        const userMsg: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: trimmed,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            const reply = await sendMessage(trimmed);

            const aiMsg: Message = {
                id: `ai-${Date.now()}`,
                role: "assistant",
                content: reply,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMsg]);

            // Increment unread if window is closed
            if (!isOpen) {
                setUnreadCount((c) => c + 1);
            }
        } catch {
            const errMsg: Message = {
                id: `err-${Date.now()}`,
                role: "assistant",
                content: "😕 Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errMsg]);
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, isLoading, isOpen]);

    return (
        /* Fixed container at bottom-right corner */
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
            {/* Chat Window */}
            {isOpen && !isMinimized && (
                <ChatWindow
                    messages={messages}
                    inputValue={inputValue}
                    isLoading={isLoading}
                    onInputChange={setInputValue}
                    onSend={handleSend}
                    onClose={handleClose}
                    onMinimize={handleMinimize}
                    onReset={handleReset}
                />
            )}

            {/* Floating Action Button */}
            <ChatFab
                isOpen={isOpen && !isMinimized}
                unreadCount={unreadCount}
                onToggle={handleToggle}
            />
        </div>
    );
};

export default ChatBot;
