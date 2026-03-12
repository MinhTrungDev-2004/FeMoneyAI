import React, { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { GOAL_ICONS, type SavingGoal } from "./goalData";
import { BUDGET_COLORS } from "../budget/budgetData"; // Tái sử dụng bảng màu từ Budget

type ModalMode = "add" | "edit";

interface GoalModalProps {
    mode: ModalMode;
    editItem?: SavingGoal | null;
    onSave: (data: Partial<SavingGoal>) => void;
    onClose: () => void;
}

const formatNumberInput = (raw: string): string =>
    raw.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const GOAL_ICON_LIST = Object.entries(GOAL_ICONS).map(([name, icon]) => ({ name, icon }));

const GoalModal: React.FC<GoalModalProps> = ({ mode, editItem, onSave, onClose }) => {
    const isAdd = mode === "add";

    const [label, setLabel] = useState(editItem?.label || "");
    const [targetInput, setTargetInput] = useState(editItem?.targetAmount ? editItem.targetAmount.toLocaleString("vi-VN") : "");
    const [deadline, setDeadline] = useState(editItem?.deadline || "");
    const [selectedIconName, setSelectedIconName] = useState(editItem?.iconName || GOAL_ICON_LIST[0].name);

    // Tìm màu đang chọn dựa vào class
    const initialColor = editItem
        ? BUDGET_COLORS.find(c => c.colorClass === editItem.colorClass) || BUDGET_COLORS[0]
        : BUDGET_COLORS[0];
    const [selectedColor, setSelectedColor] = useState(initialColor);

    const [error, setError] = useState("");

    // Reset Form
    useEffect(() => {
        if (!editItem && isAdd) {
            setLabel("");
            setTargetInput("");
            setDeadline("");
            setSelectedIconName(GOAL_ICON_LIST[0].name);
            setSelectedColor(BUDGET_COLORS[0]);
        }
        setError("");
    }, [mode, editItem, isAdd]);

    const handleSave = () => {
        const targetAmount = parseInt(targetInput.replace(/\./g, ""), 10);

        if (!label.trim()) { setError("Vui lòng nhập tên mục tiêu."); return; }
        if (!targetAmount || targetAmount <= 0) { setError("Vui lòng nhập số tiền mục tiêu hợp lệ."); return; }

        // Validate deadline logic (Option)
        if (deadline) {
            const today = new Date().toISOString().split('T')[0];
            if (deadline < today) {
                setError("Ngày mục tiêu không được trong quá khứ."); return;
            }
        }

        onSave({
            label: label.trim(),
            targetAmount,
            deadline: deadline || undefined,
            iconName: selectedIconName,
            colorClass: selectedColor.colorClass,
            bgClass: selectedColor.bgClass,
            currentAmount: editItem?.currentAmount || 0, // Giữ nguyên phân tích cũ nếu là edit
        });
    };

    const PreviewIcon = GOAL_ICONS[selectedIconName];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-800">
                        {isAdd ? "Tạo Mục Tiêu Tiết Kiệm" : "Chỉnh sửa mục tiêu"}
                    </h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">
                    {/* Preview */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${selectedColor.bgClass}`}>
                            {PreviewIcon && <PreviewIcon size={22} className={selectedColor.colorClass} strokeWidth={1.5} />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800 leading-tight block truncate max-w-[220px]">
                                {label || "Tên mục tiêu của bạn"}
                            </p>
                        </div>
                    </div>

                    {/* Tên & Số tiền */}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 text-left">Tên mục tiêu</label>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => { setLabel(e.target.value); setError(""); }}
                                placeholder="VD: Mua xe, Du lịch..."
                                maxLength={40}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:font-normal placeholder:text-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 text-left">Số tiền cần đạt</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={targetInput}
                                    onChange={(e) => { setTargetInput(formatNumberInput(e.target.value)); setError(""); }}
                                    placeholder="0"
                                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 text-lg font-bold text-gray-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:font-normal placeholder:text-gray-300"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">đ</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 text-left">Ngày dự kiến đạt được (Tùy chọn)</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => { setDeadline(e.target.value); setError(""); }}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Color picker */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 text-left">Màu sắc</label>
                        <div className="flex gap-2 flex-wrap">
                            {BUDGET_COLORS.slice(0, 10).map((color) => { // Lấy 10 màu đẹp nhất
                                const isSelected = selectedColor.colorClass === color.colorClass;
                                return (
                                    <button
                                        key={color.colorClass}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm
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
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2 text-left">Biểu tượng</label>
                        <div className="flex gap-2 flex-wrap">
                            {GOAL_ICON_LIST.map(({ name, icon: Icon }) => {
                                const isSelected = selectedIconName === name;
                                return (
                                    <button
                                        key={name}
                                        onClick={() => setSelectedIconName(name)}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm
                                                    ${isSelected ? `${selectedColor.bgClass} ring-2 ring-orange-400 scale-110` : "bg-white border border-gray-200 hover:bg-gray-50 hover:scale-105"}`}
                                    >
                                        <Icon size={18} className={isSelected ? selectedColor.colorClass : "text-gray-400"} strokeWidth={1.5} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {error && <p className="text-xs font-bold text-red-500 bg-red-50 p-2 rounded-lg text-center mt-2 animate-pulse">{error}</p>}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-gray-50 rounded-b-2xl">
                    <button onClick={onClose} className="flex-[1] py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                        Hủy
                    </button>
                    <button onClick={handleSave} className="flex-[2] py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-bold transition-all shadow-[0_4px_10px_rgba(249,115,22,0.3)]">
                        {isAdd ? "Tạo Mục Tiêu Mới" : "Lưu Thay Đổi"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoalModal;
