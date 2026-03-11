import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
} from "lucide-react";

interface FooterProps {
    brandName?: string;
    version?: string;
}

const Footer: React.FC<FooterProps> = ({
    brandName = "Money AI"
}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const guideLinks = [
        { label: "Hướng dẫn nhập giao dịch", path: "/user/entry/expense" },
        { label: "Hướng dẫn xem báo cáo", path: "/user/report/monthly" },
        { label: "Hướng dẫn lập ngân sách", path: "/user/budget" },
        { label: "Điều khoản dịch vụ", path: "#" },
    ];

    return (
        <footer className="shrink-0 border-t border-gray-100 bg-gray-50">
            {/* ── Main body ── */}
            <div className="px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">

                {/* Col 1 – Thông tin liên hệ */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Thông tin liên hệ
                    </h4>

                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shrink-0">
                            <span className="text-white text-[10px] font-extrabold leading-none">M</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">{brandName}</span>
                    </div>

                    <ul className="flex flex-col gap-2.5">
                        <li className="flex items-start gap-2 text-xs text-gray-500">
                            <MapPin size={13} className="text-orange-400 shrink-0 mt-0.5" />
                            <span>Số 678, Đường Láng<br />Quận Đống Đa, TP Hà Nội</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-gray-500">
                            <Phone size={13} className="text-orange-400 shrink-0" />
                            <span>0985.584.356</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-gray-500">
                            <Mail size={13} className="text-orange-400 shrink-0" />
                            <span>support@moneyai.vn</span>
                        </li>
                    </ul>
                </div>

                {/* Col 2 – Chăm sóc khách hàng */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Chăm sóc khách hàng
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                        <li className="flex items-start gap-2 text-xs text-gray-500">
                            <Clock size={13} className="text-orange-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-600">Thời gian hỗ trợ</p>
                                <p>24/7 không kể ngày lễ</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-gray-500">
                            <Phone size={13} className="text-orange-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-600">Hotline</p>
                                <p>0985.584.356</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-2 text-xs text-gray-500">
                            <Mail size={13} className="text-orange-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-600">Email</p>
                                <p>nmt.minhtrungdev@gmail.com</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Col 3 – Hướng dẫn */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Hướng dẫn
                    </h4>
                    <ul className="flex flex-col gap-2">
                        {guideLinks.map(({ label, path }) => (
                            <li key={label}>
                                <button
                                    onClick={() => navigate(path)}
                                    className="text-xs text-gray-500 hover:text-orange-500 transition-colors duration-150 text-left"
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4 – Newsletter + Payment */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                        Nhận tin khuyến mãi
                    </h4>

                    {/* Email input */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 transition-colors">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            className="flex-1 px-3 py-2 text-xs outline-none bg-transparent text-gray-700 placeholder-gray-400"
                        />
                        <button
                            onClick={() => setEmail("")}
                            className="flex items-center gap-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors shrink-0"
                        >
                            Theo dõi
                        </button>
                    </div>

                    {/* Payment methods */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                            Phương thức thanh toán
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                            {["VNPAY", "VISA", "MasterCard", "JCB", "MoMo"].map((method) => (
                                <span
                                    key={method}
                                    className="px-2 py-1 text-[10px] font-bold border border-gray-200 rounded bg-white text-gray-500"
                                >
                                    {method}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
