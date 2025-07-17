/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
  'Booting FURQON.OS v1.0 (Kernel 20.25)...',
  '[ INFO ] Memory check: 16GB (8GB for code, 8GB for creativity).',
  '[ OK ] CPU (Cognitive Processing Unit) initialized.',
  '[ OK ] Found device: /dev/frontend (React, Tailwind)',
  '[ OK ] Found device: /dev/backend (Node.js, Express)',
  '[ OK ] Starting service: AI_Engine (PyTorch)...',
  '[ OK ] Starting service: Database_Manager (PostgreSQL & MongoDB)...',
  '[ OK ] Starting service: Lifelong_Learning_Daemon...',
  '[ INFO ] Mounting filesystem: /dev/projects...',
  '[ OK ] All checks passed. Systems are go.',
  '[ OK ] Reached target: Graphical User Interface.',
  '> Welcome.',
];

const renderLine = (line) => {
  if (line.startsWith('[ OK ]')) {
    return (
      <>
        <span className="text-cyan-400">[ OK ]</span>
        {line.substring(6)}
      </>
    );
  }
  if (line.startsWith('[ INFO ]')) {
    return (
      <>
        <span className="text-yellow-400">[ INFO ]</span>
        {line.substring(8)}
      </>
    );
  }
  return line;
};

export default function Loader({ onLoadingComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Create an array to hold all of our timer IDs
    const timeoutIds = [];
    
    // 2. Schedule each line to appear with a staggered delay
    bootLines.forEach((line, index) => {
      const delay = 120 * (index + 1); // Stagger each line by 120ms
      const id = setTimeout(() => {
        setVisibleLines(prevLines => [...prevLines, line]);
      }, delay);
      timeoutIds.push(id);
    });

    // 3. Schedule the final "onLoadingComplete" call
    const finalTimeoutId = setTimeout(() => {
      onLoadingComplete();
    }, 120 * bootLines.length + 800);
    timeoutIds.push(finalTimeoutId);

    // 4. The cleanup function now clears every single scheduled timeout
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []); // The empty dependency array is correct

  // This effect for auto-scrolling remains the same
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <motion.div
      ref={containerRef}
      className="bg-black text-green-400 w-full h-screen p-4 md:p-8 font-mono text-sm md:text-base overflow-y-auto no-scrollbar"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {visibleLines.map((line, index) => (
        <div key={index}>
          {renderLine(line)}
        </div>
      ))}
    </motion.div>
  );
}