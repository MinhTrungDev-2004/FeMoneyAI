import React, { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { BUDGET_ICONS, BUDGET_COLORS, type BudgetItem } from "./budgetData";

type ModalMode = "add" | "set-budget";

interface BudgetModalProps {
    mode: ModalMode;
    /** Truyền vào khi mode = "set-budget" để hiển thị tên danh mục */
    editItem?: BudgetItem | null;
    onSave: (data: Partial<BudgetItem>) => void;
    onClose: () => void;
}

const formatNumberInput = (raw: string): string =>
    raw.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const BudgetModal: React.FC<BudgetModalProps> = ({ mode, editItem, onSave, onClose }) => {
    /* ── State chung ── */
    const [budgetInput, setBudgetInput] = useState(
        editItem?.budget ? editItem.budget.toLocaleString("vi-VN") : ""
    );
    const [error, setError] = useState("");

    /* ── State chỉ dùng khi mode = "add" ── */
    const [label, setLabel] = useState("");
    const [selectedIconName, setSelectedIconName] = useState(BUDGET_ICONS[0].name);
    const [selectedColor, setSelectedColor] = useState(BUDGET_COLORS[0]);

    // Reset khi mở lại modal
    useEffect(() => {
        if (mode === "set-budget" && editItem) {
            setBudgetInput(editItem.budget ? editItem.budget.toLocaleString("vi-VN") : "");
        } else {
            setLabel("");
            setSelectedIconName(BUDGET_ICONS[0].name);
            setSelectedColor(BUDGET_COLORS[0]);
            setBudgetInput("");
        }
        setError("");
    }, [mode, editItem]);

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudgetInput(formatNumberInput(e.target.value));
        setError("");
    };

    const parseBudget = () => parseInt(budgetInput.replace(/\./g, ""), 10);

    const handleSave = () => {
        const amount = parseBudget();

        if (mode === "add") {
            if (!label.trim()) { setError("Vui lòng nhập tên danh mục."); return; }
            if (!amount || amount <= 0) { setError("Vui lòng nhập số tiền ngân sách hợp lệ."); return; }
            onSave({
                label: label.trim(),
                iconName: selectedIconName,
                colorClass: selectedColor.colorClass,
                bgClass: selectedColor.bgClass,
                budget: amount,
                spent: 0,
            });
        } else {
            if (!amount || amount <= 0) { setError("Vui lòng nhập số tiền ngân sách hợp lệ."); return; }
            onSave({ budget: amount });
        }
    };

    const PreviewIcon = BUDGET_ICONS.find(i => i.name === selectedIconName)?.icon;
    const isAdd = mode === "add";
    const title = isAdd ? "Thêm ngân sách mới" : `Đặt ngân sách — ${editItem?.label ?? ""}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-5 max-h-[78vh] overflow-y-auto text-left">
                    {/* ── Chỉ hiện khi mode = add ── */}
                    {isAdd && (
                        <>
                            {/* Preview */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedColor.bgClass}`}>
                                    {PreviewIcon && <PreviewIcon size={22} className={selectedColor.colorClass} strokeWidth={1.5} />}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Xem trước</p>
                                    <p className="text-sm font-bold text-gray-800">{label || "Tên danh mục"}</p>
                                </div>
                            </div>

                            {/* Category name */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                                    Tên danh mục
                                </label>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => { setLabel(e.target.value); setError(""); }}
                                    placeholder="Nhập tên danh mục..."
                                    maxLength={30}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none
                                               focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-gray-300"
                                />
                            </div>

                            {/* Color picker */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                                    Màu sắc
                                </label>
                                <div className="grid grid-cols-8 gap-2">
                                    {BUDGET_COLORS.map((color) => {
                                        const isSelected = selectedColor.colorClass === color.colorClass;
                                        return (
                                            <button
                                                key={color.colorClass}
                                                title={color.label}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer
                                                            ${color.bgClass} ${isSelected ? "ring-2 ring-offset-1 ring-orange-400 scale-110" : "hover:scale-105"}`}
                                            >
                                                <span className={`text-[10px] font-bold ${color.colorClass}`}>
                                                    {isSelected ? <CheckCircle2 size={14} /> : "●"}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Icon picker */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                                    Biểu tượng
                                </label>
                                <div className="grid grid-cols-7 gap-2">
                                    {BUDGET_ICONS.map(({ name, icon: Icon }) => {
                                        const isSelected = selectedIconName === name;
                                        return (
                                            <button
                                                key={name}
                                                title={name}
                                                onClick={() => setSelectedIconName(name)}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer
                                                            ${isSelected
                                                        ? `${selectedColor.bgClass} ring-2 ring-orange-400 scale-110`
                                                        : "bg-gray-50 hover:bg-gray-100 hover:scale-105"}`}
                                            >
                                                <Icon
                                                    size={18}
                                                    className={isSelected ? selectedColor.colorClass : "text-gray-400"}
                                                    strokeWidth={1.5}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ── Budget amount (luôn hiển thị) ── */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                            Hạn mức ngân sách
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={budgetInput}
                                onChange={handleBudgetChange}
                                placeholder="0"
                                className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none
                                           focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-gray-300 font-semibold"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">đ</span>
                        </div>

                        {/* Quick-fill buttons */}
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {[500000, 1000000, 2000000, 5000000].map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => { setBudgetInput(amt.toLocaleString("vi-VN")); setError(""); }}
                                    className="px-3 py-1 rounded-lg bg-orange-50 text-orange-600 text-xs font-semibold hover:bg-orange-100 transition-colors"
                                >
                                    {amt >= 1000000 ? `${amt / 1000000}tr` : `${amt / 1000}k`}
                                </button>
                            ))}
                        </div>

                        {/* Error */}
                        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500
                                   hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95
                                   text-white text-sm font-bold transition-all shadow-sm shadow-orange-100 cursor-pointer"
                    >
                        {isAdd ? "Thêm ngân sách" : "Lưu hạn mức"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BudgetModal;
