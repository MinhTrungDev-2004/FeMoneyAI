import { forwardRef } from "react";
import { FileText, BarChart2 } from "lucide-react";
import PdfSummaryStats from "./PdfSummaryStats";
import PdfCategoryTable, { type CategoryStat } from "./PdfCategoryTable";
import PdfTransactionList, { type Transaction } from "./PdfTransactionList";

interface PdfPreviewCardProps {
    month: number;
    year: number;
    income: number;
    expense: number;
    balance: number;
    expenseCategories: CategoryStat[];
    incomeCategories: CategoryStat[];
    transactions: Transaction[];
    showCategories: boolean;
    showTransactions: boolean;
    transactionFilter: "all" | "expense" | "income";
    userName?: string;
}

const MONTH_NAMES = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

const PdfPreviewCard = forwardRef<HTMLDivElement, PdfPreviewCardProps>(
    (
        {
            month,
            year,
            income,
            expense,
            balance,
            expenseCategories,
            incomeCategories,
            transactions,
            showCategories,
            showTransactions,
            transactionFilter,
            userName = "Người dùng",
        },
        ref
    ) => {
        const filteredTransactions = transactions.filter((tx) => {
            if (transactionFilter === "all") return true;
            return tx.type === transactionFilter;
        });

        const filteredExpense = transactionFilter !== "income" ? expenseCategories : [];
        const filteredIncome = transactionFilter !== "expense" ? incomeCategories : [];

        const printedAt = new Date().toLocaleString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        });

        return (
            <div
                ref={ref}
                id="pdf-preview"
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
                {/* Report Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-white">
                    <div className="flex items-start justify-between">
                        <div className="text-left">
                            <div className="flex items-center gap-2.5 mb-1">
                                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                    <BarChart2 size={18} className="text-white" />
                                </div>
                                <span className="text-white/80 text-sm font-medium">Money AI</span>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                Báo cáo tài chính
                            </h1>
                            <p className="text-white/80 text-sm mt-1">
                                {MONTH_NAMES[month]} năm {year}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-2 ml-auto">
                                <FileText size={24} className="text-white" />
                            </div>
                            <p className="text-white/70 text-xs">Người dùng</p>
                            <p className="text-white font-semibold text-sm">{userName}</p>
                        </div>
                    </div>

                    {/* Meta info bar */}
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/70">
                        <span>Xuất lúc: {printedAt}</span>
                        <span>Hệ thống quản lý tài chính Money AI</span>
                    </div>
                </div>

                {/* Report Body */}
                <div className="px-8 py-6">
                    {/* Summary Stats */}
                    <PdfSummaryStats income={income} expense={expense} balance={balance} />

                    {/* Category Analysis */}
                    {showCategories && (
                        <>
                            {filteredExpense.length > 0 && (
                                <PdfCategoryTable data={filteredExpense} type="expense" />
                            )}
                            {filteredIncome.length > 0 && (
                                <PdfCategoryTable data={filteredIncome} type="income" />
                            )}
                        </>
                    )}

                    {/* Transaction List */}
                    {showTransactions && (
                        <PdfTransactionList transactions={filteredTransactions} />
                    )}

                    {/* Footer note */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs text-gray-300">
                            © {year} Money AI — Báo cáo được tạo tự động
                        </p>
                        <p className="text-xs text-gray-300">
                            {MONTH_NAMES[month]}/{year}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);

PdfPreviewCard.displayName = "PdfPreviewCard";

export default PdfPreviewCard;
