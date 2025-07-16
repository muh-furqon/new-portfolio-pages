import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar';
import ProjectsPopup from './components/ProjectsPopup';
import Loader from './components/Loader';
import HeroSection from './components/HeroSection';

function App() {
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" onLoadingComplete={() => setLoading(false)} />
      ) : (
        <motion.div
          key="main-content"
          className='bg-black text-white min-h-screen flex flex-col'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Navbar />
          <main className='grow flex flex-col items-center justify-center p-4'>
            <div className='flex items-center justify-center w-full max-w-5xl'>
              <HeroSection startAnimation={!loading} />
              
              <div className='w-1/2 flex items-center justify-center'>
                <img src="https://i.pravatar.cc/300?img=1" className="rounded-full" alt="avatar" />
              </div>
            </div>

            <div className='mt-16'>
              <button
                onClick={() => setIsPopupOpen(true)}
                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105'
              >
                View Other Projects
              </button>
            </div>
          </main>

          {isPopupOpen && <ProjectsPopup onClose={() => setIsPopupOpen(false)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;