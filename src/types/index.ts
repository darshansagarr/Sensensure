export interface SensorData {
  current: number;
  voltage: number;
  power: number;
  powerFactor: number;
  temperature: number;
  humidity: number;
  waterLevel: number;
  waterFlow: number;
  waterQuantity: number;
  lightsStatus: boolean;
  motorStatus: boolean;
  solenoidValve01: boolean;
  solenoidValve02: boolean;
  solenoidValve03: boolean;
}

// Toggle device data interface
export interface ToggleDeviceData {
  device: string;
  status: boolean;
}
export interface ToggleDeviceData {
  device: string;
  status: boolean;
} 