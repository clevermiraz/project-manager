import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logoLws from '../assets/images/logo.png';
import Avatar from '../components/navbar/Avatar';
import ProjectBoard from '../components/ProjectBoard';
import { search } from '../features/project/projectSlice';

function Projects() {
    const dispatch = useDispatch();

    const debounce = (fn, delay) => {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const handleSearch = (e) => {
        dispatch(search(e.target.value));
    };
    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
                <img src={logoLws} className="h-10 w-10" alt="" />
                <input
                    className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                    type="search"
                    placeholder="Search for anything…"
                    onChange={debounce(handleSearch, 400)}
                />
                <div className="ml-10 grow">
                    <Link
                        className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                        to="/teams"
                    >
                        Teams
                    </Link>
                    <Link className="mx-2 text-sm font-semibold text-indigo-700" to="/projects">
                        Projects
                    </Link>
                </div>
                <Avatar />
            </div>
            <div className="px-10 mt-6">
                <h1 className="text-2xl font-bold">Project Board</h1>
            </div>
            <DndProvider backend={HTML5Backend}>
                <ProjectBoard />
            </DndProvider>
        </div>
    );
}

export default Projects;
