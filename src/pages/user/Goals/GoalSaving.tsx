import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { userNavItems } from '../config';
import { Target, PlusCircle } from 'lucide-react';

import { MOCK_GOALS, type SavingGoal } from '../../../components/user/goals/goalData';
import GoalCard from '../../../components/user/goals/GoalCard';
import GoalModal from '../../../components/user/goals/GoalModal';
import FundModal from '../../../components/user/goals/FundModal';

const GoalSaving: React.FC = () => {
    const [goals, setGoals] = useState<SavingGoal[]>(MOCK_GOALS);

    // Modal states
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [goalModalMode, setGoalModalMode] = useState<"add" | "edit">("add");
    const [editingGoal, setEditingGoal] = useState<SavingGoal | null>(null);

    const [isFundModalOpen, setIsFundModalOpen] = useState(false);
    const [fundingGoal, setFundingGoal] = useState<SavingGoal | null>(null);

    // --- Handlers for Goal Card Actions ---
    const handleOpenAddGoal = () => {
        setGoalModalMode("add");
        setEditingGoal(null);
        setIsGoalModalOpen(true);
    };

    const handleOpenEditGoal = (goal: SavingGoal) => {
        setGoalModalMode("edit");
        setEditingGoal(goal);
        setIsGoalModalOpen(true);
    };

    const handleOpenFundGoal = (goal: SavingGoal) => {
        setFundingGoal(goal);
        setIsFundModalOpen(true);
    };

    // --- Handlers for Modals ---
    const handleSaveGoal = (goalData: Partial<SavingGoal>) => {
        if (goalModalMode === "add") {
            const newGoal: SavingGoal = {
                ...goalData,
                id: `goal_${Date.now()}`,
                currentAmount: 0 // Goal mới bắt đầu từ 0
            } as SavingGoal;
            setGoals([newGoal, ...goals]);
        } else if (goalModalMode === "edit" && editingGoal) {
            setGoals(goals.map((g: SavingGoal) => g.id === editingGoal.id ? { ...g, ...goalData } as SavingGoal : g));
        }
        setIsGoalModalOpen(false);
    };

    const handleFundGoal = (amount: number, type: "add" | "withdraw") => {
        if (!fundingGoal) return;

        setGoals(goals.map((g: SavingGoal) => {
            if (g.id === fundingGoal.id) {
                const newAmount = type === "add"
                    ? Math.min(g.currentAmount + amount, g.targetAmount)
                    : Math.max(g.currentAmount - amount, 0);
                return { ...g, currentAmount: newAmount };
            }
            return g;
        }));

        setIsFundModalOpen(false);
    };

    return (
        <DashboardLayout navItems={userNavItems} pageTitle="Mục Tiêu Tiết Kiệm" userName="Người dùng" brandName="Money AI">
            {/* Header giới thiệu */}
            <div className="mb-6 mt-2">
                <div className="flex items-center justify-between w-full mb-2 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
                            <Target size={25} />
                        </div>
                        <div>
                            <h2 className="text-1xl font-bold text-gray-800 text-left">Mục Tiêu Tiết Kiệm</h2>
                            <p className="text-gray-500 text-sm">Lập kế hoạch và theo dõi dòng tiền cho những mơ ước của bạn.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleOpenAddGoal}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95
                                       text-white rounded-xl px-5 h-[44px] text-sm font-semibold transition-all
                                       shadow-sm shadow-orange-200 whitespace-nowrap"
                        >
                            <PlusCircle size={16} strokeWidth={2.5} /> Thêm mục tiêu
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full py-4">
                {/* Goals Grid */}
                {goals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goals.map((goal: SavingGoal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onFundClick={handleOpenFundGoal}
                                onEditClick={handleOpenEditGoal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                            <Target size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có mục tiêu nào</h3>
                        <p className="text-gray-500">Hãy tạo mục tiêu đầu tiên (Mua xe, Du lịch, Tiết kiệm...) để AI giúp bạn theo dõi nhé.</p>
                    </div>
                )}

                {/* --- Modals --- */}
                {isGoalModalOpen && (
                    <GoalModal
                        mode={goalModalMode}
                        editItem={editingGoal}
                        onSave={handleSaveGoal}
                        onClose={() => setIsGoalModalOpen(false)}
                    />
                )}

                {isFundModalOpen && fundingGoal && (
                    <FundModal
                        goal={fundingGoal}
                        onFund={handleFundGoal}
                        onClose={() => setIsFundModalOpen(false)}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default GoalSaving;
