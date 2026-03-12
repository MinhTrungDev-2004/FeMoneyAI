import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { userNavItems } from '../config';
import { Sparkles, BrainCircuit } from 'lucide-react';

import InsightCard, { type AIInsight } from '../../../components/user/advisor/InsightCard';
import ChatAdvisor from '../../../components/user/advisor/ChatAdvisor';

const MOCK_INSIGHTS: AIInsight[] = [
    {
        id: 'ins1',
        type: 'warning',
        title: 'Nguy cơ thâm hụt ngân sách "Ăn uống"',
        description: 'Tháng này bạn đã dùng 90% ngân sách Ăn uống (4.500.000 / 5.000.000đ) trong khi mới qua nửa tháng. AI khuyên bạn nên tự nấu ăn ở nhà trong 2 tuần tới.',
        actionText: 'Điều chỉnh ngân sách ngay'
    },
    {
        id: 'ins2',
        type: 'suggestion',
        title: 'Đề xuất tăng tiết kiệm',
        description: 'Thu nhập tháng 10 của bạn tăng 15% so với tháng trước nhờ khoản thưởng. Bạn nên trích 50% số tiền tăng thêm này vào Quỹ Khẩn Cấp thay vì chi tiêu.',
        actionText: 'Tạo khoản tiết kiệm mới'
    },
    {
        id: 'ins3',
        type: 'success',
        title: 'Quản lý tốt danh mục "Đi lại"',
        description: 'Chi phí di chuyển tháng này giảm 20% so với trung bình quý trước. Việc chuyển sang đi xe buýt đã bắt đầu phát huy hiệu quả tốt!',
    },
];

const AiAdvisor: React.FC = () => {
    return (
        <DashboardLayout navItems={userNavItems} pageTitle="Cố Vấn AI" userName="Người dùng" brandName="Money AI">

            {/* Header giới thiệu */}
            <div className="mb-6 mt-2">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                        <BrainCircuit size={25} />
                    </div>
                    <div>
                        <h2 className="text-1xl font-bold text-gray-800 text-left">Cố Vấn Tài Chính AI</h2>
                        <p className="text-gray-500 text-sm">Phân tích hành vi chi tiêu và đưa ra chiến lược tối ưu túi tiền của bạn.</p>
                    </div>
                </div>
            </div>

            <div className="w-full py-4">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Cột trái: AI Insights (Cảnh báo & Lời khuyên) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                    <Sparkles size={18} className="text-orange-500" />
                                    Phân Tích Thông Minh
                                </h3>
                                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">Tháng 10</span>
                            </div>

                            <div className="space-y-1">
                                {MOCK_INSIGHTS.map(insight => (
                                    <InsightCard
                                        key={insight.id}
                                        insight={insight}
                                        onActionClick={(id: string) => console.log('Action clicked', id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Banner nhỏ */}
                        <div className="bg-gradient-to-r from-indigo-500 flex items-center justify-between rounded-xl p-4 shadow-sm relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Mục tiêu mua Macbook (40tr)</h4>
                                <p className="text-xs text-indigo-100 mb-2">Đã đạt 65% tiến độ</p>
                                <div className="w-full h-1.5 bg-indigo-900/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full w-[65%] shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"></div>
                                </div>
                            </div>
                            <img src="https://finance.com/img" alt="" className="absolute right-0 bottom-0 opacity-10 blur-sm mix-blend-overlay w-24 object-cover" />
                        </div>
                    </div>

                    {/* Cột phải: Chat AI Advisor */}
                    <div className="lg:col-span-7">
                        <ChatAdvisor />
                    </div>

                </div>
            </div>

        </DashboardLayout>
    );
};

export default AiAdvisor;
