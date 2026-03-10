import React, { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import MonthPicker from "../../../components/user/MonthPicker";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { userNavItems } from "../config";

const expenseData = [
    { label: "Ăn uống", amount: 5000000, percent: 100, color: "#f97316" },
];

const DonutChart: React.FC<{ data: typeof expenseData; centerLabel?: string }> = ({ data, centerLabel }) => {
    let cum = 0;
    const segs = data.map(d => { const s = cum; cum += d.percent; return { ...d, start: s }; });
    const gradient = segs.map(s => `${s.color} ${s.start}% ${s.start + s.percent}%`).join(", ");
    return (
        <div className="relative w-56 h-56 mx-auto">
            <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${gradient})` }} />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                    <span className="text-xs text-gray-400">Chi tiêu</span>
                    <span className="text-sm font-bold text-gray-800 mt-0.5">
                        {data.reduce((s, d) => s + d.amount, 0).toLocaleString("vi-VN")}đ
                    </span>
                    {centerLabel && <span className="text-xs text-gray-500 mt-0.5">{centerLabel}</span>}
                </div>
            </div>
        </div>
    );
};

interface UserReportProps {
    defaultPeriod?: "Monthly" | "Yearly";
}

const UserReport: React.FC<UserReportProps> = ({ defaultPeriod = "Monthly" }) => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [activeTab, setActiveTab] = useState("Expense");

    return (
        <DashboardLayout navItems={userNavItems} pageTitle={defaultPeriod === "Yearly" ? "Báo cáo năm" : "Báo cáo tháng"} userName="Người dùng" brandName="Money AI">
            {/* Month nav + summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full mb-6">
                <div className="flex flex-col justify-center bg-white border border-indigo-200 rounded-xl px-4 py-3 text-center transition-colors">
                    <p className="text-xs text-gray-400">Thời gian</p>
                    <div className="mt-0.5 flex justify-center text-indigo-500 w-full">
                        <MonthPicker
                            year={year}
                            month={month}
                            onChange={(y, m) => { setYear(y); setMonth(m); }}
                            variant="unstyled"
                            className="w-full"
                        />
                    </div>
                </div>

                {[
                    { label: "Chi tiêu", value: "-5,000,000đ", color: "text-orange-500", border: "border-orange-200" },
                    { label: "Thu nhập", value: "+15,000,000đ", color: "text-blue-500", border: "border-blue-200" },
                    { label: "Số dư", value: "+10,000,000đ", color: "text-green-500", border: "border-green-200" },
                ].map(s => (
                    <div key={s.label} className={`flex flex-col justify-center bg-white border ${s.border} rounded-xl px-4 py-3 text-center`}>
                        <p className="text-xs text-gray-400">{s.label}</p>
                        <p className={`text-base font-bold ${s.color} mt-0.5`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* 2 columns: Chart | Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Chart */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex border-b border-gray-100">
                        {["Chi tiêu", "Thu nhập"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === tab ? "text-orange-500 border-orange-500" : "text-gray-400 border-transparent hover:text-gray-600"
                                    }`}
                            >{tab}</button>
                        ))}
                    </div>
                    <div className="p-6">
                        <DonutChart data={expenseData} />
                        {/* Legend */}
                        <div className="mt-4 space-y-2">
                            {expenseData.map(d => (
                                <div key={d.label} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                                    <span className="text-sm text-gray-600 flex-1">{d.label}</span>
                                    <span className="text-sm font-semibold text-gray-800">{d.percent}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-700">Chi tiết danh mục</p>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {expenseData.map(item => (
                            <div key={item.label} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                    <UtensilsCrossed size={18} className="text-orange-500" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                                        <span className="text-sm font-bold text-gray-800">{item.amount.toLocaleString("vi-VN")}đ</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full bg-orange-500" style={{ width: `${item.percent}%` }} />
                                        </div>
                                        <span className="text-xs text-gray-400 shrink-0">{item.percent.toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Empty state for other categories */}
                        <div className="px-5 py-6 text-center">
                            <p className="text-sm text-gray-300">Thêm giao dịch để xem báo cáo chi tiết</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserReport;
