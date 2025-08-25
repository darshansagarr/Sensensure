import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface LineDef {
  key: string;
  name: string;
  color: string;
}

interface LineChartWidgetProps {
  data: Array<Record<string, any>>;
  lines: LineDef[];
  title: string;
}

const iconStyle = {
  width: 18,
  height: 18,
  marginLeft: 12,
  cursor: 'pointer',
  opacity: 0.7,
};

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ data, lines, title }) => (
  <div className="bg-[#fafafa] rounded-lg p-4 shadow-lg mt-10 w-full">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-white text-lg font-medium">{title}</h3>
      <div className="flex items-center">
        {/* Edit icon */}
        <svg style={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
        {/* Settings icon */}
        <svg style={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4m8-4h-4m-8 0H4" /></svg>
        {/* Delete icon */}
        <svg style={iconStyle} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </div>
    </div>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
          <XAxis
            dataKey="time"
            stroke="#1B4965"
            tickFormatter={(tick: string, index: number) => {
              // Show only every 3rd tick or the last tick
              if (index % 3 === 0 || index === data.length - 1) {
                return tick.slice(0, 5); // Format: HH:mm
              }
              return '';
            }}
            interval={0}
            angle={0}
            textAnchor="middle"
            height={40}
            tick={{ fill: '#1B4965', fontSize: 13 }}
          />
          <YAxis
            stroke="#1B4965"
            domain={[0, 'auto']}
            tickCount={6}
            tickFormatter={tick => Math.round(tick).toString()}
            tick={{ fill: '#1B4965', fontSize: 13 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #e6e6e6',
              borderRadius: '0.5rem',
              color: '#1B4965',
            }}
            labelStyle={{ color: '#1B4965' }}
          />
          <Legend
            wrapperStyle={{ color: '#fff' }}
            iconType="circle"
            align="center"
            verticalAlign="top"
          />
          {lines.map(line => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              name={line.name}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default LineChartWidget; 