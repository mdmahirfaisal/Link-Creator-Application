import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    getCsvData: [],
    requirementsData: [],
    testCaseData: [],
    linkedData: [],
}

export const linkEditorSlice = createSlice({
    name: 'linkEditor',
    initialState,
    reducers: {
        // get csv data
        handleGetCsvData: (state, { payload }) => {
            state.getCsvData = payload
        },

        // get csv data
        handleRequirementsData: (state, { payload }) => {
            state.requirementsData = payload
        },

        // TestCase data
        handleTestCaseData: (state, { payload }) => {
            state.testCaseData = payload
        },

        // Link created data
        handleLinkedData: (state, { payload }) => {
            if (payload?.actionData?.id) {
                const index = state.linkedData.findIndex(data => data.id === payload.actionData.id);
                state.linkedData[index] = payload.data;
            }
            if (!payload?.actionData) {
                state.linkedData.push(payload.data)
            }
        },
        // Created link delete
        handleDeleteLinkedData: (state, { payload }) => {
            state.linkedData = state.linkedData?.filter(data => data.id !== payload.id)
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleRequirementsData, handleTestCaseData, handleGetCsvData, handleLinkedData, handleDeleteLinkedData } = linkEditorSlice.actions

export default linkEditorSlice.reducer