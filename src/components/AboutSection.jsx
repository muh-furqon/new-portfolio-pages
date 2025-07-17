/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

// 1. Tool data is now inside this component
const tools = [
  { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'PHP', url: 'https://cdn.simpleicons.org/PHP/777BB4' },
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Tailwind CSS', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Laravel', url: 'https://cdn.simpleicons.org/Laravel/FF2D20' },
  { name: 'Cypress', url: 'https://cdn.simpleicons.org/Cypress/69D3A7' },
  { name: 'Selenium', url: 'https://cdn.simpleicons.org/Selenium/43B02A' },
  { name: 'jest', url: 'https://cdn.simpleicons.org/jest/C21325' },
];


export default function AboutSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
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
        {/* --- Top Section: Image + Text (no changes here) --- */}
        <motion.div className="flex flex-col md:flex-row items-center gap-12" variants={itemVariants}>
          <div className="w-full md:w-1/3 flex justify-center">
            <img 
              src="https://i.pravatar.cc/300?img=1" 
              alt="Furqon" 
              className="w-64 h-64 rounded-full md:rounded-lg object-cover shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Fullstack Developer and AI Engineer with a knack for building robust and scalable web applications. I love turning complex problems into simple, beautiful, and intuitive designs. 
              <br/><br/>
              Whether it's crafting a seamless user experience with React and Tailwind CSS or developing intelligent backend systems with Python and Node.js, I thrive on the challenge of bringing ideas to life.
            </p>
          </div>
        </motion.div>

        {/* --- Bottom Section: Tools Grid --- */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-400">Tools & Technologies I Use</h3>
          
          {/* 2. The LogoCarousel is replaced with a responsive grid container */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8">
            {/* 3. We map over the tools, and each item gets the animation variants */}
            {tools.map((tool, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-lg"
              >
                <img src={tool.url} alt={tool.name} className="h-12 w-12" />
                <span className="text-sm text-gray-400 mt-2 text-center">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}