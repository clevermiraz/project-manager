import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddTeamMutation } from '../../features/team/teamApi';
import Modal from './Modal';

function AddTeamModal({ control }) {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const { user } = useSelector((state) => state.auth);

    const [addTeam, { isLoading }] = useAddTeamMutation(user?.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim().length && title.trim().length && color.trim().length) {
            addTeam({
                name: name.toLowerCase(),
                title,
                color,
                author: user,
                members: [user?.email],
                createdAt: new Date()
            });
            control(false);
        }
    };

    return (
        <Modal control={control}>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="text"
                        name="Team Name"
                        id="Team Name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-600 font-bold dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Team Name
                    </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-600 font-bold dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                        placeholder="Title: Best Tech Team"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Title
                    </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="text"
                        name="color"
                        id="color"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-blue-600 font-bold dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                        placeholder="Color: #e91e63 for pink"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-white-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Color
                    </label>
                </div>

                <div className="text-center text-right mt-4 flex">
                    <button
                        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mr-2"
                        type="submit"
                        disabled={isLoading}
                    >
                        Create
                    </button>
                    <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        type="button"
                        onClick={() => control(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddTeamModal;
