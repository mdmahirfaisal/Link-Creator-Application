import { configureStore } from '@reduxjs/toolkit';
import linkEditorReducer from './slices/linkEditorSlice';

export const store = configureStore({
    reducer: {
        linkEditor: linkEditorReducer,

    },
})