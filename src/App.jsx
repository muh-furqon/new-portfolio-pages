import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar';
import ProjectsPopup from './components/ProjectsPopup';
import Loader from './components/Loader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection'; // 1. Import the new component

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
          className='bg-black text-white' // Removed min-h-screen to allow scrolling
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Navbar />
          <main> {/* Simplified main tag */}
            
            {/* --- Hero Section Container --- */}
            <div className='min-h-screen flex flex-col items-center justify-center p-4'>
              <div className='flex items-center justify-center w-full max-w-5xl'>
                <div className="w-full flex justify-center items-center">
                  <HeroSection startAnimation={!loading} />
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
            </div>

            {/* 2. Add the AboutSection here */}
            <AboutSection />

          </main>

          {isPopupOpen && <ProjectsPopup onClose={() => setIsPopupOpen(false)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;