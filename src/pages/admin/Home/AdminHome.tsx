import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    FileText,
    BarChart2,
    Settings,
    Bell,
    Shield,
    CreditCard,
    Activity,
    BookOpen,
    Calendar,
    Award,
    AlertCircle,
    type LucideIcon,
} from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { type NavItem } from "../../../components/layout/Sidebar";

/* ── Nav items cho Admin ── */
const adminNavItems: NavItem[] = [
    { label: "Trang chủ", icon: BarChart2, path: "/admin/home" },
    {
        label: "Quản lý người dùng", icon: Users, path: "/admin/users",
        children: [
            { label: "Danh sách người dùng", icon: Users, path: "/admin/users/list" },
            { label: "Phân quyền", icon: Shield, path: "/admin/users/roles" },
            { label: "Hoạt động", icon: Activity, path: "/admin/users/activity" },
        ],
    },
    {
        label: "Quản lý giao dịch", icon: CreditCard, path: "/admin/transactions",
        children: [
            { label: "Tất cả giao dịch", icon: CreditCard, path: "/admin/transactions/all" },
            { label: "Chờ xử lý", icon: AlertCircle, path: "/admin/transactions/pending" },
        ],
    },
    { label: "Báo cáo & Thống kê", icon: BarChart2, path: "/admin/reports" },
    {
        label: "Nội dung & Tin tức", icon: BookOpen, path: "/admin/content",
        children: [
            { label: "Bài viết", icon: FileText, path: "/admin/content/posts" },
            { label: "Danh mục", icon: BookOpen, path: "/admin/content/categories" },
        ],
    },
    { label: "Lịch & Sự kiện", icon: Calendar, path: "/admin/calendar" },
    { label: "Khen thưởng", icon: Award, path: "/admin/rewards" },
    { label: "Cảnh báo & Log", icon: AlertCircle, path: "/admin/logs" },
    { label: "Thông báo", icon: Bell, path: "/admin/notifications" },
    { label: "Cài đặt hệ thống", icon: Settings, path: "/admin/settings" },
];

/* ── Feature card data ── */
interface FeatureCard {
    label: string;
    description: string;
    icon: LucideIcon;
    path: string;
    gradient: string;
    iconBg: string;
}

const featureCards: FeatureCard[] = [
    { label: "Quản lý người dùng", description: "Xem và quản lý tài khoản người dùng", icon: Users, path: "/admin/users", gradient: "from-violet-50 to-purple-50", iconBg: "bg-gradient-to-br from-violet-500 to-purple-600" },
    { label: "Quản lý giao dịch", description: "Theo dõi tất cả giao dịch hệ thống", icon: CreditCard, path: "/admin/transactions", gradient: "from-emerald-50 to-teal-50", iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600" },
    { label: "Báo cáo & Thống kê", description: "Xem báo cáo và thống kê tổng hợp", icon: BarChart2, path: "/admin/reports", gradient: "from-sky-50 to-blue-50", iconBg: "bg-gradient-to-br from-sky-400 to-blue-600" },
    { label: "Tra cứu thông tin", description: "Tìm kiếm và tra cứu dữ liệu", icon: FileText, path: "/admin/content", gradient: "from-orange-50 to-amber-50", iconBg: "bg-gradient-to-br from-orange-400 to-amber-500" },
    { label: "Nội dung & Tin tức", description: "Quản lý bài viết và danh mục", icon: BookOpen, path: "/admin/content", gradient: "from-pink-50 to-rose-50", iconBg: "bg-gradient-to-br from-pink-400 to-rose-600" },
    { label: "Lịch & Sự kiện", description: "Theo dõi lịch và sự kiện hệ thống", icon: Calendar, path: "/admin/calendar", gradient: "from-indigo-50 to-violet-50", iconBg: "bg-gradient-to-br from-indigo-400 to-violet-600" },
    { label: "Khen thưởng", description: "Quản lý điểm thưởng và danh hiệu", icon: Award, path: "/admin/rewards", gradient: "from-yellow-50 to-orange-50", iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500" },
    { label: "Cảnh báo & Log", description: "Xem nhật ký và cảnh báo hệ thống", icon: AlertCircle, path: "/admin/logs", gradient: "from-red-50 to-rose-50", iconBg: "bg-gradient-to-br from-red-400 to-rose-600" },
    { label: "Thông báo", description: "Gửi và quản lý thông báo người dùng", icon: Bell, path: "/admin/notifications", gradient: "from-cyan-50 to-sky-50", iconBg: "bg-gradient-to-br from-cyan-400 to-sky-600" },
    { label: "Phân quyền", description: "Cấu hình vai trò và quyền truy cập", icon: Shield, path: "/admin/roles", gradient: "from-teal-50 to-emerald-50", iconBg: "bg-gradient-to-br from-teal-400 to-emerald-600" },
    { label: "Cài đặt hệ thống", description: "Tùy chỉnh cấu hình hệ thống", icon: Settings, path: "/admin/settings", gradient: "from-slate-50 to-gray-100", iconBg: "bg-gradient-to-br from-slate-400 to-gray-600" },
    { label: "Hoạt động hệ thống", description: "Giám sát hoạt động và hiệu suất", icon: Activity, path: "/admin/activity", gradient: "from-fuchsia-50 to-pink-50", iconBg: "bg-gradient-to-br from-fuchsia-400 to-pink-600" },
];

/* ── Feature Card component ── */
const FeatureCardItem: React.FC<{ card: FeatureCard; onClick: () => void }> = ({
    card,
    onClick,
}) => (
    <button
        onClick={onClick}
        className={`bg-gradient-to-br ${card.gradient} border border-white rounded-2xl p-5 flex flex-col items-start gap-3 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 cursor-pointer group`}
    >
        {/* Icon circle */}
        <div className={`${card.iconBg} w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}>
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
);

/* ── Page Component ── */
const AdminHome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout
            navItems={adminNavItems}
            pageTitle="Trang chủ"
            userName="Admin"
        >
            {/* Grid feature cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {featureCards.map((card) => (
                    <FeatureCardItem
                        key={card.path + card.label}
                        card={card}
                        onClick={() => navigate(card.path)}
                    />
                ))}
            </div>
        </DashboardLayout>
    );
};

export default AdminHome;
