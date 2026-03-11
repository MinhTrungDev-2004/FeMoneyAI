import React from 'react';
import { ScanLine, Loader2, FileImage } from 'lucide-react';

interface AnalysisLoadingProps {
  imagePreviewUrl: string;
}

const AnalysisLoading: React.FC<AnalysisLoadingProps> = ({ imagePreviewUrl }) => {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="relative w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl bg-black border-[6px] border-gray-900 aspect-[3/4]">
        {/* User uploaded Image */}
        <div className="absolute inset-0 z-0">
          {imagePreviewUrl ? (
            <img 
              src={imagePreviewUrl} 
              alt="Bill to scan" 
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
               <FileImage size={40} className="text-gray-500" />
            </div>
          )}
        </div>
        
        {/* Scanning Overlay Effect */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
        
        {/* Scanning Laser Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-orange-500 shadow-[0_0_15px_5px_rgba(249,115,22,0.5)] animate-[scan_2s_ease-in-out_infinite]" />
        
        {/* Scanning UI Elements Overlay */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
            
          <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md border border-gray-700 flex items-center justify-center mb-6 shadow-2xl relative">
              {/* Outer ring spin */}
              <div className="absolute inset-0 rounded-full border border-orange-500/30 border-t-orange-500 animate-spin"></div>
              
              <ScanLine size={32} className="text-orange-500" strokeWidth={1.5} />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
            AI Đang Phân Tích
          </h3>
          <p className="text-gray-300 text-sm mb-6 max-w-[200px] drop-shadow-md">
            Hệ thống đang trích xuất dữ liệu giao dịch từ hoá đơn của bạn...
          </p>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-gray-700 shadow-md">
            <Loader2 size={14} className="text-orange-500 animate-spin" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Processing Image
            </span>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
};

export default AnalysisLoading;
