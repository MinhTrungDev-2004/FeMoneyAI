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
        <div className="max-w-4xl mx-auto py-4">
            
            {/* Header giới thiệu */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-orange-100 text-orange-500 rounded-2xl mb-4">
                    <Bot size={28} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Nhập Giao Dịch Tự Động</h2>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Biến hình ảnh biên lai, hóa đơn hay ảnh chụp chuyển khoản thành dữ liệu thu chi chỉ trong 3 giây với Trí tuệ Nhân tạo.
                </p>
            </div>

            {/* Các bước xử lý */}
            <div className="w-full">
                {step === "upload" && (
                     <div className="animate-in fade-in zoom-in-95 duration-500">
                        <UploadArea onFileSelect={handleFileSelect} isProcessing={false} />
                     </div>
                )}

                {step === "analyzing" && (
                    <div className="animate-in fade-in duration-500">
                        <AnalysisLoading imagePreviewUrl={imageUrl} />
                    </div>
                )}

                {step === "result" && extractedData && (
                    <ExtractedResultForm 
                        data={extractedData} 
                        imageUrl={imageUrl}
                        onSave={handleSaveResult}
                        onCancel={resetFlow}
                    />
                )}

                {step === "success" && (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Lưu Thành Công!</h3>
                        <p className="text-gray-500 mb-8">Giao dịch đã được ghi nhận tự động vào sổ cái của bạn.</p>
                        <button 
                            onClick={resetFlow}
                            className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg"
                        >
                            <Sparkles size={18} /> Quét Hóa Đơn Khác
                        </button>
                    </div>
                )}
            </div>

            {/* Tips Section */}
            {step === "upload" && (
                 <div className="mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Mẹo để quét chính xác nhất</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-white text-gray-800 text-xs font-bold flex items-center justify-center shadow-sm shrink-0">1</div>
                            <p className="text-sm text-gray-600">Luôn chụp hóa đơn trong môi trường <strong>đủ ánh sáng</strong>, tránh bị bóng che lấp chữ.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-white text-gray-800 text-xs font-bold flex items-center justify-center shadow-sm shrink-0">2</div>
                            <p className="text-sm text-gray-600">Đảm bảo ảnh chụp hóa đơn thẳng thớm, không bị nhàu nát hay gập góc quá nhiều.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-white text-gray-800 text-xs font-bold flex items-center justify-center shadow-sm shrink-0">3</div>
                            <p className="text-sm text-gray-600">Có thể tải trực tiếp ảnh chụp <strong>Màn hình chuyển khoản (Internet Banking)</strong> để nhận diện.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </DashboardLayout>
  );
};

export default SmartEntry;
