/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProjectsQuery } from '../features/project/projectApi';
import { setAssignedProjectsQuery } from '../features/project/projectSlice';
import { useGetTeamsQuery } from '../features/team/teamApi';
import Column from './Column';
import AddProjectModal from './modals/AddProjectModal';
import Error from './ui/Error';
import Loading from './ui/Loading';

function ProjectBoard() {
    const [isSkip, setIsSkip] = useState(true);
    const { email: loggedInUserEmail } = useSelector((state) => state?.auth?.user) || {};
    const { assignedProjectsQuery } = useSelector((state) => state.projects);
    const dispatch = useDispatch();
    const [projects, setProjects] = useState([]);

    // fetch Assign project
    const {
        data: allProjects,
        isSuccess,
        isError,
        isLoading
    } = useFetchProjectsQuery(
        { assignedProjectsQuery, sort: 'id', order: 'desc' },
        {
            skip: isSkip,
            refetchOnMountOrArgChange: true
        }
    );

    // get assigned teams
    const {
        data: teams,
        isLoading: teamsLoading,
        isSuccess: teamsLoadingSuccess
    } = useGetTeamsQuery(loggedInUserEmail);

    // set assigned Teams query to store
    useEffect(() => {
        if (!teamsLoading && teamsLoadingSuccess && teams?.length) {
            const assignedTeamsQuery = teams
                ?.map((team) => `team=${team.name.toLowerCase()}`)
                .join('&');
            dispatch(setAssignedProjectsQuery(assignedTeamsQuery));
            setIsSkip(false);
        }
    }, [teams, teamsLoading, teamsLoadingSuccess, dispatch]);

    // transform project to put the correct team color
    useEffect(() => {
        const newprojects = allProjects?.map((project) => {
            for (const { name, color } of teams) {
                if (name === project.team) {
                    project = { ...project, color };
                }
            }
            return project;
        });

        setProjects(newprojects);
    }, [allProjects, teams]);

    // control modal
    const [showModal, setShowModal] = useState(false);
    const control = (value) => {
        setShowModal(value);
    };

    return (
        <>
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                {isLoading && <Loading />}
                {!isLoading && isError && <Error message="some thing went wrong" />}

                {!isError && isSuccess && (
                    <>
                        <Column projects={projects} stage="Backlog" control={control} />
                        <Column projects={projects} stage="Ready" />
                        <Column projects={projects} stage="Doing" />
                        <Column projects={projects} stage="Review" />
                        <Column projects={projects} stage="Blocked" />
                        <Column projects={projects} stage="Done" />
                    </>
                )}
            </div>

            {showModal && <AddProjectModal control={control} assignedTeams={teams} />}
        </>
    );
}

export default ProjectBoard;
