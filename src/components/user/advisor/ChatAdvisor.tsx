import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface ChatMessage {
    id: string;
    sender: 'ai' | 'user';
    text: string;
}

const ChatAdvisor: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            sender: 'ai',
            text: 'Chào bạn! Mình là AI Cố vấn tài chính cá nhân của bạn. Dựa trên dữ liệu thu chi tháng này, bạn cần lời khuyên gì không?',
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Mockup AI response delay
        setTimeout(() => {
            let aiText = "Xin lỗi, mình chưa hiểu ý bạn. Bạn có thể hỏi cụ thể hơn về tiết kiệm, đầu tư hay cắt giảm chi tiêu không?";

            const lowerInput = userMsg.text.toLowerCase();
            if (lowerInput.includes('tiết kiệm') || lowerInput.includes('macbook') || lowerInput.includes('mua')) {
                aiText = "Tuyệt vời! Nếu bạn muốn mua Macbook 40tr vào cuối năm, với mức dư hiện tại (5tr/tháng), bạn cần tiết kiệm thêm 2tr/tháng. Mình gợi ý bạn giảm 15% quỹ Ăn uống và 10% quỹ Mua sắm nhé.";
            } else if (lowerInput.includes('chi tiêu') || lowerInput.includes('tháng này')) {
                aiText = "Tháng này bạn đã tiêu 80% ngân sách rồi. Khoản 'Ăn uống ngoài' đang chiếm tỷ trọng lớn nhất (4.500.000đ). Hãy ưu tiên nấu ăn ở nhà trong 10 ngày cuối tháng nhé!";
            } else if (lowerInput.includes('đầu tư')) {
                aiText = "Bạn đang có khoản dư 20 triệu. Theo nguyên tắc 50-30-20, bạn có thể cân nhắc chia 10tr vào Quỹ mở chứng khoán an toàn, và 10tr gửi tiết kiệm kỳ hạn ngắn để phòng thân.";
            }

            setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: aiText }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[500px] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                    <Bot size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-800 text-left">Cố Vấn AI</h3>
                    <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Đang trực tuyến
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mt-1 
              ${msg.sender === 'ai' ? 'bg-indigo-100 text-indigo-600' : 'bg-orange-100 text-orange-600'}`}
                        >
                            {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                        </div>

                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
              ${msg.sender === 'ai'
                                ? 'bg-white border border-gray-100 text-gray-700'
                                : 'bg-gradient-to-br from-orange-400 to-orange-500 text-white'}`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3 flex-row">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex shrink-0 items-center justify-center mt-1">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-1">
                            <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Hỏi AI cách tiết kiệm mua Macbook..."
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={14} className={input.trim() ? "translate-x-[1px] translate-y-[-1px]" : ""} />
                    </button>
                </div>
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                    {['Tháng này tiêu thế nào?', 'Cách mua Macbook?', 'Nguyên tắc 50-30-20?'].map(s => (
                        <button
                            key={s}
                            onClick={() => setInput(s)}
                            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[11px] text-gray-600 font-medium whitespace-nowrap hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors flex items-center gap-1"
                        >
                            <Sparkles size={10} className="text-indigo-400" />
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatAdvisor;
