import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Settings2 } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { userNavItems } from "../config";
import CategoryModal from "../../../components/user/CategoryModal";
import CategoryItem from "../../../components/user/CategoryItem";
import {
    type Category,
    DEFAULT_EXPENSE_CATEGORIES,
    DEFAULT_INCOME_CATEGORIES,
    ICON_MAP,
} from "../../../components/user/categoryData";

function fmtDate(d: Date) {
    const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} (${days[d.getDay()]})`;
}

interface UserEntryProps {
    defaultType?: "Tiền chi" | "Tiền thu";
}

import { categoryService } from "../../../services/categoryService";
import { transactionService } from "../../../services/transactionService";

const UserEntry: React.FC<UserEntryProps> = ({ defaultType = "Tiền chi" }) => {
    const type = defaultType;

    // --- Transaction form state ---
    const [date, setDate] = useState(new Date());
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCatId, setSelectedCatId] = useState<string | null>(null);

    // --- Category state ---
    const [expenseCategories, setExpenseCategories] = useState<Category[]>(DEFAULT_EXPENSE_CATEGORIES);
    const [incomeCategories, setIncomeCategories] = useState<Category[]>(DEFAULT_INCOME_CATEGORIES);

    // --- Edit mode state (toggle to show edit/delete on all cards) ---
    const [isEditMode, setIsEditMode] = useState(false);

    // --- Modal state ---
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const [loading, setLoading] = useState(false);

    // --- Helpers ---
    const categories = type === "Tiền chi" ? expenseCategories : incomeCategories;
    const setCategories = type === "Tiền chi" ? setExpenseCategories : setIncomeCategories;

    const prevDay = () => { const d = new Date(date); d.setDate(d.getDate() - 1); setDate(d); };
    const nextDay = () => { const d = new Date(date); d.setDate(d.getDate() + 1); setDate(d); };

    const selectedCat = categories.find(c => c.id === selectedCatId) ?? null;

    // --- Submit ---
    const handleSubmit = async () => {
        if (!amount || !selectedCatId) {
            alert("Vui lòng chọn danh mục và nhập số tiền.");
            return;
        }

        setLoading(true);
        try {
            // Format date to YYYY-MM-DD
            const formattedDate = date.toISOString().split("T")[0];

            await transactionService.create({
                categoryId: Number(selectedCatId),
                amount: Number(amount),
                transactionDate: formattedDate,
                note: note,
            });

            alert(`Đã ghi ${type}: ${Number(amount).toLocaleString("vi-VN")}đ – ${selectedCat?.label}`);
            setAmount("");
            setNote("");
            setSelectedCatId(null);
        } catch (err) {
            console.error("Failed to create transaction:", err);
            alert("Có lỗi xảy ra khi lưu giao dịch. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    // --- Category handlers ---
    const handleOpenAdd = () => {
        setEditingCategory(null);
        setModalMode("add");
        setModalOpen(true);
    };

    const handleOpenEdit = (cat: Category) => {
        setEditingCategory(cat);
        setModalMode("edit");
        setModalOpen(true);
    };

    const handleDelete = (catId: string) => {
        if (!window.confirm("Bạn có chắc muốn xóa danh mục này không?")) return;
        setCategories(prev => prev.filter(c => c.id !== catId));
        if (selectedCatId === catId) setSelectedCatId(null);
    };

    const handleSaveModal = async (data: { label: string; iconName: string; colorClass: string; bgClass: string }) => {
        const icon = ICON_MAP[data.iconName];
        if (modalMode === "add") {
            try {
                // Map UI type to API type
                const apiType = type === "Tiền chi" ? "CHI" : "THU";

                // Call API to create category
                const created = await categoryService.create({
                    name: data.label,
                    type: apiType,
                    icon: data.iconName,
                    colorCode: data.colorClass
                });

                const newCat: Category = {
                    id: String(created.id),
                    label: created.name,
                    icon,
                    iconName: created.icon,
                    colorClass: created.colorCode,
                    bgClass: data.bgClass,
                };
                setCategories(prev => [...prev, newCat]);
            } catch (err) {
                console.error("Failed to create category:", err);
                alert("Có lỗi xảy ra khi thêm danh mục. Vui lòng thử lại.");
            }
        } else if (editingCategory) {
            setCategories(prev =>
                prev.map(c =>
                    c.id === editingCategory.id
                        ? { ...c, label: data.label, icon, iconName: data.iconName, colorClass: data.colorClass, bgClass: data.bgClass }
                        : c
                )
            );
        }
        setModalOpen(false);
    };

    return (
        <DashboardLayout navItems={userNavItems} pageTitle="Nhập vào" userName="Người dùng" brandName="Money AI">
            {/* 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Left: Form details */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Thông tin giao dịch</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
                            <span className="text-sm text-gray-500 w-20 shrink-0">Ngày</span>
                            <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2 flex-1">
                                <button onClick={prevDay} className="text-gray-400 hover:text-orange-500 transition-colors">
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="flex-1 text-center text-sm font-semibold text-gray-700">{fmtDate(date)}</span>
                                <button onClick={nextDay} className="text-gray-400 hover:text-orange-500 transition-colors">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
                            <span className="text-sm text-gray-500 w-20 shrink-0">Ghi chú</span>
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Thêm ghi chú..."
                                className="flex-1 text-sm text-gray-700 bg-transparent outline-none border-b border-transparent focus:border-orange-300 pb-1 transition-colors placeholder:text-gray-300"
                            />
                        </div>

                        {/* Amount */}
                        <div className="flex items-center gap-3 px-5 py-4">
                            <span className="text-sm text-gray-500 w-20 shrink-0">
                                {type === "Tiền chi" ? "Tiền chi" : "Tiền thu"}
                            </span>
                            <div className="flex-1 flex items-center gap-2">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                    className="flex-1 text-3xl font-bold text-gray-800 bg-transparent outline-none placeholder:text-gray-200 w-0"
                                />
                                <span className="text-lg text-gray-400 font-semibold shrink-0">đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Selected category preview */}
                    {selectedCat && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedCat.bgClass}`}>
                                    <selectedCat.icon size={16} className={selectedCat.colorClass} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide">Danh mục đã chọn</p>
                                    <p className="text-sm font-bold text-gray-800 mt-0.5 text-left">{selectedCat.label}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedCatId(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-4 text-white text-base font-bold rounded-xl shadow-md transition-all
                            ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-orange-100"
                            }`}
                    >
                        {loading ? "Đang lưu..." : (type === "Tiền chi" ? "Nhập khoản chi" : "Nhập khoản thu")}
                    </button>
                </div>

                {/* Right: Category grid */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        {/* Header with edit mode toggle */}
                        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Danh mục</span>
                            <button
                                onClick={() => setIsEditMode(prev => !prev)}
                                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors
                                    ${isEditMode
                                        ? "bg-orange-100 text-orange-600"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                <Settings2 size={12} />
                                {isEditMode ? "Xong" : "Quản lý"}
                            </button>
                        </div>

                        <div className="p-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {/* Regular category items */}
                            {categories.map((cat) => (
                                <CategoryItem
                                    key={cat.id}
                                    category={cat}
                                    isSelected={selectedCatId === cat.id}
                                    isEditMode={isEditMode}
                                    onSelect={() => {
                                        if (!isEditMode) setSelectedCatId(cat.id);
                                    }}
                                    onEdit={() => handleOpenEdit(cat)}
                                    onDelete={() => handleDelete(cat.id)}
                                />
                            ))}

                            {/* Add new button */}
                            <button
                                onClick={handleOpenAdd}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all text-center cursor-pointer
                                           border-2 border-dashed border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50 group"
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-orange-100 transition-colors">
                                    <Plus size={20} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <span className="text-xs leading-tight text-gray-400 group-hover:text-orange-500 font-semibold transition-colors">
                                    Thêm mới
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            {modalOpen && (
                <CategoryModal
                    mode={modalMode}
                    initial={editingCategory}
                    onSave={handleSaveModal}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </DashboardLayout>
    );
};

export default UserEntry;
