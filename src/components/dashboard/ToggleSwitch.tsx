import React from 'react';

interface ToggleSwitchProps {
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, isOn, onToggle }) => {
  return (
    <div className="bg-[#fafafa] rounded-lg p-4 shadow flex flex-col h-full justify-between min-h-[140px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#1B4965] text-sm font-semibold">{label}</span>
        <span className="text-[#1B4965] text-lg cursor-pointer">⋮</span>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="relative inline-block w-12 align-middle select-none mb-2">
          <input
            type="checkbox"
            name={`toggle-${label}`}
            id={`toggle-${label}`}
            className="sr-only"
            checked={isOn}
            onChange={onToggle}
          />
          <div
            className={`block w-12 h-6 rounded-full ${
              isOn ? 'bg-[#62b6cb]' : 'bg-[#bee9e8]'
            } cursor-pointer transition-colors duration-200`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-[#1B4965] w-4 h-4 rounded-full transition-transform duration-200 transform ${
              isOn ? 'translate-x-6' : ''
            } shadow-sm`}
          ></div>
        </div>
        <span className={`font-medium ${isOn ? 'text-[#1B4965]' : 'text-[#62b6cb]'}`}>
          {isOn ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  );
};

export default ToggleSwitch;