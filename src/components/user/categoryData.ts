import {
    UtensilsCrossed, ShoppingBag, Shirt, Sparkles, Users,
    HeartPulse, BookOpen, Zap, Train, Phone, Home,
    Wallet, PiggyBank, Gift, Coins, TrendingUp, Briefcase,
    Car, Coffee, Music, Gamepad2, Scissors, Dumbbell,
    Baby, Dog, Plane, ShoppingCart, Building, Star,
    type LucideIcon,
} from "lucide-react";

export interface Category {
    id: string;
    label: string;
    icon: LucideIcon;
    iconName: string;
    colorClass: string; // text-* (icon color)
    bgClass: string;    // bg-* (icon bg)
    type?: "EXPENSE" | "INCOME";
}

// All available icons for user to pick
export const AVAILABLE_ICONS: { name: string; icon: LucideIcon }[] = [
    { name: "UtensilsCrossed", icon: UtensilsCrossed },
    { name: "ShoppingBag", icon: ShoppingBag },
    { name: "Shirt", icon: Shirt },
    { name: "Sparkles", icon: Sparkles },
    { name: "Users", icon: Users },
    { name: "HeartPulse", icon: HeartPulse },
    { name: "BookOpen", icon: BookOpen },
    { name: "Zap", icon: Zap },
    { name: "Train", icon: Train },
    { name: "Phone", icon: Phone },
    { name: "Home", icon: Home },
    { name: "Wallet", icon: Wallet },
    { name: "PiggyBank", icon: PiggyBank },
    { name: "Gift", icon: Gift },
    { name: "Coins", icon: Coins },
    { name: "TrendingUp", icon: TrendingUp },
    { name: "Briefcase", icon: Briefcase },
    { name: "Car", icon: Car },
    { name: "Coffee", icon: Coffee },
    { name: "Music", icon: Music },
    { name: "Gamepad2", icon: Gamepad2 },
    { name: "Scissors", icon: Scissors },
    { name: "Dumbbell", icon: Dumbbell },
    { name: "Baby", icon: Baby },
    { name: "Dog", icon: Dog },
    { name: "Plane", icon: Plane },
    { name: "ShoppingCart", icon: ShoppingCart },
    { name: "Building", icon: Building },
    { name: "Star", icon: Star },
];

export const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
    AVAILABLE_ICONS.map(({ name, icon }) => [name, icon])
);

// Available colors
export const AVAILABLE_COLORS: { label: string; colorClass: string; bgClass: string }[] = [
    { label: "Cam", colorClass: "text-orange-500", bgClass: "bg-orange-50" },
    { label: "Xanh lá", colorClass: "text-green-500", bgClass: "bg-green-50" },
    { label: "Xanh dương", colorClass: "text-blue-500", bgClass: "bg-blue-50" },
    { label: "Hồng", colorClass: "text-pink-500", bgClass: "bg-pink-50" },
    { label: "Vàng", colorClass: "text-yellow-500", bgClass: "bg-yellow-50" },
    { label: "Xanh ngọc", colorClass: "text-teal-500", bgClass: "bg-teal-50" },
    { label: "Cam đậm", colorClass: "text-orange-600", bgClass: "bg-orange-100" },
    { label: "Xanh cyan", colorClass: "text-cyan-500", bgClass: "bg-cyan-50" },
    { label: "Xám", colorClass: "text-gray-600", bgClass: "bg-gray-100" },
    { label: "Tím", colorClass: "text-indigo-500", bgClass: "bg-indigo-50" },
    { label: "Vàng nâu", colorClass: "text-amber-600", bgClass: "bg-amber-50" },
    { label: "Đỏ", colorClass: "text-red-500", bgClass: "bg-red-50" },
    { label: "Hồng tím", colorClass: "text-purple-500", bgClass: "bg-purple-50" },
    { label: "Xanh lime", colorClass: "text-lime-600", bgClass: "bg-lime-50" },
    { label: "Nâu", colorClass: "text-amber-800", bgClass: "bg-amber-100" },
    { label: "Hồng đậm", colorClass: "text-rose-500", bgClass: "bg-rose-50" },
];


