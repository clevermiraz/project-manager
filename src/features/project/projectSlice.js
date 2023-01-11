import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        assignedProjectsQuery: '',
        searchString: ''
    },

    reducers: {
        setAssignedProjectsQuery: (state, action) => {
            state.assignedProjectsQuery = action.payload;
        },
        search: (state, action) => {
            state.searchString = action.payload;
        }
    }
});

export const { setAssignedProjectsQuery, search } = projectSlice.actions;
export default projectSlice.reducer;
