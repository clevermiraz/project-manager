import moment from 'moment';
import React, { useRef, useState } from 'react';

import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useDeleteProjectMutation } from '../features/project/projectApi';
import { hexToRGB, useOnClickOutside } from '../utils/utils';

export default function Project({ project }) {
    const [showMenu, setShowMenu] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const ref = useRef();
    const [deleteProject] = useDeleteProjectMutation();
    const { team: teamName, title, createdAt, stage, id, author, match, color, avatar } = project;
    const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);

    useOnClickOutside(ref, () => {
        if (showMenu) {
            setShowMenu(false);
        }
    });

    const handleDeleteProject = () => {
        if (author !== loggedInUserEmail) {
            setDeleteError(true);
            setTimeout(() => {
                setDeleteError(false);
            }, 3000);
        } else {
            deleteProject({ id, author });
            setShowMenu(false);
        }
    };

    // dnd
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: { id, stage },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return (
        <div
            className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${
                match && 'border-2 border-indigo-600'
            }  ${isDragging ? 'opacity-50' : null}`}
            draggable="true"
            ref={drag}
        >
            {stage === 'backlog' && (
                <>
                    <button
                        className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                        onClick={() => setShowMenu(!showMenu)}
                        type="button"
                    >
                        <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </button>
                    {showMenu && (
                        <div>
                            <button
                                type="button"
                                ref={ref}
                                className="absolute top-2 right-2 text-xs leading-xs bg-red-200 text-red-600 py-1 px-2 rounded-full"
                                onClick={handleDeleteProject}
                            >
                                delete
                            </button>
                            {deleteError && (
                                <p className="absolute right-2 bottom-2 text-xs leading-xs text-red-500">
                                    Only author can delete team
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}

            <span
                className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full"
                style={{ backgroundColor: hexToRGB(color, 0.2), color: hexToRGB(color) }}
            >
                {teamName}
            </span>
            <h4 className="mt-3 text-sm font-medium">{title}</h4>
            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                <div className="flex items-center">
                    <svg
                        className="w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="ml-1 leading-none">
                        {moment(createdAt).format('MMM Do YY')}
                    </span>
                </div>
                <img
                    className="w-6 h-6 ml-auto rounded-full"
                    src={
                        avatar.match('https://')
                            ? avatar
                            : 'https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png'
                    }
                    alt=""
                />
            </div>
        </div>
    );
}
