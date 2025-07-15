import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import ProjectsPopup from './components/ProjectsPopup'; // Import the popup component

function App() {
  // State for the main title
  const [mainText, setMainText] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);

  // State for the looping subtitle
  const [subText, setSubText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State for the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const mainStringToType = "Hi, I'm Furqon";
  const subStringsToType = ['A Fullstack Developer', 'An AI Engineer'];
  const typingDelay = 75;
  const subtitleTypingDelay = 100;
  const subtitleDeletingDelay = 50;
  const pauseDelay = 1500;

  // Effect for the main title: "Hi, I'm Furqon"
  useEffect(() => {
    if (mainText.length < mainStringToType.length) {
      const timeoutId = setTimeout(() => {
        setMainText(mainStringToType.slice(0, mainText.length + 1));
      }, typingDelay);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => setTypingFinished(true), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [mainText]);

  // Effect for the looping subtitle
  useEffect(() => {
    if (!typingFinished) return;
    const currentString = subStringsToType[stringIndex];
    const handleTyping = () => {
      if (isDeleting) {
        setSubText(prev => prev.slice(0, -1));
      } else {
        setSubText(prev => currentString.slice(0, prev.length + 1));
      }
    };
    if (!isDeleting && subText === currentString) {
      const timeoutId = setTimeout(() => setIsDeleting(true), pauseDelay);
      return () => clearTimeout(timeoutId);
    }
    if (isDeleting && subText === '') {
      setIsDeleting(false);
      setStringIndex(prev => (prev + 1) % subStringsToType.length);
      return;
    }
    const timeoutId = setTimeout(handleTyping, isDeleting ? subtitleDeletingDelay : subtitleTypingDelay);
    return () => clearTimeout(timeoutId);
  }, [subText, stringIndex, isDeleting, typingFinished]);

  return (
    <div className='bg-black text-white min-h-screen flex flex-col'>
      <Navbar />
      <main className='grow flex flex-col items-center justify-center p-4'>
        <div className='flex items-center justify-center w-full max-w-5xl'>
            {/* Left Column: Text */}
            <div className='w-1/2'>
                <h1 className='text-5xl font-mono h-20 whitespace-nowrap'>
                    {mainText}
                    {!typingFinished && <span className='blinking-cursor'>|</span>}
                </h1>
                <h1 className='text-3xl font-mono text-blue-400 h-12'>
                    {subText}
                    {typingFinished && <span className='blinking-cursor'>|</span>}
                </h1>
            </div>
            {/* Right Column: Avatar */}
            <div className='w-1/2 flex items-center justify-center'>
                <img src="https://i.pravatar.cc/300?img=1" className="rounded-full" alt="avatar" />
            </div>
        </div>

        {/* --- Button to Open Popup --- */}
        <div className='mt-16'>
            <button
                onClick={() => setIsPopupOpen(true)}
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105'
            >
                View Other Projects
            </button>
        </div>
      </main>

      {/* --- Conditionally render the popup --- */}
      {isPopupOpen && <ProjectsPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default App;