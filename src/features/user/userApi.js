import apiSlice from '../api/apiSlice';

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users'
        })
    })
});

export const { useGetUsersQuery } = userApi;
export default userApi;
