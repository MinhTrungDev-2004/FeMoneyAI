import React from "react";

export interface Transaction {
    id: string;
    date: string;
    category: string;
    note: string;
    amount: number;
    type: "income" | "expense";
}

interface PdfTransactionListProps {
    transactions: Transaction[];
}

const PdfTransactionList: React.FC<PdfTransactionListProps> = ({ transactions }) => {
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    };

    return (
        <div className="mb-2">
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-gray-400 rounded-full inline-block" />
                Danh sách giao dịch chi tiết
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                    <div className="col-span-2 text-xs font-semibold text-gray-600">Ngày</div>
                    <div className="col-span-3 text-xs font-semibold text-gray-600">Danh mục</div>
                    <div className="col-span-4 text-xs font-semibold text-gray-600">Ghi chú</div>
                    <div className="col-span-3 text-xs font-semibold text-gray-600 text-right">Số tiền</div>
                </div>

                {/* Rows */}
                {transactions.map((tx, idx) => (
                    <div
                        key={tx.id}
                        className={`grid grid-cols-12 items-center px-4 py-3 ${idx !== transactions.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
                    >
                        <div className="col-span-2">
                            <span className="text-xs text-gray-500 font-medium">{formatDate(tx.date)}</span>
                        </div>
                        <div className="col-span-3">
                            <span className="text-sm text-gray-700 font-medium">{tx.category}</span>
                        </div>
                        <div className="col-span-4">
                            <span className="text-sm text-gray-500 truncate block pr-2">{tx.note || "—"}</span>
                        </div>
                        <div className="col-span-3 text-right">
                            <span className={`text-sm font-bold ${tx.type === "income" ? "text-blue-600" : "text-orange-600"}`}>
                                {tx.type === "income" ? "+" : "-"}
                                {tx.amount.toLocaleString("vi-VN")}đ
                            </span>
                        </div>
                    </div>
                ))}

                {transactions.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-gray-300">
                        Không có giao dịch nào trong khoảng thời gian này
                    </div>
                )}

                {/* Total Row */}
                {transactions.length > 0 && (
                    <div className="grid grid-cols-12 items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="col-span-9">
                            <span className="text-xs font-bold text-gray-600">Tổng cộng ({transactions.length} giao dịch)</span>
                        </div>
                        <div className="col-span-3 text-right">
                            <span className="text-sm font-bold text-gray-800">
                                {transactions
                                    .reduce((acc, tx) => acc + (tx.type === "income" ? tx.amount : -tx.amount), 0)
                                    .toLocaleString("vi-VN")}đ
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfTransactionList;
