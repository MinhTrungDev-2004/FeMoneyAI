import React from "react";
import { Plus, X } from "lucide-react";
import { type BudgetItem, BUDGET_ICON_MAP } from "./budgetData";

interface BudgetCardProps {
    item: BudgetItem;
    onSetBudget: (item: BudgetItem) => void;
    onDelete: (id: string) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ item, onSetBudget, onDelete }) => {
    const Icon = BUDGET_ICON_MAP[item.iconName];
    const pct = item.budget
        ? Math.min((item.spent / item.budget) * 100, 100)
        : item.spent > 0 ? 100 : 0;
    const isOver = !!item.budget && item.spent > item.budget;
    const remaining = item.budget ? item.budget - item.spent : null;

    return (
        <div 
            onClick={() => onSetBudget(item)}
            className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-orange-300 transition-all duration-200 relative cursor-pointer"
        >
            {/* Delete button (hiện khi hover) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                }}
                title="Xóa"
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center 
                           bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all 
                           opacity-0 group-hover:opacity-100 z-10 shadow-sm scale-95 hover:scale-105"
            >
                <X size={12} strokeWidth={2.5} />
            </button>

            {/* Top row: icon + label + action */}
            <div className="flex items-center gap-3 mb-3 pr-6">
                <div className={`w-10 h-10 rounded-xl ${item.bgClass} flex items-center justify-center shrink-0`}>
                    {Icon && <Icon size={18} className={item.colorClass} strokeWidth={1.5} />}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{item.label}</p>
                    {item.budget ? (
                        <p className="text-xs text-gray-400 mt-0.5">
                            Hạn mức: <span className="font-semibold text-gray-600">{item.budget.toLocaleString("vi-VN")}đ</span>
                        </p>
                    ) : (
                        <p className="text-xs text-gray-300 mt-0.5">Chưa đặt hạn mức</p>
                    )}
                </div>

                {/* Right: remaining or "đặt ngân sách" */}
                {item.budget ? (
                    <div className="text-right shrink-0">
                        <p className={`text-base font-bold leading-none ${isOver ? "text-red-500" : "text-gray-800"}`}>
                            {remaining !== null ? remaining.toLocaleString("vi-VN") : "—"}đ
                        </p>
                        <p className={`text-xs mt-0.5 ${isOver ? "text-red-400" : "text-gray-400"}`}>
                            {isOver ? "Vượt mức" : "còn lại"}
                        </p>
                    </div>
                ) : (
                    <button
                        onClick={() => onSetBudget(item)}
                        className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-semibold shrink-0
                                   bg-orange-50 hover:bg-orange-100 rounded-lg px-2.5 py-1 transition-colors"
                    >
                        <Plus size={12} strokeWidth={2.5} />
                        Đặt hạn mức
                    </button>
                )}
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${
                        isOver ? "bg-red-500" : item.spent > 0 ? item.colorClass.replace("text-", "bg-") : "bg-gray-200"
                    }`}
                    style={{ width: `${pct}%` }}
                />
            </div>

            {/* Footer: spent + percent */}
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                    Đã chi: <span className="font-semibold text-gray-600">{item.spent.toLocaleString("vi-VN")}đ</span>
                </span>
                <span className={`text-xs font-semibold ${isOver ? "text-red-500" : pct > 80 ? "text-orange-500" : "text-gray-400"}`}>
                    {pct.toFixed(0)}%
                </span>
            </div>
        </div>
    );
};

export default BudgetCard;
