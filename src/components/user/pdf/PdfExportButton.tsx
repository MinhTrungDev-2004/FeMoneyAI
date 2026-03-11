import React from "react";
import { Download, Loader2 } from "lucide-react";

interface PdfExportButtonProps {
    targetId: string;
    fileName?: string;
    isLoading?: boolean;
    onExport: () => void;
}

const PdfExportButton: React.FC<PdfExportButtonProps> = ({
    isLoading = false,
    onExport,
}) => {
    return (
        <button
            onClick={onExport}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-300 text-white rounded-xl px-5 py-3.5 text-sm font-bold transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    Đang xử lý...
                </>
            ) : (
                <>
                    <Download size={18} strokeWidth={2.5} />
                    Xuất báo cáo PDF
                </>
            )}
        </button>
    );
};

export default PdfExportButton;
