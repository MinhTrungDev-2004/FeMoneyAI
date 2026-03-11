import React from "react";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface PdfSummaryStatsProps {
    income: number;
    expense: number;
    balance: number;
}

const PdfSummaryStats: React.FC<PdfSummaryStatsProps> = ({ income, expense, balance }) => {
    const stats = [
        {
            label: "Tổng thu nhập",
            value: income,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100",
            icon: TrendingUp,
            iconColor: "text-blue-500",
            prefix: "+",
        },
        {
            label: "Tổng chi tiêu",
            value: expense,
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-100",
            icon: TrendingDown,
            iconColor: "text-orange-500",
            prefix: "-",
        },
        {
            label: "Số dư",
            value: balance,
            color: balance >= 0 ? "text-green-600" : "text-red-500",
            bg: balance >= 0 ? "bg-green-50" : "bg-red-50",
            border: balance >= 0 ? "border-green-100" : "border-red-100",
            icon: Wallet,
            iconColor: balance >= 0 ? "text-green-500" : "text-red-500",
            prefix: balance >= 0 ? "+" : "",
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`${stat.bg} border ${stat.border} rounded-xl p-4 flex flex-col gap-2`}
                >
                    <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm`}>
                            <stat.icon size={14} className={stat.iconColor} strokeWidth={2} />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                    </div>
                    <p className={`text-lg font-bold ${stat.color} leading-none`}>
                        {stat.prefix}{Math.abs(stat.value).toLocaleString("vi-VN")}đ
                    </p>
                </div>
            ))}
        </div>
    );
};

export default PdfSummaryStats;
