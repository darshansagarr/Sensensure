

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit }) => (
  <div className="bg-[#fafafa] rounded-lg p-4 shadow flex flex-col h-full justify-between min-h-[140px]">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[#1B4965] text-sm font-semibold">{title}</span> 
      <span className="text-white/80 text-lg cursor-pointer">⋮</span>
    </div>
    <div className="flex flex-col flex-1 justify-center items-center">
      {/* <span className="text-white/80 text-xs mb-1">Last value:</span> */}
      <span className="text-3xl font-bold text-[#1B4965]">
        {value}
        {unit && <span className="text-lg font-normal text-[#1B4965] ml-1">{unit}</span>}
      </span>
    </div>
  </div>
);

export default StatCard;
