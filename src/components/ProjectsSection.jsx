import { motion } from 'framer-motion';

const featuredProjects = [
  {
    title: 'AI-Powered Chatbot',
    description: 'A customer service chatbot using natural language processing to understand and respond to user queries in real-time.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470',
    tags: ['Python', 'PyTorch', 'React'],
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce site with features like product search, cart management, and a secure checkout process.',
    image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1472',
    tags: ['Node.js', 'React', 'PostgreSQL'],
  },
  {
    title: 'Portfolio Website V1',
    description: 'My first personal portfolio website, built from the ground up to showcase my skills and projects in a creative way.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1470',
    tags: ['JavaScript', 'HTML', 'CSS'],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsSection({ onOpenPopup }) {
  return (
    <section id="projects" className="py-24 px-4 bg-gray-900/50">
      <motion.div
        className="max-w-5xl mx-auto flex flex-col items-center gap-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-blue-400"
          variants={itemVariants}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          variants={sectionVariants}
        >
          {featuredProjects.map((project, index) => (
            // 1. Changed motion.div to motion.a and added href="#"
            <motion.a
              key={index}
              href="#"
              className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              variants={itemVariants}
              // 2. Added whileHover and transition props for the hover effect
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <button
            onClick={onOpenPopup}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105'
          >
            View All Projects
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}