import { motion } from 'framer-motion';
import LogoCarousel from './LogoCarousel';

export default function AboutSection() {
  // Animation variants for scroll-triggered animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 px-4">
      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* --- Top Section: Image + Text --- */}
        <motion.div className="flex flex-col md:flex-row items-center gap-12" variants={itemVariants}>
          {/* Image Column */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="https://i.pravatar.cc/300?img=1" 
              alt="Furqon" 
              className="w-64 h-64 rounded-full md:rounded-lg object-cover shadow-lg"
            />
          </div>
          
          {/* Text Column */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Fullstack Developer and AI Engineer with a knack for building robust and scalable web applications. I love turning complex problems into simple, beautiful, and intuitive designs. 
              <br/><br/>
              Whether it's crafting a seamless user experience with React and Tailwind CSS or developing intelligent backend systems with Python and Node.js, I thrive on the challenge of bringing ideas to life.
            </p>
          </div>
        </motion.div>

        {/* --- Bottom Section: Tools Carousel --- */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-400">Tools & Technologies I Use</h3>
          <LogoCarousel />
        </motion.div>
      </motion.div>
    </section>
  );
}