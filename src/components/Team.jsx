/* eslint-disable react/no-array-index-key */
import gravatarUrl from 'gravatar-url';
import React, { useRef, useState } from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';
import deleteImg from '../assets/images/delete.png';
import { useDeleteTeamMutation } from '../features/team/teamApi';
import { hexToRGB, useOnClickOutside } from '../utils/utils';
import AddMemberModal from './modals/AddMemberModal';

export default function Team({ team }) {
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const { name, title, createdAt, members, id, author, color } = team || {};
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef();
    const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteTeam, { isLoading }] = useDeleteTeamMutation();
    const control = (value) => {
        setShowAddMemberForm(value);
    };

    useOnClickOutside(menuRef, () => {
        if (showMenu) {
            setShowMenu(false);
        }
    });

    const handleDeleteTeam = () => {
        if (author.email !== loggedInUserEmail) {
            setDeleteError(true);
            setTimeout(() => {
                setDeleteError(false);
            }, 3000);

            return;
        }

        deleteTeam({ id, email: loggedInUserEmail });
        setShowMenu(false);
    };

    return (
        <div
            className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
            draggable="true"
        >
            <button
                type="button"
                className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                onClick={() => setShowMenu(!showMenu)}
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
            <span
                className="flex items-center h-6 px-3 text-xs font-semibold text-green-500 bg-green-100 rounded-full"
                style={{ backgroundColor: hexToRGB(color, 0.2), color: hexToRGB(color) }}
            >
                {name}
            </span>
            <div className="members mt-2 flex items-center flex-wrap">
                {members.map((avatar, index) => (
                    <div key={index}>
                        <img
                            src={gravatarUrl(avatar, { size: 80 })}
                            alt=""
                            className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                        />
                    </div>
                ))}
            </div>
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
            </div>

            {showMenu && (
                <>
                    <div
                        className="bg-white border border border-slate-500	absolute right-2 top-2"
                        ref={menuRef}
                    >
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

                        <button
                            type="button"
                            className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100 mt-4"
                            disabled={isLoading}
                            onClick={handleDeleteTeam}
                        >
                            <img src={deleteImg} alt="" />
                        </button>
                    </div>
                    {deleteError && (
                        <p className="absolute right-2 bottom-2 text-xs leading-xs text-red-500">
                            You are Not the Creator of that Team
                        </p>
                    )}
                </>
            )}

            {showAddMemberForm && (
                <AddMemberModal control={control} members={members} teamId={id} />
            )}
        </div>
    );
}
