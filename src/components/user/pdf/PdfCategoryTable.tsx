import React from "react";
import {
    UtensilsCrossed, ShoppingBag, Shirt, Sparkles,
    Users, HeartPulse, BookOpen, Zap, Briefcase,
    Gift, Car, Home, Plane, Coffee, DollarSign,
} from "lucide-react";

export interface CategoryStat {
    label: string;
    amount: number;
    percent: number;
    color: string;
    iconName?: string;
}

interface PdfCategoryTableProps {
    data: CategoryStat[];
    type: "expense" | "income";
}

const ICON_MAP: Record<string, React.ElementType> = {
    food: UtensilsCrossed,
    shopping: ShoppingBag,
    clothes: Shirt,
    beauty: Sparkles,
    social: Users,
    health: HeartPulse,
    education: BookOpen,
    electric: Zap,
    work: Briefcase,
    gift: Gift,
    transport: Car,
    home: Home,
    travel: Plane,
    coffee: Coffee,
    income: DollarSign,
};

const getIcon = (iconName?: string): React.ElementType => {
    if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];
    return DollarSign;
};

const PdfCategoryTable: React.FC<PdfCategoryTableProps> = ({ data, type }) => {
    const title = type === "expense" ? "Phân tích chi tiêu theo danh mục" : "Phân tích thu nhập theo danh mục";
    const accentColor = type === "expense" ? "text-orange-600" : "text-blue-600";
    const barColor = type === "expense" ? "bg-orange-500" : "bg-blue-500";
    const headerBg = type === "expense" ? "bg-orange-50" : "bg-blue-50";

    return (
        <div className="mb-6">
            <h3 className={`text-sm font-bold ${accentColor} mb-3 flex items-center gap-2`}>
                <span className={`w-1 h-4 ${barColor} rounded-full inline-block`} />
                {title}
            </h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className={`grid grid-cols-12 ${headerBg} px-4 py-2.5 border-b border-gray-200`}>
                    <div className="col-span-1" />
                    <div className="col-span-4 text-xs font-semibold text-gray-600">Danh mục</div>
                    <div className="col-span-4 text-xs font-semibold text-gray-600">Tỷ lệ</div>
                    <div className="col-span-3 text-xs font-semibold text-gray-600 text-right">Số tiền</div>
                </div>

                {/* Table Rows */}
                {data.map((item, idx) => {
                    const Icon = getIcon(item.iconName);
                    return (
                        <div
                            key={item.label}
                            className={`grid grid-cols-12 items-center px-4 py-3 ${idx !== data.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
                        >
                            {/* Icon */}
                            <div className="col-span-1">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: item.color + "20" }}
                                >
                                    <Icon size={15} style={{ color: item.color }} strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Label */}
                            <div className="col-span-4">
                                <span className="text-sm font-semibold text-gray-800">{item.label}</span>
                            </div>

                            {/* Progress bar + percent */}
                            <div className="col-span-4 flex items-center gap-2 pr-3">
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                                    />
                                </div>
                                <span className="text-xs text-gray-400 shrink-0 w-8 text-right">
                                    {item.percent.toFixed(0)}%
                                </span>
                            </div>

                            {/* Amount */}
                            <div className="col-span-3 text-right">
                                <span className="text-sm font-bold text-gray-800">
                                    {item.amount.toLocaleString("vi-VN")}đ
                                </span>
                            </div>
                        </div>
                    );
                })}

                {data.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-gray-300">
                        Không có dữ liệu trong khoảng thời gian này
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfCategoryTable;
