import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { userNavItems } from '../config';
import { Bot, Sparkles, CheckCircle } from 'lucide-react';

import UploadArea from '../../../components/user/smart-entry/UploadArea';
import AnalysisLoading from '../../../components/user/smart-entry/AnalysisLoading';
import ExtractedResultForm, { type ExtractedData } from '../../../components/user/smart-entry/ExtractedResultForm';

const SmartEntry: React.FC = () => {
    const [step, setStep] = useState<"upload" | "analyzing" | "result" | "success">("upload");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

    const handleFileSelect = (file: File) => {
        // 1. Lưu ảnh để hiển thị preview
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);

        // 2. Chuyển sang bước Loading (Quét AI)
        setStep("analyzing");

        // 3. Giả lập delay 3s gọi API Gemini/OCR
        setTimeout(() => {
            // Data giả lập trả về từ AI
            const mockResponse: ExtractedData = {
                amount: 145000,
                date: new Date().toISOString().split('T')[0],
                categoryName: "Ăn uống",
                note: "Thanh toán Highlands Coffee (AI Scan)"
            };
            setExtractedData(mockResponse);
            setStep("result");
        }, 3000); // 3 seconds scan animation
    };

    const handleSaveResult = (finalData: ExtractedData) => {
        console.log("Saving to DB:", finalData);
        // Call API to save transaction here...
        setStep("success");
    };

    const resetFlow = () => {
        setImageUrl("");
        setExtractedData(null);
        setStep("upload");
    };

    return (
        <DashboardLayout navItems={userNavItems} pageTitle="Quét Hóa Đơn AI" userName="Người dùng" brandName="Money AI">

            {/* Header giới thiệu */}
            <div className="mb-6 mt-2">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 shadow-sm">
                        <Bot size={25} />
                    </div>
                    <div>
                        <h2 className="text-1xl font-bold text-gray-800 text-left">Nhập Giao Dịch Tự Động</h2>
                        <p className="text-gray-500 text-sm">
                            Biến hình ảnh hóa đơn, biên lai hay ảnh màn hình chuyển khoản thành dữ liệu thu chi chỉ trong 3 giây với Trí tuệ Nhân tạo.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full py-4">
                {/* Form Upload & Tips ngang nhau (Chỉ hiện khi ở bước upload) */}
                {step === "upload" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Cột trái: Vùng Kéo thả ảnh */}
                        <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
                            <UploadArea onFileSelect={handleFileSelect} isProcessing={false} />
                        </div>

                        {/* Cột phải: Các mẹo quét chuẩn xác */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1 w-full animate-in fade-in duration-500 h-full">
                            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Sparkles size={18} className="text-orange-500" />
                                Mẹo quét chính xác nhất
                            </h4>
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-white text-orange-600 text-sm font-bold flex items-center justify-center shadow-sm shrink-0 border border-orange-100">1</div>
                                    <p className="text-sm text-gray-600 leading-relaxed text-left flex-1">Luôn chụp hóa đơn trong môi trường <strong>đủ ánh sáng</strong>, tránh bị bóng người che lấp chữ.</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-white text-orange-600 text-sm font-bold flex items-center justify-center shadow-sm shrink-0 border border-orange-100">2</div>
                                    <p className="text-sm text-gray-600 leading-relaxed text-left flex-1">Đảm bảo ảnh chụp hóa đơn <strong>thẳng</strong>, không bị nhàu nát hay gập mép quá nhiều.</p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-white text-orange-600 text-sm font-bold flex items-center justify-center shadow-sm shrink-0 border border-orange-100">3</div>
                                    <p className="text-sm text-gray-600 leading-relaxed text-left flex-1">Có thể tải trực tiếp ảnh chụp <strong>Màn hình chuyển khoản (Internet Banking)</strong> để nhận diện tự động.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Các bước xử lý khác (Analyzing, Result, Success) */}
                <div className="w-full">
                    {step === "analyzing" && (
                        <div className="animate-in fade-in duration-500 w-full max-w-4xl mx-auto">
                            <AnalysisLoading imagePreviewUrl={imageUrl} />
                        </div>
                    )}

                    {step === "result" && extractedData && (
                        <div className="w-full max-w">
                            <ExtractedResultForm
                                data={extractedData}
                                imageUrl={imageUrl}
                                onSave={handleSaveResult}
                                onCancel={resetFlow}
                            />
                        </div>
                    )}

                    {step === "success" && (
                        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in zoom-in-95 duration-500 w-full max-w-4xl mx-auto">
                            <div className="w-20 h-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Lưu Thành Công!</h3>
                            <p className="text-gray-500 mb-8">Giao dịch đã được ghi nhận tự động vào sổ cái của bạn.</p>
                            <button
                                onClick={resetFlow}
                                className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg shadow-green-100"
                            >
                                <Sparkles size={18} /> Quét Hóa Đơn Khác
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SmartEntry;
