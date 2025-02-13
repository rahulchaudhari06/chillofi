export default function Navbar() {
    return (
        <nav  className="bg-inherit text-white p-4  ">
            <div className="container mx-auto flex justify-between items-center">
                
                <a href="#" className="text-xl font-bold">Resoundly</a>
                                
                <ul className="flex space-x-6">
                    <li><a href="#" className="hover:text-gray-300">gh</a></li>
                    <li><a href="#" className="hover:text-gray-300">x</a></li>
                    <li><a href="#" className="hover:text-gray-300">pomo</a></li>
                    <li><a href="#" className="hover:text-gray-300">todo</a></li>
                </ul>
            </div>
        </nav>
    );
}
