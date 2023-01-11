import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddTeamModal from '../components/modals/AddTeamModal';
import TeamNavbar from '../components/navbar/TeamNavbar';
import Team from '../components/Team';
import Error from '../components/ui/Error';
import Loading from '../components/ui/Loading';
import { useGetTeamsQuery } from '../features/team/teamApi';

function Teams() {
    const [showModal, setShowModal] = useState(false);

    const control = (value) => {
        setShowModal(value);
    };

    const { user } = useSelector((state) => state.auth);

    const { data: teams, isLoading, isSuccess, isError } = useGetTeamsQuery(user.email);

    // decide what to render
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }
    if (!isLoading && isError) {
        content = <Error message="Sorry Something Went Wrong" />;
    }
    if (!isLoading && !isError && teams.length === 0) {
        content = <p>Sorry No Team found</p>;
    }
    if (!isLoading && isSuccess && teams.length) {
        content = teams.map((team) => <Team key={team.id} team={team} />);
    }

    return (
        <>
            <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
                <TeamNavbar />

                <div className="px-10 mt-6 flex justify-between">
                    <h1 className="text-2xl font-bold">Teams</h1>
                    <button
                        type="button"
                        className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                        onClick={() => control(!showModal)}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
                    {/* <Team />
					<Team />
					<Team />
					<Team />
					<Team /> */}
                    {content}
                </div>
            </div>
            {showModal && <AddTeamModal control={control} />}
        </>
    );
}

export default Teams;
