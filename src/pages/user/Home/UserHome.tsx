import React from "react";
import { useNavigate } from "react-router-dom";
import {
    PenSquare,
    Calendar,
    PieChart,
    Wallet,
    Settings,
    TrendingDown,
    TrendingUp,
    BarChart,
    type LucideIcon,
} from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { userNavItems } from "../config";

/* ── Feature card data – khớp với menu ── */
interface FeatureCard {
    label: string;
    description: string;
    icon: LucideIcon;
    path: string;
    gradient: string;
    iconBg: string;
}

const featureCards: FeatureCard[] = [
    {
        label: "Nhập vào",
        description: "Ghi lại khoản chi & thu hàng ngày",
        icon: PenSquare,
        path: "/user/entry/expense",
        gradient: "from-orange-50 to-amber-50",
        iconBg: "bg-gradient-to-br from-orange-400 to-red-500",
    },
    {
        label: "Khoản chi",
        description: "Quản lý các khoản tiền chi tiêu",
        icon: TrendingDown,
        path: "/user/entry/expense",
        gradient: "from-red-50 to-rose-50",
        iconBg: "bg-gradient-to-br from-red-400 to-rose-500",
    },
    {
        label: "Khoản thu",
        description: "Theo dõi nguồn thu nhập của bạn",
        icon: TrendingUp,
        path: "/user/entry/income",
        gradient: "from-emerald-50 to-teal-50",
        iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    },
    {
        label: "Lịch",
        description: "Xem lịch sử giao dịch theo ngày",
        icon: Calendar,
        path: "/user/calendar",
        gradient: "from-sky-50 to-blue-50",
        iconBg: "bg-gradient-to-br from-sky-400 to-blue-500",
    },
    {
        label: "Báo cáo tháng",
        description: "Thống kê chi tiêu theo tháng",
        icon: PieChart,
        path: "/user/report/monthly",
        gradient: "from-violet-50 to-purple-50",
        iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    },
    {
        label: "Báo cáo năm",
        description: "Tổng quan tài chính theo năm",
        icon: BarChart,
        path: "/user/report/yearly",
        gradient: "from-indigo-50 to-blue-50",
        iconBg: "bg-gradient-to-br from-indigo-400 to-blue-600",
    },
    {
        label: "Ngân sách",
        description: "Lập & theo dõi ngân sách chi tiêu",
        icon: Wallet,
        path: "/user/budget",
        gradient: "from-cyan-50 to-teal-50",
        iconBg: "bg-gradient-to-br from-cyan-400 to-teal-500",
    },
    {
        label: "Cài đặt",
        description: "Tùy chỉnh ứng dụng theo ý bạn",
        icon: Settings,
        path: "/user/settings",
        gradient: "from-slate-50 to-gray-100",
        iconBg: "bg-gradient-to-br from-slate-400 to-gray-500",
    },
];

/* ── Page Component ── */
const UserHome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout
            navItems={userNavItems}
            pageTitle="Trang chủ"
            userName="Người dùng"
            brandName="Money AI"
        >
            {/* Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {featureCards.map((card) => (
                    <button
                        key={card.label + card.path}
                        onClick={() => navigate(card.path)}
                        className={`bg-gradient-to-br ${card.gradient} border border-white rounded-2xl p-5 flex flex-col items-start gap-3 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 cursor-pointer group`}
                    >
                        {/* Icon circle */}
                        <div
                            className={`${card.iconBg} w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}
                        >
                            <card.icon size={22} className="text-white" strokeWidth={1.8} />
                        </div>

                        {/* Text */}
                        <div>
                            <p className="text-sm font-semibold text-gray-800 leading-tight">
                                {card.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                                {card.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default UserHome;
