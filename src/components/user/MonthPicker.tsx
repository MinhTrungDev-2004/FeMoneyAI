import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface MonthPickerProps {
    year: number;
    month: number;
    onChange: (year: number, month: number) => void;
    className?: string;
    variant?: "default" | "unstyled";
}

const MonthPicker: React.FC<MonthPickerProps> = ({ year, month, onChange, className = "", variant = "default" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState(year);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Xử lý click ra ngoài để đóng popup
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Khi chọn xong tháng
    const handleSelectMonth = (m: number) => {
        onChange(viewYear, m);
        setIsOpen(false);
    };

    // Nút prev/next ngoài popup
    const prevMonth = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (month === 0) onChange(year - 1, 11);
        else onChange(year, month - 1);
    };
    const nextMonth = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (month === 11) onChange(year + 1, 0);
        else onChange(year, month + 1);
    };

    const monthLabel = `${String(month + 1).padStart(2, "0")}/${year}`;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Nút hiển thị */}
            <div className={`flex items-center justify-center gap-1 ${variant === "default"
                ? "h-full min-h-[44px] bg-white border border-gray-200 rounded-xl px-2 shadow-sm hover:border-gray-300 transition-colors"
                : "text-inherit"
                }`}>
                <button
                    onClick={prevMonth}
                    className={`flex items-center justify-center shrink-0 transition-colors ${variant === "default"
                        ? "p-2 h-full text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg"
                        : "p-1 opacity-60 hover:opacity-100 rounded-md hover:bg-black/5"
                        }`}
                >
                    <ChevronLeft size={16} />
                </button>

                <button
                    onClick={() => { setIsOpen(!isOpen); setViewYear(year); }}
                    className={`flex items-center justify-center transition-colors ${variant === "default"
                        ? "flex-1 gap-2 px-4 h-full hover:bg-gray-50 rounded-lg min-w-[120px]"
                        : "gap-1 px-2 py-0.5 rounded-md hover:bg-black/5"
                        }`}
                >
                    {variant === "default" && <CalendarIcon size={16} className="text-orange-500" />}
                    <span className={variant === "default" ? "text-sm md:text-base font-bold text-gray-700" : "text-base font-bold text-inherit"}>
                        {monthLabel}
                    </span>
                </button>

                <button
                    onClick={nextMonth}
                    className={`flex items-center justify-center shrink-0 transition-colors ${variant === "default"
                        ? "p-2 h-full text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg"
                        : "p-1 opacity-60 hover:opacity-100 rounded-md hover:bg-black/5"
                        }`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Popup chọn tháng */}
            {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                    {/* Header: Đổi năm */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => setViewYear(y => y - 1)}
                            className="p-1 text-gray-400 hover:text-orange-500 rounded transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm font-bold text-gray-800">Năm {viewYear}</span>
                        <button
                            onClick={() => setViewYear(y => y + 1)}
                            className="p-1 text-gray-400 hover:text-orange-500 rounded transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Lưới chọn tháng */}
                    <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 12 }).map((_, i) => {
                            const isSelected = viewYear === year && i === month;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelectMonth(i)}
                                    className={`py-2 text-sm rounded-lg transition-colors flex items-center justify-center transition-all ${isSelected
                                        ? "bg-orange-500 text-white font-bold shadow-sm shadow-orange-200"
                                        : "text-gray-600 hover:bg-orange-50 hover:text-orange-600 font-medium"
                                        }`}
                                >
                                    Th {i + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthPicker;
