import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SensorData {
  temperature: number;
  humidity: number;
  ph: number;
  nutrientLevel: number;
  lightLevel: number;
}

interface SystemState {
  currentStatus: SensorData;
  lastUpdated: string | null;
  isAutoMode: boolean;
}

const initialState: SystemState = {
  currentStatus: {
    temperature: 0,
    humidity: 0,
    ph: 0,
    nutrientLevel: 0,
    lightLevel: 0,
  },
  lastUpdated: null,
  isAutoMode: true,
};

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    updateSensorData: (state, action: PayloadAction<SensorData>) => {
      state.currentStatus = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    setAutoMode: (state, action: PayloadAction<boolean>) => {
      state.isAutoMode = action.payload;
    },
    adjustParameter: (state, action: PayloadAction<Partial<SensorData>>) => {
      state.currentStatus = { ...state.currentStatus, ...action.payload };
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { updateSensorData, setAutoMode, adjustParameter } = systemSlice.actions;
export default systemSlice.reducer;