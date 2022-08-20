import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    requirementsData: [],
    testCaseData: [],
    linkedData: [],
}

export const linkEditorSlice = createSlice({
    name: 'linkEditor',
    initialState,
    reducers: {
        // Requirements data 
        handleRequirementsData: (state, { payload }) => {
            state.requirementsData = payload
        },
        // TestCase data
        handleTestCaseData: (state, { payload }) => {
            state.testCaseData = payload
        },
        // Links data
        handleLinkedData: (state, { payload }) => {
            state.linkedData = payload
        },
    },
});

// Action creators are generated for each case reducer function
export const { handleRequirementsData, handleTestCaseData, handleLinkedData } = linkEditorSlice.actions

export default linkEditorSlice.reducer