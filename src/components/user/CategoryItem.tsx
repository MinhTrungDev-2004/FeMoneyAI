import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { type Category } from "./categoryData";

interface CategoryItemProps {
    category: Category;
    isSelected: boolean;
    isEditMode: boolean;
    onSelect: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
    category,
    isSelected,
    isEditMode,
    onSelect,
    onEdit,
    onDelete,
}) => {
    const showActions = isEditMode;

    return (
        <div className="relative group cursor-pointer">
            {/* Card */}
            <button
                onClick={onSelect}
                className={`w-full flex flex-col items-center gap-2 p-4 rounded-xl transition-all text-center cursor-pointer
                    ${isSelected
                        ? "border-2 border-orange-400 bg-orange-50 shadow-sm"
                        : "border-2 border-gray-100 bg-white"
                    }`}
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${category.bgClass}`}>
                    <category.icon size={20} className={category.colorClass} strokeWidth={1.5} />
                </div>
                <span className="text-xs leading-tight text-gray-600 font-medium line-clamp-2">
                    {category.label}
                </span>
            </button>

            {/* Overlay: semi-transparent with blur, shows on hover or in edit mode */}
            <div
                className={`absolute inset-0 rounded-xl transition-all duration-200
                    bg-white/60 backdrop-blur-[2px]
                    flex flex-col items-center justify-center gap-2
                    border-2 ${isSelected ? "border-orange-400" : "border-gray-200"}
                    ${showActions
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
            >
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    title="Chỉnh sửa"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600
                               text-white text-[11px] font-semibold transition-colors shadow-sm cursor-pointer"
                >
                    <Pencil size={11} />
                    Sửa
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    title="Xóa"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600
                               text-white text-[11px] font-semibold transition-colors shadow-sm cursor-pointer"
                >
                    <Trash2 size={11} />
                    Xóa
                </button>
            </div>
        </div>
    );
};

export default CategoryItem;
