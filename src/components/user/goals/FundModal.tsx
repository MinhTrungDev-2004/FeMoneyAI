import React, { useState } from "react";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { type SavingGoal, GOAL_ICONS } from "./goalData";

interface FundModalProps {
    goal: SavingGoal;
    onFund: (amount: number, type: "add" | "withdraw") => void;
    onClose: () => void;
}

const formatNumberInput = (raw: string): string =>
    raw.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const FundModal: React.FC<FundModalProps> = ({ goal, onFund, onClose }) => {
    const [amountStr, setAmountStr] = useState("");
    const [fundType, setFundType] = useState<"add" | "withdraw">("add");
    const [error, setError] = useState("");

    const Icon = GOAL_ICONS[goal.iconName];
    const remaining = goal.targetAmount - goal.currentAmount;

    const handleAction = () => {
        const amount = parseInt(amountStr.replace(/\./g, ""), 10);
        if (!amount || amount <= 0) {
            setError("Vui lòng nhập số tiền hợp lệ.");
            return;
        }

        if (fundType === "withdraw" && amount > goal.currentAmount) {
            setError(`Chỉ có thể rút tối đa ${goal.currentAmount.toLocaleString("vi-VN")}đ`);
            return;
        }

        if (fundType === "add" && amount > remaining) {
             setError(`Chỉ cần nạp thêm tối đa ${remaining.toLocaleString("vi-VN")}đ là đủ mục tiêu`);
             return;
        }

        onFund(amount, fundType);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
             onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${goal.bgClass}`}>
                            {Icon && <Icon size={20} className={goal.colorClass} strokeWidth={2} />}
                        </div>
                        <div>
                             <h2 className="text-sm font-bold text-gray-800">Cập nhật dòng tiền</h2>
                             <p className="text-xs font-semibold text-gray-500 truncate max-w-[180px]">{goal.label}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-colors shadow-sm bg-gray-100">
                        <X size={16} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Toggle Nạp / Rút */}
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                        <button 
                            onClick={() => { setFundType("add"); setError(""); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${fundType === "add" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            <TrendingUp size={16} /> Nạp Thêm
                        </button>
                         <button 
                            onClick={() => { setFundType("withdraw"); setError(""); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${fundType === "withdraw" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            <TrendingDown size={16} /> Rút Bớt
                        </button>
                    </div>

                    {/* Form Nhập */}
                    <div>
                         <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 text-center">
                             Số tiền muốn {fundType === "add" ? "chuyển vào quỹ" : "rút từ quỹ"}
                         </label>
                         <div className="relative">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={amountStr}
                                    onChange={(e) => { setAmountStr(formatNumberInput(e.target.value)); setError(""); }}
                                    placeholder="0"
                                    autoFocus
                                    className={`w-full text-center pl-4 pr-12 py-4 rounded-2xl border-2 text-3xl font-black outline-none transition-all placeholder:font-normal placeholder:text-gray-300
                                        ${fundType === "add" ? "text-green-600 border-green-100 focus:border-green-400 focus:ring-4 focus:ring-green-50" : "text-red-600 border-red-100 focus:border-red-400 focus:ring-4 focus:ring-red-50"}`}
                                />
                                <span className={`absolute right-4 top-1/2 -translate-y-1/2 font-bold text-xl ${fundType === "add" ? "text-green-300" : "text-red-300"}`}>đ</span>
                        </div>
                    </div>
                    
                    {/* Quick Select Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                        {[500000, 1000000, 2000000].map(val => (
                            <button 
                                key={val}
                                onClick={() => { setAmountStr(formatNumberInput(val.toString())); setError(""); }}
                                className="py-2 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                +{(val/1000).toLocaleString('vi-VN')}k
                            </button>
                        ))}
                    </div>

                     {error && <p className="text-xs font-bold text-red-500 bg-red-50 p-2 rounded-lg text-center mt-2 animate-pulse">{error}</p>}
                     {!error && (
                          <p className="text-xs text-center text-gray-500 font-medium">
                            {fundType === "add" 
                                ? `Quỹ hiện tại đang có: ${goal.currentAmount.toLocaleString('vi-VN')}đ` 
                                : `Có thể rút tối đa: ${goal.currentAmount.toLocaleString('vi-VN')}đ`}
                          </p>
                     )}
                </div>

                {/* Submit Action */}
                <div className="p-4 bg-gray-50">
                     <button 
                        onClick={handleAction} 
                        className={`w-full py-4 rounded-xl text-white text-base font-black transition-all shadow-lg active:scale-[0.98]
                            ${fundType === "add" ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-red-500 hover:bg-red-600 shadow-red-200"}`}
                     >
                        {fundType === "add" ? "Xác Nhận Nạp Tiền" : "Xác Nhận Rút Tiền"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FundModal;
