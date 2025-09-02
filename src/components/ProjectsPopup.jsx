import { useState, useEffect } from 'react';

// A simple SVG Icon for the GitHub button
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 2.707V6.5a.5.5 0 0 0 1 0v-6z"/>
  </svg>
);

export default function ProjectsPopup({ onClose }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        if (data.length > 0) {
          setSelectedProject(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // ✨ 2. This function handles clicks on the backdrop
  const handleOutsideClick = (e) => {
    // If the clicked element is the overlay itself, close the popup
    if (e.target.id === 'popup-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="popup-overlay"
      onClick={handleOutsideClick} // The event handler is attached here
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in"
    >
      <div className="bg-[#1e1e1e] w-full max-w-4xl h-[80vh] rounded-lg shadow-2xl flex flex-col font-mono text-sm">
        <header className="bg-[#3c3c3c] rounded-t-lg px-4 py-2 flex items-center justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center"
            >
              {/* ✨ 1. The opacity classes are removed to make the 'x' always visible */}
              <span className="text-black/70 text-xs font-bold">
                &times;
              </span>
            </button>
            <span className="w-3.5 h-3.5 bg-yellow-500 rounded-full"></span>
            <span className="w-3.5 h-3.5 bg-green-500 rounded-full"></span>
          </div>

          <span className="text-xs">projects.jsx - My Portfolio</span>
          
          <div></div>{/* Spacer div */}
        </header>

        <div className="flex flex-grow min-h-0">
          <aside className="w-1/3 md:w-1/4 bg-[#252526] p-2 overflow-y-auto">
            <h2 className="text-gray-400 uppercase text-xs font-bold mb-2">Explorer</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left px-2 py-1 rounded text-gray-300 hover:bg-gray-700/50 ${selectedProject?.id === project.id ? 'bg-blue-500/20' : ''}`}
                  >
                    📄 {project.title}.jsx
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          
          <main className="w-2/3 md:w-3/4 bg-[#1e1e1e] p-6 overflow-y-auto text-gray-300">
            {selectedProject ? (
              <div className="animate-fade-in">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto max-h-60 object-cover rounded-md mb-6 border border-gray-700"
                />
                <h3 className="text-2xl font-bold text-cyan-400 mb-3">{selectedProject.title}</h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap mb-6">
                  {selectedProject.description}
                </p>
                {selectedProject.github && (
                  selectedProject.github === 'private' ? (
                    // If github is "private", show a disabled-style button
                    <span
                      className="inline-flex items-center gap-2 bg-gray-800 text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed"
                    >
                      <GitHubIcon />
                      Repository is Private
                    </span>
                  ) : (
                    // Otherwise, if it's a URL, show the link
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                      <GitHubIcon />
                      View on GitHub
                    </a>
                  )
                )}
                {selectedProject.url && (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                  >
                    <ExternalLinkIcon />
                    View Live Site
                  </a>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a project to view details</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}