import {
    UtensilsCrossed, ShoppingBag, Shirt, Sparkles, Users,
    HeartPulse, BookOpen, Zap, Train, Phone, Home,
    Wallet, PiggyBank, Gift, Coins, Briefcase,
    Car, Coffee, Music, Gamepad2, Scissors, Dumbbell,
    Baby, Dog, Plane, ShoppingCart, Building, Star,
    type LucideIcon,
} from "lucide-react";

export interface BudgetItem {
    id: string;
    label: string;
    iconName: string;
    colorClass: string;
    bgClass: string;
    budget: number | null; // null = chưa đặt
    spent: number;
}

export const BUDGET_ICON_MAP: Record<string, LucideIcon> = {
    UtensilsCrossed, ShoppingBag, Shirt, Sparkles, Users,
    HeartPulse, BookOpen, Zap, Train, Phone, Home,
    Wallet, PiggyBank, Gift, Coins, Briefcase,
    Car, Coffee, Music, Gamepad2, Scissors, Dumbbell,
    Baby, Dog, Plane, ShoppingCart, Building, Star,
};

export const DEFAULT_BUDGET_ITEMS: BudgetItem[] = [
    { id: "b1", label: "Ăn uống",          iconName: "UtensilsCrossed", colorClass: "text-orange-500", bgClass: "bg-orange-100", budget: null, spent: 5000000 },
    { id: "b2", label: "Chi tiêu hàng ngày", iconName: "ShoppingBag",    colorClass: "text-green-500",  bgClass: "bg-green-100",  budget: null, spent: 0 },
    { id: "b3", label: "Quần áo",            iconName: "Shirt",           colorClass: "text-blue-500",   bgClass: "bg-blue-100",   budget: null, spent: 0 },
    { id: "b4", label: "Mỹ phẩm",           iconName: "Sparkles",        colorClass: "text-pink-500",   bgClass: "bg-pink-100",   budget: null, spent: 0 },
    { id: "b5", label: "Phí giao lưu",      iconName: "Users",           colorClass: "text-yellow-600", bgClass: "bg-yellow-100", budget: null, spent: 0 },
    { id: "b6", label: "Y tế",              iconName: "HeartPulse",      colorClass: "text-teal-500",   bgClass: "bg-teal-100",   budget: null, spent: 0 },
    { id: "b7", label: "Giáo dục",          iconName: "BookOpen",        colorClass: "text-orange-600", bgClass: "bg-orange-100", budget: null, spent: 0 },
    { id: "b8", label: "Tiền điện",         iconName: "Zap",             colorClass: "text-cyan-500",   bgClass: "bg-cyan-100",   budget: null, spent: 0 },
];

// Hỗ trợ available colors & icons cho BudgetModal (tái dùng)
export const BUDGET_COLORS: { label: string; colorClass: string; bgClass: string }[] = [
    { label: "Cam",      colorClass: "text-orange-500", bgClass: "bg-orange-100" },
    { label: "Xanh lá", colorClass: "text-green-500",  bgClass: "bg-green-100"  },
    { label: "Xanh",    colorClass: "text-blue-500",   bgClass: "bg-blue-100"   },
    { label: "Hồng",    colorClass: "text-pink-500",   bgClass: "bg-pink-100"   },
    { label: "Vàng",    colorClass: "text-yellow-600", bgClass: "bg-yellow-100" },
    { label: "Ngọc",    colorClass: "text-teal-500",   bgClass: "bg-teal-100"   },
    { label: "Cam đậm", colorClass: "text-orange-600", bgClass: "bg-orange-100" },
    { label: "Cyan",    colorClass: "text-cyan-500",   bgClass: "bg-cyan-100"   },
    { label: "Xám",     colorClass: "text-gray-600",   bgClass: "bg-gray-100"   },
    { label: "Tím",     colorClass: "text-indigo-500", bgClass: "bg-indigo-100" },
    { label: "Đỏ",      colorClass: "text-red-500",    bgClass: "bg-red-100"    },
    { label: "Hồng tím",colorClass: "text-purple-500", bgClass: "bg-purple-100" },
];

export const BUDGET_ICONS: { name: string; icon: LucideIcon }[] = [
    { name: "UtensilsCrossed", icon: UtensilsCrossed },
    { name: "ShoppingBag",     icon: ShoppingBag     },
    { name: "Shirt",           icon: Shirt           },
    { name: "Sparkles",        icon: Sparkles        },
    { name: "Users",           icon: Users           },
    { name: "HeartPulse",      icon: HeartPulse      },
    { name: "BookOpen",        icon: BookOpen        },
    { name: "Zap",             icon: Zap             },
    { name: "Train",           icon: Train           },
    { name: "Phone",           icon: Phone           },
    { name: "Home",            icon: Home            },
    { name: "Wallet",          icon: Wallet          },
    { name: "PiggyBank",       icon: PiggyBank       },
    { name: "Gift",            icon: Gift            },
    { name: "Coins",           icon: Coins           },
    { name: "Briefcase",       icon: Briefcase       },
    { name: "Car",             icon: Car             },
    { name: "Coffee",          icon: Coffee          },
    { name: "Music",           icon: Music           },
    { name: "Gamepad2",        icon: Gamepad2        },
    { name: "Scissors",        icon: Scissors        },
    { name: "Dumbbell",        icon: Dumbbell        },
    { name: "Baby",            icon: Baby            },
    { name: "Dog",             icon: Dog             },
    { name: "Plane",           icon: Plane           },
    { name: "ShoppingCart",    icon: ShoppingCart    },
    { name: "Building",        icon: Building        },
    { name: "Star",            icon: Star            },
];
