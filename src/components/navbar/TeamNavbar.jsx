import { Link } from 'react-router-dom';
import logoLws from '../../assets/images/logo.png';
import Avatar from './Avatar';

export default function TeamNavbar() {
    return (
        <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
            <img src={logoLws} className="h-10 w-10" alt="" />
            <div className="ml-10 grow">
                <Link
                    className="mx-2 text-sm font-semibold text-gray-600 text-indigo-700"
                    to="/teams"
                >
                    Teams
                </Link>
                <Link className="mx-2 text-sm font-semibold hover:text-indigo-700" to="/projects">
                    Projects
                </Link>
            </div>
            <Avatar />
        </div>
    );
}
