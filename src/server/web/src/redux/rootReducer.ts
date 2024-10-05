import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import systemReducer from './slices/systemSlice';
import aiAssistantReducer from './slices/aiAssistantSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  system: systemReducer,
  aiAssistant: aiAssistantReducer,
});

export default rootReducer;