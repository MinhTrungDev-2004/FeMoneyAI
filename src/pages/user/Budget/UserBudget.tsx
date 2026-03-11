import React, { useState } from "react";
import { Plus } from "lucide-react";
import MonthPicker from "../../../components/user/MonthPicker";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import BudgetModal from "../../../components/user/budget/BudgetModal";
import BudgetCard from "../../../components/user/budget/BudgetCard";
import BudgetOverviewCard from "../../../components/user/budget/BudgetOverviewCard";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { DEFAULT_BUDGET_ITEMS, type BudgetItem } from "../../../components/user/budget/budgetData";
import { userNavItems } from "../config";

const UserBudget: React.FC = () => {
    const today = new Date();
    const [year, setYear]       = useState(today.getFullYear());
    const [month, setMonth]     = useState(today.getMonth());
    const [items, setItems]     = useState<BudgetItem[]>(DEFAULT_BUDGET_ITEMS);

    // Modal state
    type ModalMode = "add" | "set-budget";
    const [modalMode, setModalMode]     = useState<ModalMode>("add");
    const [editTarget, setEditTarget]   = useState<BudgetItem | null>(null);
    const [showModal, setShowModal]     = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    /* ── Handlers ── */
    const openAdd = () => {
        setModalMode("add");
        setEditTarget(null);
        setShowModal(true);
    };

    const openSetBudget = (item: BudgetItem) => {
        setModalMode("set-budget");
        setEditTarget(item);
        setShowModal(true);
    };

    const handleSave = (data: Partial<BudgetItem>) => {
        if (modalMode === "add") {
            const newItem: BudgetItem = {
                id: `b${Date.now()}`,
                label: data.label ?? "Danh mục mới",
                iconName: data.iconName ?? "Star",
                colorClass: data.colorClass ?? "text-orange-500",
                bgClass: data.bgClass ?? "bg-orange-100",
                budget: data.budget ?? null,
                spent: 0,
            };
            setItems(prev => [...prev, newItem]);
        } else if (editTarget) {
            setItems(prev =>
                prev.map(it => it.id === editTarget.id ? { ...it, budget: data.budget ?? it.budget } : it)
            );
        }
        setShowModal(false);
    };

    const confirmDelete = (id: string) => setConfirmDeleteId(id);

    const executeDelete = () => {
        if (confirmDeleteId) {
            setItems(prev => prev.filter(it => it.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        }
    };

    return (
        <DashboardLayout navItems={userNavItems} pageTitle="Ngân sách" userName="Người dùng" brandName="Money AI">

            {/* ── Header: MonthPicker + Thêm ngân sách ── */}
            <div className="flex items-center justify-between w-full mb-6 gap-4">
                <MonthPicker
                    year={year}
                    month={month}
                    onChange={(y, m) => { setYear(y); setMonth(m); }}
                />
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95
                               text-white rounded-xl px-5 h-[44px] text-sm font-semibold transition-all
                               shadow-sm shadow-orange-200 whitespace-nowrap"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    Thêm ngân sách
                </button>
            </div>

            {/* ── Overview ── */}
            <BudgetOverviewCard items={items} month={month} year={year} />

            {/* ── Budget grid ── */}
            {items.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-200 p-12 text-center">
                    <p className="text-gray-300 text-sm">Chưa có danh mục ngân sách nào.</p>
                    <button
                        onClick={openAdd}
                        className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 mx-auto"
                    >
                        <Plus size={14} /> Thêm ngay
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map(item => (
                        <BudgetCard
                            key={item.id}
                            item={item}
                            onSetBudget={openSetBudget}
                            onDelete={confirmDelete}
                        />
                    ))}
                </div>
            )}

            {/* ── Modal ── */}
            {showModal && (
                <BudgetModal
                    mode={modalMode}
                    editItem={editTarget}
                    onSave={handleSave}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* ── Confirm Delete Modal ── */}
            <ConfirmModal
                isOpen={!!confirmDeleteId}
                title="Xóa hạng mục"
                message="Bạn có chắc chắn muốn xóa hạnh mục ngân sách này không? Thao tác này không thể hoàn tác."
                confirmText="Xóa"
                onConfirm={executeDelete}
                onCancel={() => setConfirmDeleteId(null)}
            />
        </DashboardLayout>
    );
};

export default UserBudget;
