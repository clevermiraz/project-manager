import React, { useEffect, useRef, useState } from 'react';

import AsyncSelect from 'react-select/async';
import { useUpdateTeamMutation } from '../../features/team/teamApi';
import { useGetUsersQuery } from '../../features/user/userApi';
import { debounce, useOnClickOutside } from '../../utils/utils';

export default function AddMemberModal({ control, members, teamId }) {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [defaultOptions, setDefaultOptions] = useState([]);

    const [selectedMember, setSelectedMember] = useState({});
    const { data: users, isSuccess: getUsersSuccess } = useGetUsersQuery();
    const [updatedTeam] = useUpdateTeamMutation();
    const ref = useRef();

    useOnClickOutside(ref, () => {
        control(false);
    });

    // load option
    const loadOption = async (inputValue, callback) => {
        if (getUsersSuccess) {
            const loaderUsers = users
                .map((user) => ({
                    label: user.email.toLowerCase(),
                    value: user.email.toLowerCase()
                }))
                .filter((option) => option.label.toLowerCase().includes(inputValue));
            callback(loaderUsers);
        }
    };

    // option change
    const handleChange = (member) => {
        setSelectedMember(member);

        // exist member
        if (members.includes(member.value)) {
            console.log(member);
            setError(true);
            setErrorMessage('Member already exist');
        } else {
            setError(false);
            setErrorMessage('');
        }
    };

    // set default options
    useEffect(() => {
        if (getUsersSuccess) {
            setDefaultOptions(
                users
                    .filter((u) => !members.includes(u.email))
                    .map((user) => ({
                        label: user.email.toLowerCase(),
                        value: user.email.toLowerCase()
                    }))
                    .slice(0, 3)
            );
        }
    }, [getUsersSuccess, setDefaultOptions, members, users]);

    // submit
    const handleSubmit = (e) => {
        e.preventDefault();
        // handle empty value
        if (!selectedMember?.value?.trim().length || members.includes(selectedMember?.value))
            return;
        updatedTeam({ id: teamId, members: [...members, selectedMember?.value] });
        control(false);
    };

    return (
        <form
            className="absolute top-0 right-0 w-4/6 p-4 bg-white shadow-md"
            onSubmit={handleSubmit}
            ref={ref}
        >
            <AsyncSelect
                noOptionsMessage={() => 'not found'}
                defaultOptions={defaultOptions}
                backspaceRemovesValue
                loadingMessage={() => 'searching...'}
                loadOptions={debounce(loadOption, 500)}
                hideSelectedOptions
                placeholder="Type email"
                isSearchable
                onChange={handleChange}
                className="text-xs"
            />
            {error && <p className="text-xs leading-xs text-red-800">{errorMessage}</p>}
            <div className="text-center text-right mt-2 flex">
                <button
                    className="inline-block w-auto px-2 py-1 py-2 bg-violet-700 rounded font-semibold text-sm order-1 text-xs leading-3 text-zinc-50"
                    type="submit"
                >
                    Add
                </button>
                <button
                    className="ml-2 inline-block w-auto px-2 py-1 py-1 bg-rose-600 rounded font-semibold text-sm order-1 text-xs leading-3"
                    type="button"
                    onClick={() => control(false)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
