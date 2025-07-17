import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// The navigation items. The 'id' must match the 'id' of your page sections.
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-1/2 left-8 -translate-y-1/2 z-50">
      <ul className="flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <motion.a
                href={`#${item.id}`}
                className="font-mono text-gray-500 cursor-pointer"
                // --- This is the only line that changed ---
                animate={{
                  scale: isActive ? 1.25 : 1,
                  fontSize: isActive ? '1.5rem' : '1.125rem', // Animate font size
                  color: isActive ? '#3b82f6' : '#6b7280',
                  x: isActive ? 10 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {item.label}
              </motion.a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}