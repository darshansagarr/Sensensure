// import React from 'react';

// interface CircularGaugeProps {
//   title: string;
//   value: number;
//   maxValue: number;
//   unit?: string;
// }

// const CircularGauge: React.FC<CircularGaugeProps> = ({ title, value, maxValue, unit = '' }) => {
//   const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
//   const percentage = Math.min(100, Math.max(0, (safeValue / maxValue) * 100));
//   const radius = 80;
//   const strokeWidth = 20;
//   const normalizedRadius = radius - strokeWidth / 2;
//   const circumference = normalizedRadius * 2 * Math.PI;
//   const strokeDashoffset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="bg-[#5fa8d3] rounded-lg p-4 shadow flex flex-col h-full justify-between min-h-[140px]">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-white text-sm font-semibold">{title}</span>
//         <span className="text-white/80 text-lg cursor-pointer">⋮</span>
//       </div>
//       <div className="flex flex-col flex-1 justify-center items-center">
//         <div className="relative">
//           <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
//             {/* Background circle */}
//             <circle
//               stroke="#FFFFFF33"
//               fill="transparent"
//               strokeWidth={strokeWidth}
//               r={normalizedRadius}
//               cx={radius}
//               cy={radius}
//             />
//             {/* Progress circle */}
//             <circle
//               stroke="#ffffff"
//               fill="transparent"
//               strokeWidth={strokeWidth}
//               strokeDasharray={circumference + ' ' + circumference}
//               style={{ strokeDashoffset }}
//               r={normalizedRadius}
//               cx={radius}
//               cy={radius}
//             />
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <span className="text-2xl font-bold text-white">
//               {typeof value === 'number' && !isNaN(value) ? value.toFixed(1) : '--'}{unit}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CircularGauge;

import React from 'react';

interface CircularGaugeProps {
  title: string;
  value: number;
  maxValue: number;
  unit?: string;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({ title, value, maxValue, unit = '' }) => {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const percentage = Math.min(100, Math.max(0, (safeValue / maxValue) * 100));
  const radius = 80;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#fafafa] rounded-lg p-4 shadow flex flex-col h-full justify-between min-h-[140px]">
      <div className="flex items-center justify-between mb-2">
      <span className="text-[#1B4965] text-sm font-semibold">{title}</span>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="relative">
          <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              stroke="#bee9e8"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <circle
              stroke="#62b6cb"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#1B4965]">
              {safeValue.toFixed(0)}{unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularGauge;
