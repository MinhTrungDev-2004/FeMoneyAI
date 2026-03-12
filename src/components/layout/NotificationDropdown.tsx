import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type?: "info" | "success" | "warning" | "error";
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        title: "Giao dịch thành công",
        message: "Bạn vừa chi tiêu 145.000đ cho Ăn uống (Highlands Coffee).",
        time: "10 phút trước",
        isRead: false,
        type: "success",
    },
    {
        id: "2",
        title: "Cảnh báo vượt ngân sách",
        message: "Hạng mục Mua sắm đã vượt 80% ngân sách tháng này.",
        time: "2 giờ trước",
        isRead: false,
        type: "warning",
    },
    {
        id: "3",
        title: "Báo cáo tuẩn",
        message: "Báo cáo chi tiêu tuần trước của bạn đã sẵn sàng.",
        time: "1 ngày trước",
        isRead: true,
        type: "info",
    },
    {
        id: "4",
        title: "Nhắc nhở hóa đơn",
        message: "Hóa đơn tiền điện (500.000đ) sắp đến hạn thanh toán.",
        time: "2 ngày trước",
        isRead: true,
        type: "error",
    },
    {
        id: "5",
        title: "Mẹo tiết kiệm",
        message: "Hãy thử nấu ăn ở nhà để tiết kiệm chi phí nhé!",
        time: "3 ngày trước",
        isRead: true,
        type: "info",
    },
    {
        id: "6",
        title: "Giao dịch thành công",
        message: "Đã thanh toán hóa đơn Internet (250.000đ).",
        time: "4 ngày trước",
        isRead: true,
        type: "success",
    },
    {
        id: "7",
        title: "Lương về",
        message: "Bạn vừa nhận được khoản thu nhập 15.000.000đ.",
        time: "5 ngày trước",
        isRead: true,
        type: "success",
    },
    {
        id: "8",
        title: "Mẹo tài chính",
        message: "Cân nhắc đầu tư khoản tiền rảnh rỗi của bạn.",
        time: "1 tuần trước",
        isRead: true,
        type: "info",
    },
    {
        id: "9",
        title: "Giao dịch đáng ngờ",
        message: "Phát hiện khoản chi bất thường trong mục Ăn uống.",
        time: "1 tuần trước",
        isRead: true,
        type: "warning",
    },
];

const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleMarkAllRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    };

    const handleMarkRead = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    };

    const getIconColor = (type?: string) => {
        switch (type) {
            case "success":
                return "text-green-500 bg-green-100";
            case "warning":
                return "text-orange-500 bg-orange-100";
            case "error":
                return "text-red-500 bg-red-100";
            default:
                return "text-blue-500 bg-blue-100";
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Nút Chuông */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 rounded-xl transition-colors ${isOpen ? "bg-gray-100 text-gray-800" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    }`}
                aria-label="Thông báo"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Box */}
            {isOpen && (
                <div className="absolute -right-2 sm:right-0 top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200 origin-top-right">
                    <style>{`
                        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
                    `}</style>
                    {/* Header Dropdown */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-800">Thông báo</h3>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                                    {unreadCount} mới
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleMarkAllRead}
                            disabled={unreadCount === 0}
                            className={`text-xs font-medium transition-colors ${unreadCount > 0
                                ? "text-orange-500 hover:text-orange-600 hover:underline"
                                : "text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Đánh dấu đã đọc
                        </button>
                    </div>

                    {/* Danh sách thông báo (Scrollable) */}
                    <div className="max-h-[60vh] overflow-y-auto overscroll-contain custom-scrollbar divide-y divide-gray-50">
                        {notifications.length === 0 ? (
                            <div className="py-8 text-center flex flex-col items-center">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                    <Bell className="text-gray-300" size={24} />
                                </div>
                                <p className="text-sm text-gray-500 font-medium">Bạn không có thông báo nào.</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 flex gap-3 hover:bg-gray-50 transition-colors relative group cursor-pointer ${!notification.isRead ? "bg-orange-50/30" : ""
                                        }`}
                                    onClick={(e) => handleMarkRead(notification.id, e)}
                                >
                                    {/* Chấm xanh (cam) hiển thị chưa đọc */}
                                    {!notification.isRead && (
                                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-500" />
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getIconColor(
                                            notification.type
                                        )}`}
                                    >
                                        <Bell size={14} />
                                    </div>

                                    {/* Nội dung (Đã thêm class text-left ở đây) */}
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <p
                                                className={`text-sm truncate ${!notification.isRead ? "font-bold text-gray-800" : "font-semibold text-gray-700"
                                                    }`}
                                            >
                                                {notification.title}
                                            </p>
                                            <span className="text-[10px] text-gray-400 shrink-0 mt-0.5 whitespace-nowrap">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p
                                            className={`text-xs leading-relaxed line-clamp-2 ${!notification.isRead ? "text-gray-600" : "text-gray-500"
                                                }`}
                                        >
                                            {notification.message}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
                            <button className="text-xs font-bold text-gray-500 hover:text-orange-500 transition-colors">
                                Xem tất cả thông báo
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;