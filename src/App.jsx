import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar';
import ProjectsPopup from './components/ProjectsPopup';
import Loader from './components/Loader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection'; // 1. Import the new component
import ContactSection from './components/ContactSection';

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
          className='bg-black text-white'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Navbar />
          <main>
            
            {/* Hero Section */}
            <div id="home" className='min-h-screen flex items-center justify-center p-4'>
              <div className="w-full flex justify-center items-center">
                <HeroSection startAnimation={!loading} />
              </div>
              {/* 2. The old button that was here has been removed */}
            </div>

            {/* About Section */}
            <AboutSection />

            {/* 3. Add the new ProjectsSection here and pass the function to open the popup */}
            <ProjectsSection onOpenPopup={() => setIsPopupOpen(true)} />
            
            <ContactSection />

          </main>

          {isPopupOpen && <ProjectsPopup onClose={() => setIsPopupOpen(false)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;