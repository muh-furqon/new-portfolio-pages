/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// The list of all lines to be displayed in the boot sequence
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

// A helper function to parse and style each line
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
  // State to hold the lines that are currently visible
  const [visibleLines, setVisibleLines] = useState([]);
  const containerRef = useRef(null);

  // This effect runs the animation sequence
  useEffect(() => {
    let timeoutId;
    const animationSequence = async () => {
      // Use a for...of loop to add lines one by one
      for (let i = 0; i < bootLines.length; i++) {
        const line = bootLines[i];
        // A random delay to make it feel more authentic
        const delay = Math.random() * 150 + 50;
        await new Promise(resolve => setTimeout(resolve, delay));
        setVisibleLines(prevLines => [...prevLines, line]);
      }
      // Wait before calling the completion callback
      await new Promise(resolve => setTimeout(resolve, 800));
      onLoadingComplete();
    };

    animationSequence();

    return () => clearTimeout(timeoutId);
  }, []);

  // This effect handles auto-scrolling to the bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <motion.div
      ref={containerRef}
      // Add the 'no-scrollbar' class here
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