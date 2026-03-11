import React from "react";
import { Target, AlertTriangle } from "lucide-react";
import { type BudgetItem } from "./budgetData";

interface BudgetOverviewCardProps {
    items: BudgetItem[];
    month: number;
    year: number;
}

const BudgetOverviewCard: React.FC<BudgetOverviewCardProps> = ({ items, month, year }) => {
    const totalBudget = items.reduce((s, b) => s + (b.budget ?? 0), 0);
    const totalSpent = items.reduce((s, b) => s + b.spent, 0);
    const remaining = totalBudget - totalSpent;
    const pct = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
    const isOver = totalBudget > 0 && totalSpent > totalBudget;
    const hasNoBudget = totalBudget === 0;
    const monthLabel = `Tháng ${String(month + 1).padStart(2, "0")}/${year}`;

    const getBarColor = () => {
        if (isOver) return "bg-red-500";
        if (pct >= 80) return "bg-orange-500";
        return "bg-green-500";
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex items-start justify-between mb-4">
                {/* Left: title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                        <Target size={20} className="text-orange-500" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-800">Tổng ngân sách tháng</p>
                        <p className="text-xs text-gray-400">{monthLabel}</p>
                    </div>
                </div>

                {/* Right: numbers */}
                {hasNoBudget ? (
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Chưa đặt ngân sách</p>
                        <p className="text-lg font-bold text-gray-300">—</p>
                    </div>
                ) : (
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Đã chi / Hạn mức</p>
                        <p className="text-lg font-bold text-gray-800 leading-none mt-0.5">
                            <span className={isOver ? "text-red-500" : "text-orange-500"}>
                                {totalSpent.toLocaleString("vi-VN")}
                            </span>
                            <span className="text-gray-300 text-base font-normal mx-1">/</span>
                            <span className="text-sm font-semibold text-gray-500">
                                {totalBudget.toLocaleString("vi-VN")}đ
                            </span>
                        </p>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor()}`}
                    style={{ width: hasNoBudget ? "0%" : `${pct}%` }}
                />
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between mt-2.5">
                <span className="text-xs text-gray-400">
                    {hasNoBudget ? "Hãy đặt hạn mức cho các danh mục" : `${pct.toFixed(0)}% đã sử dụng`}
                </span>
                {!hasNoBudget && (
                    <span className={`text-xs font-bold flex items-center gap-1 ${isOver ? "text-red-500" : remaining < totalBudget * 0.2 ? "text-orange-500" : "text-green-600"}`}>
                        {isOver && <AlertTriangle size={11} />}
                        {isOver
                            ? `Vượt ${Math.abs(remaining).toLocaleString("vi-VN")}đ`
                            : `Còn lại: ${remaining.toLocaleString("vi-VN")}đ`}
                    </span>
                )}
            </div>

            {/* Stats row: số danh mục có budget, số chưa đặt */}
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                {[
                    { label: "Danh mục có ngân sách", value: items.filter(b => b.budget).length, color: "text-green-600" },
                    { label: "Chưa đặt hạn mức",     value: items.filter(b => !b.budget).length, color: "text-gray-400" },
                    { label: "Vượt ngân sách",         value: items.filter(b => b.budget && b.spent > b.budget).length, color: "text-red-500" },
                ].map(stat => (
                    <div key={stat.label} className="flex-1 text-center">
                        <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-tight">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BudgetOverviewCard;
