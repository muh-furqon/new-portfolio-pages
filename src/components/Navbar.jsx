const Navbar = () => {
    return(
        <nav className="flex items-center justify-between bg-black h-16 w-screen px-52">
            <span className="font-mono text-2xl text-white">muh-furqon</span>
            <div className="flex gap-x-8">
                <span className="font-mono text-blue-500 cursor-pointer hover:text-blue-300">about</span>
                <span className="font-mono text-blue-500 cursor-pointer hover:text-blue-300">experience</span>
                <span className="font-mono text-blue-500 cursor-pointer hover:text-blue-300">project</span>
                <span className="font-mono text-blue-500 cursor-pointer hover:text-blue-300">contact</span>
            </div>
        </nav>
    )
}

export default Navbar