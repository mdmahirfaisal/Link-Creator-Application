import { createSlice } from '@reduxjs/toolkit';
const rows = [
    {
        id: 1,
        Source: 'http://api.example.com/requirement/1',
        LinkType: 'ValidatedBy',
        Target: 'http://api.example.com/testcase/4'
    },
    {
        id: 2,
        Source: 'http://api.example.com/requirement/1',
        LinkType: 'ValidatedBy',
        Target: 'http://api.example.com/testcase/4'
    },
    {
        id: 3,
        Source: 'http://api.example.com/requirement/1',
        LinkType: 'ValidatedBy',
        Target: 'http://api.example.com/testcase/4'
    },
    {
        id: 4,
        Source: 'http://api.example.com/requirement/1',
        LinkType: 'ValidatedBy',
        Target: 'http://api.example.com/testcase/4'
    },
    {
        id: 5,
        Source: 'http://api.example.com/requirement/1',
        LinkType: 'ValidatedBy',
        Target: 'http://api.example.com/testcase/4'
    },
    {
        id: 6,
        Source: 'http://api.example.com/requirement/1',
        LinkType: 'ValidatedBy',
        Target: 'http://api.example.com/testcase/4'
    },
];
const initialState = {
    requirementsData: [],
    testCaseData: [],
    linkedData: [...rows],
}

export const linkEditorSlice = createSlice({
    name: 'linkEditor',
    initialState,
    reducers: {
        // get csv data
        handleRequirementsData: (state, { payload }) => {
            state.requirementsData = payload
        },
        // import csv data and display in table
        handleTestCaseData: (state, { payload }) => {
            state.testCaseData = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleRequirementsData, handleTestCaseData } = linkEditorSlice.actions

export default linkEditorSlice.reducer