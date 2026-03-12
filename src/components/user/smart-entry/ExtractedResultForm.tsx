import React, { useState } from 'react';
import { Calendar, Tag, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { type Category, ICON_MAP, AVAILABLE_COLORS } from '../categoryData';
import { categoryService } from '../../../services/categoryService';

// Giả lập DTO dữ liệu trả về từ AI
export interface ExtractedData {
    amount: number;
    date: string; // YYYY-MM-DD
    categoryName: string; // Tên danh mục AI đoán
    note: string;
}

interface ExtractedResultFormProps {
    data: ExtractedData;
    imageUrl: string;
    onSave: (data: ExtractedData) => void;
    onCancel: () => void;
}

const ExtractedResultForm: React.FC<ExtractedResultFormProps> = ({ data, imageUrl, onSave, onCancel }) => {
    const [amount, setAmount] = useState(data.amount.toString());
    const [date, setDate] = useState(data.date);
    const [note, setNote] = useState(data.note);

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCatId, setSelectedCatId] = useState<string>("");

    // --- Fetch Categories ---
    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiResponse = await categoryService.getAll();
                const mapped: Category[] = (apiResponse || [])
                    .filter(item => item.type === "EXPENSE") // AI extraction is usually for expenses
                    .map(item => {
                        const icon = ICON_MAP[item.icon] || ICON_MAP["Star"];
                        const colorMatch = AVAILABLE_COLORS.find(c => c.colorClass === item.colorCode) || AVAILABLE_COLORS[0];
                        return {
                            id: String(item.id),
                            label: item.name,
                            icon,
                            iconName: item.icon,
                            colorClass: colorMatch.colorClass,
                            bgClass: colorMatch.bgClass,
                        };
                    });
                setCategories(mapped);
                
                // Set initial selection based on AI prediction
                const predicted = mapped.find(c => c.label.toLowerCase().includes(data.categoryName?.toLowerCase() || ""));
                setSelectedCatId(predicted?.id || mapped[0]?.id || "");
            } catch (err) {
                console.error("Failed to fetch categories in ExtractedResultForm:", err);
            }
        };
        fetchCategories();
    }, [data.categoryName]);

    const formatCurrency = (val: string) => val.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const handleSave = () => {
        const rawAmount = parseInt(amount.replace(/\./g, ""), 10);
        const cat = categories.find(c => c.id === selectedCatId);

        if (!rawAmount || !date) {
            alert("Vui lòng nhập đủ Số tiền và Ngày");
            return;
        }

        onSave({
            amount: rawAmount,
            date,
            note,
            categoryName: cat?.label || data.categoryName
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Cột trái: Hiển thị lại ảnh bill đã upload */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 self-start">Ảnh Hóa Đơn</p>
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={imageUrl} alt="Uploaded Bill" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Cột phải: Form kết quả AI cho phép chỉnh sửa */}
            <div className="w-full md:w-2/3 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 text-left">Trích xuất thành công</h3>
                        <p className="text-sm text-gray-500">Vui lòng kiểm tra lại thông tin AI đã đọc trước khi lưu.</p>
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    {/* Amount */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                            <CreditCard size={14} className="text-orange-500" /> Số tiền
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formatCurrency(amount)}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">đ</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Date */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                                <Calendar size={14} className="text-blue-500" /> Ngày giao dịch
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        {/* Category Dropdown (Dự đoán từ AI) */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                                <Tag size={14} className="text-green-500" /> Danh mục
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCatId}
                                    onChange={e => setSelectedCatId(e.target.value)}
                                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 appearance-none outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all bg-white"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                            Nội dung / Tên người gửi
                        </label>
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
                            placeholder="VD: Highlands Coffee, Tiền điện tháng 10..."
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                    <button
                        onClick={onCancel}
                        className="flex-[1] py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Hủy & Thử lại
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-[2] py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-md shadow-orange-200"
                    >
                        Lưu Giao Dịch Này
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ExtractedResultForm;
