// src/components/dashboard/widgetConfig.ts
export interface WidgetConfig {
  title: string;
  unit: string;
  type: 'StatCard' | 'ToggleSwitch' | 'CircularGauge' | 'LineChart';
  category: 'environmental' | 'water' | 'control' | 'power' | 'other';
  gridArea?: string;
  hidden?: boolean;
   // Optionally, add a group or chartId to group variables in the same chart
  chartId?: string;
}

export const widgetConfig: Record<string, WidgetConfig> = {
  // Environmental Sensors
  temp_in: { title: 'Temperature In', unit: '°C', type: 'LineChart', category: 'environmental', chartId: 'temperature' },
  temp_out: { title: 'Temperature Out', unit: '°C', type: 'LineChart', category: 'environmental', chartId: 'temperature' },
  rh_out: { title: 'Humidity Out', unit: '%', type: 'CircularGauge', category: 'environmental' },
  rh_in: { title: 'Humidity In', unit: '%', type: 'CircularGauge', category: 'environmental' },
  humi_in: { title: 'Humidity In', unit: '%', type: 'CircularGauge', category: 'environmental' },
  humi_o: { title: 'Humidity Out', unit: '%', type: 'CircularGauge', category: 'environmental' },
  vpd_in: { title: 'VPD In', unit: '', type: 'StatCard', category: 'environmental' },
  vpd_out: { title: 'VPD Out', unit: '', type: 'StatCard', category: 'environmental' },
  lux_out: { title: 'Light Intensity', unit: '', type: 'StatCard', category: 'environmental' },
  lux_o: { title: 'Light Intensity out', unit: '', type: 'StatCard', category: 'environmental' },
  rain_o: { title: 'Rain Out', unit: '', type: 'StatCard', category: 'environmental' },

  // Water Quality
  ec_nt1: { title: 'EC', unit: 'S', type: 'StatCard', category: 'water' },
  tds_nt1: { title: 'TDS', unit: '', type: 'StatCard', category: 'water' },
  ph_nt1: { title: 'pH', unit: '', type: 'StatCard', category: 'water' },
  temp_nut: { title: 'Nutrient Temp', unit: '°C', type: 'StatCard', category: 'water' },

  // Control Switches
  IRR_1: { title: 'IRR 1', type: 'ToggleSwitch', unit: '', category: 'control' },
  IR_2: { title: 'IR 2', type: 'ToggleSwitch', unit: '', category: 'control' },
  IRR_3: { title: 'IRR 3', type: 'ToggleSwitch', unit: '', category: 'control' },
  IRR_4: { title: 'IRR 4', type: 'ToggleSwitch', unit: '', category: 'control' },
  Curtain_up: { title: 'Curtain Up', type: 'ToggleSwitch', unit: '', category: 'control' },
  Curtain_down: { title: 'Curtain Down', type: 'ToggleSwitch', unit: '', category: 'control' },
  Vent: { title: 'Vent', type: 'ToggleSwitch', unit: '', category: 'control' },
  ACF: { title: 'ACF', type: 'ToggleSwitch', unit: '', category: 'control' },

  // Gauges
  Tank_level: { title: 'Tank Level', unit: '%', type: 'CircularGauge', category: 'water' },
  Soil_moisture: { title: 'Soil Moisture', unit: '%', type: 'CircularGauge', category: 'environmental' },
  total_liters_in: { title: 'Total Liters In', unit: '', type: 'CircularGauge', category: 'water' },
  total_liters_out: { title: 'Total Liters Out', unit: '', type: 'CircularGauge', category: 'water' },

  // Other Stats
  flowrate_in: { title: 'Flowrate In', unit: '', type: 'StatCard', category: 'water' },
  flowrate_out: { title: 'Flowrate Out', unit: '', type: 'StatCard', category: 'water' },
  percentage: { title: 'Tank Automation %', unit: '%', type: 'CircularGauge', category: 'water' },
  moisture_percent2: { title: 'Soil Moisture 2', unit: '%', type: 'CircularGauge', category: 'environmental' },
  
  // Hidden variables from dashboard
  farmatomacid: { title: 'Farmatomacid', unit: '', type: 'StatCard', category: 'other', hidden: true },
  n_id: { title: 'N ID', unit: '', type: 'StatCard', category: 'other', hidden: true },
  err_code: { title: 'Error Code', unit: '', type: 'StatCard', category: 'other', hidden: true },
  timestamp: { title: 'Timestamp', unit: '', type: 'StatCard', category: 'other', hidden: true },
  rssi_ge: { title: 'wifi_strength', unit: '', type: 'StatCard', category: 'other', hidden: true },
  err_ge: { title: 'Error Ge', unit: '', type: 'StatCard', category: 'other', hidden: true }, 
  addr_ge1: { title: 'Addr Ge1', unit: '', type: 'StatCard', category: 'other', hidden: true }, 
  addr_ge2: { title: 'Addr Ge2', unit: '', type: 'StatCard', category: 'other', hidden: true }, 
  did_in: { title: 'Did In', unit: '', type: 'StatCard', category: 'other', hidden: true },
  did_pow: { title: 'Did Power', unit: '', type: 'StatCard', category: 'other', hidden: true },
  numsentsuccess: { title: 'Num Sent Success', unit: '', type: 'StatCard', category: 'other', hidden: true },
  numsentfailure: { title: 'Num Sent Failure', unit: '', type: 'StatCard', category: 'other', hidden: true },
  currentfirmwareversion: { title: 'Current Firmware Version', unit: '', type: 'StatCard', category: 'other', hidden: true },
  enra: { title: 'Enra', unit: '', type: 'StatCard', category: 'other', hidden: true },
  enrr: { title: 'Enrr', unit: '', type: 'StatCard', category: 'other', hidden: true },
  did_irr: { title: 'Did Irr', unit: '', type: 'StatCard', category: 'other', hidden: true },
  nss: { title: 'Nss', unit: '', type: 'StatCard', category: 'other', hidden: true },
  nfs: { title: 'Nfs', unit: '', type: 'StatCard', category: 'other', hidden: true },

  // Power/Voltage/Current
  volt_red: { title: 'Voltage Red', unit: '', type: 'StatCard', category: 'power' },
  volt_ylw: { title: 'Voltage Yellow', unit: '', type: 'StatCard', category: 'power' },
  volt_blu: { title: 'Voltage Blue', unit: '', type: 'StatCard', category: 'power' },
  amp_red: { title: 'Current Red', unit: '', type: 'StatCard', category: 'power' },
  amp_ylw: { title: 'Current Yellow', unit: '', type: 'StatCard', category: 'power' },
  amp_blu: { title: 'Current Blue', unit: '', type: 'StatCard', category: 'power' },
  pow_red: { title: 'Power Red', unit: '', type: 'StatCard', category: 'power' },
  pow_ylw: { title: 'Power Yellow', unit: '', type: 'StatCard', category: 'power' },
  pow_blu: { title: 'Power Blue', unit: '', type: 'StatCard', category: 'power' },
  pf_red: { title: 'Power Factor Red', unit: '', type: 'StatCard', category: 'power' },
  pf_ylw: { title: 'Power Factor Yellow', unit: '', type: 'StatCard', category: 'power' },
  pf_blu: { title: 'Power Factor Blue', unit: '', type: 'StatCard', category: 'power' },
  hz: { title: 'Frequency', unit: '', type: 'StatCard', category: 'power' },
  minimum_height: { title: 'Minimum tank Height', unit: '', type: 'StatCard', category: 'water' },
  maximum_height: { title: 'Maximum tank Height', unit: '', type: 'StatCard', category: 'water' },

  //Switches (for chart/indicator, not toggle)
  switch_sw1: { title: 'Switch 1', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw2: { title: 'Switch 2', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw3: { title: 'Switch 3', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw4: { title: 'Switch 4', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw5: { title: 'Switch 5', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw6: { title: 'Switch 6', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw7: { title: 'Switch 7', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw8: { title: 'Switch 8', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw9: { title: 'Switch 9', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw10: { title: 'Switch 10', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw11: { title: 'Switch 11', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw12: { title: 'Switch 12', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw13: { title: 'Switch 13', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw14: { title: 'Switch 14', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw15: { title: 'Switch 15', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw16: { title: 'Switch 16', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_sw17: { title: 'Switch 17', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_pmp1: { title: 'Sample RO', unit: '', type: 'ToggleSwitch', category: 'control' }, 
  switch_pmp3: { title: 'Doser RO', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_pmp4: { title: 'Doser 1', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_pmp5: { title: 'Doser 2', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_pmp6: { title: 'Doser 3', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_pmp7: { title: 'Doser 4', unit: '', type: 'ToggleSwitch', category: 'control' },
  switch_pmp8: { title: 'Airation', unit: '', type: 'ToggleSwitch', category: 'control' }, 
  rain_out: { title: 'Rain', unit: '', type: 'ToggleSwitch', category: 'environmental' },
  relaystatus: { title: 'Relay Status', unit: '', type: 'ToggleSwitch', category: 'other' },
  //extra adding 
  total_in: { title: 'Total In', unit: '', type: 'StatCard', category: 'water' },
  total_out: { title: 'Total Out', unit: '', type: 'StatCard', category: 'water' }, 
  wifi_status: { title: 'Wifi Status', unit: '', type: 'StatCard', category: 'other' },
  height_cm: { title: 'Current tank Height', unit: '', type: 'StatCard', category: 'water' },
  height_cm_min: { title: 'Minimum tank Height', unit: '', type: 'StatCard', category: 'water' },
  height_cm_max: { title: 'Maximum tank Height', unit: '', type: 'StatCard', category: 'water' },
  v3n: { title: 'Voltage 3 phase', unit: '', type: 'StatCard', category: 'other' },
  vpd_o: { title: 'VPD Out', unit: '', type: 'StatCard', category: 'environmental' },
  temp_o: { title: 'Temperature Out', unit: '', type: 'StatCard', category: 'environmental' },
  j: { title: 'Internet Status', unit: '', type: 'StatCard', category: 'other' },
  w_lan: { title: 'Wlan Status', unit: '', type: 'StatCard', category: 'other' },
  st_s1: { title: 'Status S1', unit: '', type: 'ToggleSwitch', category: 'other' },
};

