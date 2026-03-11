import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, TrendingDown } from 'lucide-react';

export type InsightType = 'warning' | 'success' | 'suggestion' | 'info';

export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  actionText?: string;
}

interface InsightCardProps {
  insight: AIInsight;
  onActionClick?: (id: string) => void;
}

const getStyles = (type: InsightType) => {
  switch (type) {
    case 'warning':
      return {
        bg: 'bg-red-50',
        border: 'border-red-100',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-500',
        Icon: AlertTriangle,
        btn: 'bg-red-100 text-red-600 hover:bg-red-200'
      };
    case 'success':
      return {
        bg: 'bg-green-50',
        border: 'border-green-100',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-500',
        Icon: TrendingUp,
        btn: 'bg-green-100 text-green-700 hover:bg-green-200'
      };
    case 'suggestion':
      return {
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
        Icon: Lightbulb,
        btn: 'bg-orange-100 text-orange-600 hover:bg-orange-200'
      };
    case 'info':
    default:
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-500',
        Icon: TrendingDown,
        btn: 'bg-blue-100 text-blue-600 hover:bg-blue-200'
      };
  }
};

const InsightCard: React.FC<InsightCardProps> = ({ insight, onActionClick }) => {
  const styles = getStyles(insight.type);
  const { Icon } = styles;

  return (
    <div className={`p-4 rounded-2xl border ${styles.bg} ${styles.border} transition-all hover:shadow-md flex items-start gap-4 mb-3`}>
      <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center ${styles.iconBg}`}>
        <Icon size={20} className={styles.iconColor} strokeWidth={2} />
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-800 mb-1">{insight.title}</h4>
        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          {insight.description}
        </p>
        
        {insight.actionText && (
          <button 
            onClick={() => onActionClick?.(insight.id)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${styles.btn}`}
          >
            {insight.actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default InsightCard;
