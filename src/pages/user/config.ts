import {
    Home,
    PenSquare,
    Calendar,
    PieChart,
    Wallet,
    Settings,
    TrendingDown,
    TrendingUp,
    BarChart,
} from "lucide-react";
import { type NavItem } from "../../components/layout/Sidebar";

export const userNavItems: NavItem[] = [
    { label: "Trang chủ", icon: Home, path: "/user/home" },
    {
        label: "Nhập vào",
        icon: PenSquare,
        path: "/user/entry",
        children: [
            { label: "Khoản chi", icon: TrendingDown, path: "/user/entry/expense" },
            { label: "Khoản thu", icon: TrendingUp,   path: "/user/entry/income" },
        ],
    },
    { label: "Lịch",      icon: Calendar,  path: "/user/calendar" },
    {
        label: "Báo cáo",
        icon: PieChart,
        path: "/user/report",
        children: [
            { label: "Hàng tháng", icon: PieChart, path: "/user/report/monthly" },
            { label: "Hàng năm",   icon: BarChart, path: "/user/report/yearly" },
        ],
    },
    { label: "Ngân sách", icon: Wallet,    path: "/user/budget" },
    { label: "Cài đặt",   icon: Settings,  path: "/user/settings" },
];
