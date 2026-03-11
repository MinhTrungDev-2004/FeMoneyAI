import React from 'react';
import { Target, TrendingUp, Calendar as CalIcon, Plus } from 'lucide-react';
import { type SavingGoal, GOAL_ICONS } from './goalData';

interface GoalCardProps {
  goal: SavingGoal;
  onFundClick: (goal: SavingGoal) => void;
  onEditClick: (goal: SavingGoal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onFundClick, onEditClick }) => {
  const Icon = GOAL_ICONS[goal.iconName] || Target;
  
  const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = goal.targetAmount - goal.currentAmount;
  const isCompleted = pct >= 100;

  // Tính số ngày còn lại nếu có Deadline
  let daysLeft = null;
  if (goal.deadline) {
      const targetDate = new Date(goal.deadline);
      const today = new Date();
      const diffTime = targetDate.getTime() - today.getTime();
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Animation & Color styles
  const progressColor = isCompleted 
    ? "from-emerald-400 to-green-500" 
    : "from-orange-400 to-orange-500";
    
  return (
    <div 
        className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
        {/* Nhãn hoàn thành */}
        {isCompleted && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl z-20 shadow-sm">
                Đã Đạt Mục Tiêu
            </div>
        )}

        <div className="p-6 cursor-pointer" onClick={() => onEditClick(goal)}>
            <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
                <div className="flex gap-4 items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${goal.bgClass}`}>
                        <Icon size={28} className={goal.colorClass} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 truncate">{goal.label}</h3>
                        {daysLeft !== null && (
                            <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded w-max border border-gray-100">
                                <CalIcon size={10} className={daysLeft < 30 ? "text-red-400" : "text-blue-400"} />
                                {daysLeft > 0 
                                    ? <span className={daysLeft < 30 ? "text-red-500" : ""}>Còn {daysLeft} ngày</span>
                                    : <span className="text-red-500">Quá hạn {(daysLeft * -1)} ngày</span>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Số liệu tài chính */}
            <div className="flex justify-between items-end mb-3">
                <div>
                     <p className="text-xs text-gray-500 mb-1">Đã tích lũy</p>
                     <p className="text-xl font-bold text-gray-800">
                         {goal.currentAmount.toLocaleString('vi-VN')}đ
                     </p>
                </div>
                <div className="text-right">
                     <p className="text-xs text-gray-400 mb-1">Mục tiêu</p>
                     <p className="text-sm font-semibold text-gray-500">
                         {goal.targetAmount.toLocaleString('vi-VN')}đ
                     </p>
                </div>
            </div>

            {/* Animated Progress Bar Container */}
            <div className="relative w-full h-5 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-4">
                {/* Thanh chạy chính */}
                <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out flex items-center justify-end pr-2 overflow-hidden`}
                    style={{ width: `${pct}%` }}
                >
                    {/* Hiệu ứng nước chảy/bóng chiếu trên thanh */}
                    {pct > 10 && (
                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[move_1s_linear_infinite]" />
                    )}
                </div>
                
                {/* Số % hiển thị nổi bên trên */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black z-10 transition-colors ${pct > 55 ? "text-white" : "text-gray-500"}`}>
                    {pct.toFixed(1)}%
                </div>
            </div>

            {/* Ghi chú dưới Progress bar */}
            {!isCompleted && (
                <p className="text-xs text-gray-500 font-medium">
                    Bạn cần tích lũy thêm <span className="text-orange-500 font-bold">{remaining.toLocaleString('vi-VN')}đ</span> để đạt mục tiêu.
                </p>
            )}
            {isCompleted && (
                 <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                 <TrendingUp size={14} /> Chúc mừng! Bạn đã hoàn thành 100% mục tiêu. 
             </p>
            )}
        </div>

        {/* Nút nạp tiền nhanh dưới đáy Card */}
        <div className="border-t border-gray-100 p-3 bg-gray-50/50">
            <button 
                onClick={(e) => { e.stopPropagation(); onFundClick(goal); }}
                disabled={isCompleted}
                className={`w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors 
                  ${isCompleted 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-orange-50 text-orange-500 hover:bg-orange-100 hover:text-orange-600"}`}
            >
                <Plus size={14} strokeWidth={2.5} /> Cập nhật dòng tiền
            </button>
        </div>

        {/* CSS Keyframe cục bộ cho Card này */}
        <style>{`
          @keyframes move {
            0% { background-position: 0 0; }
            100% { background-position: 20px 20px; }
          }
        `}</style>
    </div>
  );
};

export default GoalCard;
