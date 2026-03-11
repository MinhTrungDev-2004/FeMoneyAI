import { Laptop, Home, Plane, HeartPulse, GraduationCap, Coins, Tv, Car, type LucideIcon } from 'lucide-react';

export interface SavingGoal {
  id: string;
  label: string;
  targetAmount: number;
  currentAmount: number;
  iconName: string;
  colorClass: string;
  bgClass: string;
  deadline?: string; // YYYY-MM-DD
}

export const GOAL_ICONS: Record<string, LucideIcon> = {
  Laptop, Home, Plane, HeartPulse, GraduationCap, Coins, Tv, Car
};

export const MOCK_GOALS: SavingGoal[] = [
  {
    id: 'g1',
    label: 'Mua MacBook Pro M3',
    targetAmount: 40000000,
    currentAmount: 26000000,
    iconName: 'Laptop',
    colorClass: 'text-indigo-500',
    bgClass: 'bg-indigo-100',
    deadline: '2026-12-31'
  },
  {
    id: 'g2',
    label: 'Chuyến du lịch Bali',
    targetAmount: 15000000,
    currentAmount: 3000000,
    iconName: 'Plane',
    colorClass: 'text-orange-500',
    bgClass: 'bg-orange-100',
    deadline: '2026-08-15'
  },
  {
    id: 'g3',
    label: 'Quỹ Dự Phòng Khẩn Cấp',
    targetAmount: 50000000,
    currentAmount: 45000000,
    iconName: 'HeartPulse',
    colorClass: 'text-red-500',
    bgClass: 'bg-red-100'
  }
];
