import React from "react";
import { Bot, User } from "lucide-react";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === "user";

    const formatTime = (date: Date) =>
        date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

    // Parse basic markdown: **bold**, *italic*, bullet lists, newlines
    const formatContent = (text: string) => {
        return text.split("\n").map((line, i) => {
            // Bullet list
            if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
                return (
                    <li key={i} className="ml-3 list-disc">
                        {parseLine(line.replace(/^[\s\-•]+/, ""))}
                    </li>
                );
            }
            return (
                <p key={i} className={line === "" ? "h-2" : ""}>
                    {parseLine(line)}
                </p>
            );
        });
    };

    const parseLine = (text: string): React.ReactNode => {
        // Bold **text**
        const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("*") && part.endsWith("*")) {
                return <em key={i}>{part.slice(1, -1)}</em>;
            }
            return part;
        });
    };

    return (
        <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${isUser
                        ? "bg-gradient-to-br from-orange-400 to-red-500"
                        : "bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200"
                    }`}
            >
                {isUser ? (
                    <User size={14} className="text-white" />
                ) : (
                    <Bot size={14} className="text-orange-500" />
                )}
            </div>

            {/* Bubble */}
            <div className={`flex flex-col gap-1 max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
                <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${isUser
                            ? "bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-tr-sm"
                            : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"
                        }`}
                >
                    <div className="flex flex-col gap-0.5">{formatContent(message.content)}</div>
                </div>
                <span className="text-[10px] text-gray-400 px-1">{formatTime(message.timestamp)}</span>
            </div>
        </div>
    );
};

export default ChatMessage;
