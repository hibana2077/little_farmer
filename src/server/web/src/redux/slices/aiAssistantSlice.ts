import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface AIAssistantState {
  messages: Message[];
  isLoading: boolean;
}

const initialState: AIAssistantState = {
  messages: [],
  isLoading: false,
};

const aiAssistantSlice = createSlice({
  name: 'aiAssistant',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, setLoading, clearChat } = aiAssistantSlice.actions;
export default aiAssistantSlice.reducer;