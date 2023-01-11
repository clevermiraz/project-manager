/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useUpdateProjectMutation } from '../features/project/projectApi';
import Project from './Project';

function Column({ projects: allProject, stage, control }) {
    const [projects, setProjects] = useState([]);
    const [updateProject] = useUpdateProjectMutation();
    const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);
    const { searchString } = useSelector((state) => state.projects);

    // dnd
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'card',
        drop: (item, monitor) =>
            updateProject({ id: item.id, email: loggedInUserEmail, stage: stage.toLowerCase() }),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    // search
    const search = (string) => (project) => {
        if (!string?.trim().length) return project;
        return project.title.match(string)
            ? { ...project, match: true }
            : { ...project, match: false };
    };
    // filter by stage
    const filterProjectByStage = (stage) => (project) => project.stage === stage;

    // search
    useEffect(() => {
        const filteredProjects =
            allProject
                ?.map(search(searchString))
                .filter(filterProjectByStage(stage.toLowerCase())) || [];
        setProjects(filteredProjects);
    }, [allProject, searchString, stage]);

    return (
        <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">{stage}</span>
                <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                    {projects?.length}
                </span>
                {stage.toLowerCase() === 'backlog' && (
                    <button
                        type="button"
                        className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                        onClick={() => control(true)}
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
                )}
            </div>
            <div
                className={`flex flex-col pb-2 overflow-auto scrollbar min-h ${
                    isOver && 'bg-indigo-300'
                }`}
                ref={drop}
                style={{ minHeight: '80vh' }}
            >
                {projects?.map((project) => (
                    <Project key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Column;
