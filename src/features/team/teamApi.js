import apiSlice from '../api/apiSlice';

const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => ({
                url: `/teams?members_like=${email}`
            })
        }),

        addTeam: builder.mutation({
            query: (data) => ({
                url: '/teams',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: team } = await queryFulfilled;
                    const { email } = team.author;
                    dispatch(
                        teamApi.util.updateQueryData('getTeams', email, (draft) => {
                            draft.push(team);
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        updateTeam: builder.mutation({
            query: (data) => {
                const { id, members } = data || {};
                let updatedTeam = {};
                if (members?.length) updatedTeam = { ...updatedTeam, members };
                return {
                    url: `/teams/${id}`,
                    method: 'PATCH',
                    body: updatedTeam
                };
            },

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedTeam } = await queryFulfilled;
                    const { email } = updatedTeam.author;
                    dispatch(
                        teamApi.util.updateQueryData('getTeams', email, (draft) =>
                            draft.map((team) =>
                                team.id === updatedTeam.id
                                    ? {
                                          ...team,
                                          members: updatedTeam.members
                                      }
                                    : team
                            )
                        )
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        deleteTeam: builder.mutation({
            query: ({ id }) => ({
                url: `/teams/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        teamApi.util.updateQueryData('getTeams', arg.email, (draft) =>
                            draft.filter((team) => team.id !== arg.id)
                        )
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export default teamApi;
export const {
    useGetTeamsQuery,
    useAddTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation
} = teamApi;
