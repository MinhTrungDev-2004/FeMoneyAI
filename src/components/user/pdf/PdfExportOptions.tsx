import React from "react";
import { Settings2, LayoutList, Tag, ArrowDownUp } from "lucide-react";
import MonthPicker from "../MonthPicker";

export type TransactionFilter = "all" | "expense" | "income";

interface PdfExportOptionsProps {
    year: number;
    month: number;
    onDateChange: (year: number, month: number) => void;
    showCategories: boolean;
    onToggleCategories: (v: boolean) => void;
    showTransactions: boolean;
    onToggleTransactions: (v: boolean) => void;
    transactionFilter: TransactionFilter;
    onFilterChange: (v: TransactionFilter) => void;
}

interface ToggleRowProps {
    label: string;
    description: string;
    icon: React.ElementType;
    checked: boolean;
    onChange: (v: boolean) => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, icon: Icon, checked, onChange }) => (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-100 last:border-0">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
            <Icon size={15} className="text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 mt-1 ${checked ? "bg-orange-500" : "bg-gray-200"}`}
            aria-checked={checked}
            role="switch"
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
            />
        </button>
    </div>
);

const FILTER_OPTIONS: { value: TransactionFilter; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "expense", label: "Chi tiêu" },
    { value: "income", label: "Thu nhập" },
];

const PdfExportOptions: React.FC<PdfExportOptionsProps> = ({
    year,
    month,
    onDateChange,
    showCategories,
    onToggleCategories,
    showTransactions,
    onToggleTransactions,
    transactionFilter,
    onFilterChange,
}) => {
    return (
        <div className="space-y-4">
            {/* Period selector */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Settings2 size={15} className="text-orange-500" />
                    <p className="text-sm font-bold text-gray-700">Thời gian báo cáo</p>
                </div>
                <MonthPicker
                    year={year}
                    month={month}
                    onChange={onDateChange}
                    variant="default"
                    className="w-full"
                />
            </div>

            {/* Content options */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                    <LayoutList size={15} className="text-orange-500" />
                    <p className="text-sm font-bold text-gray-700">Nội dung báo cáo</p>
                </div>
                <ToggleRow
                    label="Phân tích danh mục"
                    description="Biểu đồ và bảng phân tích chi tiêu theo từng danh mục"
                    icon={Tag}
                    checked={showCategories}
                    onChange={onToggleCategories}
                />
                <ToggleRow
                    label="Danh sách giao dịch"
                    description="Bảng chi tiết toàn bộ giao dịch trong kỳ"
                    icon={LayoutList}
                    checked={showTransactions}
                    onChange={onToggleTransactions}
                />
            </div>

            {/* Transaction filter */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                    <ArrowDownUp size={15} className="text-orange-500" />
                    <p className="text-sm font-bold text-gray-700">Loại giao dịch</p>
                </div>
                <div className="grid grid-cols-3 gap-1.5 bg-gray-100 rounded-lg p-1">
                    {FILTER_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => onFilterChange(opt.value)}
                            className={`py-1.5 rounded-md text-xs font-semibold transition-all ${transactionFilter === opt.value
                                ? "bg-white text-orange-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PdfExportOptions;
