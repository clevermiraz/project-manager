/* eslint-disable react/jsx-no-undef */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewProjectMutation } from '../../features/project/projectApi';
// import Input from '../Input';
import Modal from './Modal';

function AddProjectModal({ control, assignedTeams }) {
    const [formData, setFormData] = useState({ team: '', title: '' });
    const [addNewProject, { isLoading }] = useAddNewProjectMutation();
    const { email: loggedInUserEmail, avatar: loggedInUserAvatar } = useSelector(
        (state) => state.auth.user
    );
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { target } = e;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isAssigned = assignedTeams
            .map((team) => team.name.toLowerCase())
            .includes(formData.team.toLowerCase());
        if (!isAssigned) {
            setError(true);
            setErrorMsg(`sorry "${formData.team}" or "${formData.team}" isn't exist!! try again`);
            return;
        }
        setError(false);
        setErrorMsg(``);
        addNewProject({
            author: loggedInUserEmail,
            team: formData?.team.toLowerCase(),
            title: formData?.title,
            avatar: loggedInUserAvatar,
            stage: 'backlog',
            createdAt: new Date()
        });
        setFormData({ team: '', title: '' });
        control(false);
    };
    return (
        <Modal control={control}>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="text"
                        name="team"
                        id="Team Name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-600 font-bold dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                        onChange={handleChange}
                        value={formData?.team}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Team Name
                    </label>
                </div>

                {error && <p className="text-xs text-red-500">{errorMsg}</p>}

                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="text"
                        name="title"
                        id="Team Name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-600 font-bold dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                        onChange={handleChange}
                        value={formData?.title}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Title
                    </label>
                </div>

                <div className="text-center text-right mt-4 flex">
                    <button
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mr-2"
                        type="submit"
                    >
                        Create
                    </button>
                    <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        type="button"
                        disabled={isLoading}
                        onClick={() => control(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddProjectModal;
