import React, { useRef, useState } from "react";
import { Eye, FileText } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import PdfPreviewCard from "../../../components/user/pdf/PdfPreviewCard";
import PdfExportOptions, { type TransactionFilter } from "../../../components/user/pdf/PdfExportOptions";
import PdfExportButton from "../../../components/user/pdf/PdfExportButton";
import { userNavItems } from "../config";
import type { CategoryStat } from "../../../components/user/pdf/PdfCategoryTable";
import type { Transaction } from "../../../components/user/pdf/PdfTransactionList";

// ─── Mock data (thay bằng API call sau) ─────────────────────────────────────
const MOCK_EXPENSE_CATEGORIES: CategoryStat[] = [
    { label: "Ăn uống", amount: 3500000, percent: 58, color: "#f97316", iconName: "food" },
    { label: "Mua sắm", amount: 1200000, percent: 20, color: "#3b82f6", iconName: "shopping" },
    { label: "Đi lại", amount: 800000, percent: 13, color: "#8b5cf6", iconName: "transport" },
    { label: "Y tế", amount: 500000, percent: 8, color: "#14b8a6", iconName: "health" },
    { label: "Giáo dục", amount: 100000, percent: 1.65, color: "#f59e0b", iconName: "education" },
];

const MOCK_INCOME_CATEGORIES: CategoryStat[] = [
    { label: "Lương", amount: 12000000, percent: 80, color: "#3b82f6", iconName: "income" },
    { label: "Freelance", amount: 3000000, percent: 20, color: "#10b981", iconName: "work" },
];

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: "1", date: "2026-03-01", category: "Ăn uống", note: "Cơm trưa văn phòng", amount: 75000, type: "expense" },
    { id: "2", date: "2026-03-02", category: "Lương", note: "Lương tháng 3", amount: 12000000, type: "income" },
    { id: "3", date: "2026-03-03", category: "Mua sắm", note: "Siêu thị CoopMart", amount: 450000, type: "expense" },
    { id: "4", date: "2026-03-05", category: "Đi lại", note: "Grab đi làm", amount: 85000, type: "expense" },
    { id: "5", date: "2026-03-07", category: "Freelance", note: "Dự án website", amount: 3000000, type: "income" },
    { id: "6", date: "2026-03-09", category: "Ăn uống", note: "Cà phê với bạn bè", amount: 120000, type: "expense" },
    { id: "7", date: "2026-03-10", category: "Y tế", note: "Khám sức khỏe định kỳ", amount: 500000, type: "expense" },
    { id: "8", date: "2026-03-12", category: "Mua sắm", note: "Quần áo mùa mới", amount: 750000, type: "expense" },
    { id: "9", date: "2026-03-15", category: "Ăn uống", note: "Đặt đồ ăn Shopee Food", amount: 180000, type: "expense" },
    { id: "10", date: "2026-03-18", category: "Giáo dục", note: "Khóa học online", amount: 100000, type: "expense" },
];
// ────────────────────────────────────────────────────────────────────────────

const UserExport: React.FC = () => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [showCategories, setShowCategories] = useState(true);
    const [showTransactions, setShowTransactions] = useState(true);
    const [transactionFilter, setTransactionFilter] = useState<TransactionFilter>("all");
    const [isExporting, setIsExporting] = useState(false);

    const previewRef = useRef<HTMLDivElement>(null);

    const totalIncome = MOCK_INCOME_CATEGORIES.reduce((s, c) => s + c.amount, 0);
    const totalExpense = MOCK_EXPENSE_CATEGORIES.reduce((s, c) => s + c.amount, 0);
    const balance = totalIncome - totalExpense;

    const handleExport = () => {
        setIsExporting(true);

        // Thêm CSS print để ẩn sidebar, header, chỉ in preview card
        const style = document.createElement("style");
        style.id = "pdf-print-style";
        style.innerHTML = `
            @media print {
                body * { visibility: hidden !important; }
                #pdf-preview, #pdf-preview * { visibility: visible !important; }
                #pdf-preview {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    border: none !important;
                    border-radius: 0 !important;
                    box-shadow: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            window.print();
            document.getElementById("pdf-print-style")?.remove();
            setIsExporting(false);
        }, 300);
    };

    return (
        <DashboardLayout
            navItems={userNavItems}
            pageTitle="Xuất báo cáo PDF"
            userName="Người dùng"
            brandName="Money AI"
        >


            {/* Main layout: Preview (2/3) + Options (1/3) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                {/* Left: Preview */}
                <div className="xl:col-span-2">
                    <PdfPreviewCard
                        ref={previewRef}
                        month={month}
                        year={year}
                        income={totalIncome}
                        expense={totalExpense}
                        balance={balance}
                        expenseCategories={MOCK_EXPENSE_CATEGORIES}
                        incomeCategories={MOCK_INCOME_CATEGORIES}
                        transactions={MOCK_TRANSACTIONS}
                        showCategories={showCategories}
                        showTransactions={showTransactions}
                        transactionFilter={transactionFilter}
                        userName="Ngô Minh Trung"
                    />
                </div>

                {/* Right: Options */}
                <div className="xl:col-span-1 space-y-4">
                    {/* Options panel */}
                    <PdfExportOptions
                        year={year}
                        month={month}
                        onDateChange={(y, m) => { setYear(y); setMonth(m); }}
                        showCategories={showCategories}
                        onToggleCategories={setShowCategories}
                        showTransactions={showTransactions}
                        onToggleTransactions={setShowTransactions}
                        transactionFilter={transactionFilter}
                        onFilterChange={setTransactionFilter}
                    />

                    {/* Export button */}
                    <PdfExportButton
                        targetId="pdf-preview"
                        fileName={`bao-cao-${String(month + 1).padStart(2, "0")}-${year}`}
                        isLoading={isExporting}
                        onExport={handleExport}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserExport;
