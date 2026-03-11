import React, { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { type Category, AVAILABLE_ICONS, AVAILABLE_COLORS } from "./categoryData";

interface CategoryModalProps {
    mode: "add" | "edit";
    initial?: Category | null;
    onSave: (data: { label: string; iconName: string; colorClass: string; bgClass: string }) => void;
    onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ mode, initial, onSave, onClose }) => {
    const [label, setLabel] = useState(initial?.label ?? "");
    const [selectedIconName, setSelectedIconName] = useState(initial?.iconName ?? AVAILABLE_ICONS[0].name);
    const [selectedColor, setSelectedColor] = useState(
        initial
            ? AVAILABLE_COLORS.find(c => c.colorClass === initial.colorClass) ?? AVAILABLE_COLORS[0]
            : AVAILABLE_COLORS[0]
    );

    useEffect(() => {
        if (initial) {
            setLabel(initial.label);
            setSelectedIconName(initial.iconName);
            setSelectedColor(AVAILABLE_COLORS.find(c => c.colorClass === initial.colorClass) ?? AVAILABLE_COLORS[0]);
        }
    }, [initial]);

    const handleSave = () => {
        if (!label.trim()) {
            alert("Vui lòng nhập tên danh mục.");
            return;
        }
        onSave({
            label: label.trim(),
            iconName: selectedIconName,
            colorClass: selectedColor.colorClass,
            bgClass: selectedColor.bgClass,
        });
    };

    const PreviewIcon = AVAILABLE_ICONS.find(i => i.name === selectedIconName)?.icon;

    return (
        // Overlay
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-800">
                        {mode === "add" ? "Thêm danh mục mới" : "Chỉnh sửa danh mục"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">
                    {/* Preview */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedColor.bgClass}`}>
                            {PreviewIcon && <PreviewIcon size={22} className={selectedColor.colorClass} strokeWidth={1.5} />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-800 mt-0.5">{label || "Tên danh mục"}</p>
                        </div>
                    </div>

                    {/* Category name */}
                    <div>
                        <label className="block text-xs font-semibold font-bold text-gray-800 uppercase tracking-wide mb-2 text-left">
                            Tên danh mục
                        </label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="Nhập tên danh mục..."
                            maxLength={30}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 outline-none
                                       focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* Color picker */}
                    <div>
                        <label className="block text-xs font-semibold font-bold text-gray-800 uppercase tracking-wide mb-2 text-left">
                            Màu sắc
                        </label>
                        <div className="grid grid-cols-8 gap-2">
                            {AVAILABLE_COLORS.map((color) => {
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
                        <label className="block text-xs font-semibold font-bold text-gray-800 uppercase tracking-wide mb-2 text-left">
                            Icon
                        </label>
                        <div className="grid grid-cols-7 gap-2">
                            {AVAILABLE_ICONS.map(({ name, icon: Icon }) => {
                                const isSelected = selectedIconName === name;
                                return (
                                    <button
                                        key={name}
                                        title={name}
                                        onClick={() => setSelectedIconName(name)}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer
                                                    ${isSelected
                                                ? `${selectedColor.bgClass} ring-2 ring-orange-400 scale-110`
                                                : "bg-gray-50 hover:bg-gray-100 hover:scale-105"
                                            }`}
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
                </div>

                {/* Footer buttons */}
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
                        {mode === "add" ? "Thêm danh mục" : "Lưu thay đổi"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
