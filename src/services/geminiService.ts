import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `Bạn là trợ lý AI tài chính cá nhân thông minh của ứng dụng Money AI.
Nhiệm vụ của bạn là giúp người dùng:
- Quản lý thu chi hàng ngày, lập ngân sách
- Phân tích thói quen chi tiêu và đưa ra lời khuyên tiết kiệm
- Giải thích các khái niệm tài chính đơn giản dễ hiểu
- Gợi ý cách đầu tư và tích lũy tài sản an toàn
- Trả lời câu hỏi về giao dịch trong ứng dụng

Hãy trả lời bằng tiếng Việt, thân thiện, ngắn gọn và thực tế.
Nếu câu hỏi không liên quan đến tài chính hoặc ứng dụng, hãy lịch sự hướng người dùng về chủ đề tài chính.
Không đưa ra lời khuyên chuyên sâu về đầu tư chứng khoán cụ thể hay tư vấn pháp lý.`;

let chatSession: ReturnType<ReturnType<typeof genAI.getGenerativeModel>["startChat"]> | null = null;
let genAI: GoogleGenerativeAI;

function getGenAI(): GoogleGenerativeAI {
    if (!genAI) {
        genAI = new GoogleGenerativeAI(API_KEY);
    }
    return genAI;
}

export function initChatSession() {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_PROMPT,
    });

    chatSession = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
        },
    });

    return chatSession;
}

export async function sendMessage(message: string): Promise<string> {
    if (!API_KEY) {
        return "⚠️ Chưa cấu hình API key. Vui lòng thêm `VITE_GEMINI_API_KEY` vào file `.env`.";
    }

    try {
        if (!chatSession) {
            initChatSession();
        }

        const result = await chatSession!.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error: unknown) {
        console.error("Gemini API error:", error);
        if (error instanceof Error && error.message.includes("API_KEY_INVALID")) {
            return "❌ API key không hợp lệ. Vui lòng kiểm tra lại `VITE_GEMINI_API_KEY`.";
        }
        return "😕 Xin lỗi, có lỗi xảy ra khi kết nối AI. Vui lòng thử lại sau.";
    }
}

export function resetChatSession() {
    chatSession = null;
}
