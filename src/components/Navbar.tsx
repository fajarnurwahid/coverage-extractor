import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-b-neutral-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to={"/"} className="font-bold text-xl text-indigo-600">
                        Coveractor
                    </Link>
                    <Link to={"/"} className="font-medium text-sm">
                        Github
                    </Link>
                </div>
            </div>
        </nav>
    );
}
