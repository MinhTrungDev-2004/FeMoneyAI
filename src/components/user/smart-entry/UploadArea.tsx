import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, FileText } from 'lucide-react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      } else {
        alert("Vui lòng tải lên file ảnh (JPG, PNG)");
      }
    }
  }, [onFileSelect, isProcessing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isProcessing) return;
    
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center p-6
          ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleChange}
          accept="image/png, image/jpeg, image/jpg"
          disabled={isProcessing}
        />
        
        <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
          <UploadCloud className={`w-10 h-10 ${isDragging ? 'text-orange-500' : 'text-gray-400'}`} strokeWidth={1.5} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Kéo thả hoá đơn vào đây
        </h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
          Hoặc click để chọn file từ máy tính. Hệ thống AI sẽ tự động trích xuất dữ liệu.
        </p>
        
        <div className="flex gap-4 items-center text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-100 shadow-sm">
            <ImageIcon size={14} className="text-blue-500" /> JPG, PNG
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-gray-100 shadow-sm">
            <FileText size={14} className="text-green-500" /> Hóa đơn, Bill, Chuyển khoản
          </span>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
