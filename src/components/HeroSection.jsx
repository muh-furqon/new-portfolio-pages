/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAnimate } from 'motion/react';

export default function HeroSection({ startAnimation }) {
  const [scope, animate] = useAnimate();

  const mainTitle = "Hi, I'm Furqon";
  const subStrings = ['A Fullstack Developer', 'An AI Engineer'];

  const longestSubtitle = subStrings.reduce((a, b) => a.length > b.length ? a : b);

  useEffect(() => {
    if (startAnimation) {
      // --- This is our new, more robust typing function ---
      const typeText = async (textSelector, cursorSelector) => {
        const textElement = scope.current.querySelector(textSelector);
        const cursorElement = scope.current.querySelector(cursorSelector);
        const chars = textElement.querySelectorAll('.char');
        
        // --- We will measure positions relative to the subtitle container ---
        const containerElement = scope.current.querySelector('.subtitle-container');
        const containerRect = containerElement.getBoundingClientRect();

        animate(cursorElement, { opacity: [1, 0] }, { duration: 0.8, repeat: Infinity });

        for (const char of chars) {
          animate(char, { opacity: 1 }, { duration: 0 });
          
          const charRect = char.getBoundingClientRect();
          // --- New Calculation: (char's left - container's left) + char's width ---
          const left = charRect.left - containerRect.left + charRect.width;
          animate(cursorElement, { left: `${left}px` }, { duration: 0 });

          await new Promise(resolve => setTimeout(resolve, 80));
        }
      };

      // --- We'll also update the delete function with the same logic ---
      const deleteText = async (textSelector, cursorSelector) => {
        const textElement = scope.current.querySelector(textSelector);
        const cursorElement = scope.current.querySelector(cursorSelector);
        const chars = Array.from(textElement.querySelectorAll('.char'));
        
        const containerElement = scope.current.querySelector('.subtitle-container');
        const containerRect = containerElement.getBoundingClientRect();

        for (const char of chars.reverse()) {
          animate(char, { opacity: 0 }, { duration: 0 });

          const prevChar = char.previousElementSibling;
          let left = containerElement.querySelector('#ghost-subtitle').offsetLeft;

          if (prevChar) {
            const prevCharRect = prevChar.getBoundingClientRect();
            // --- New Calculation for the previous character ---
            left = prevCharRect.left - containerRect.left + prevCharRect.width;
          }
          
          animate(cursorElement, { left: `${left}px` }, { duration: 0 });
          await new Promise(resolve => setTimeout(resolve, 40));
        }
      };

      // This animation sequence remains the same
      const animationSequence = async () => {
        // The main title animation doesn't have this bug, so we can use the old logic
        // For simplicity, we create a temporary function for it.
        const oldTypeText = async (selector) => {
            const el = scope.current.querySelector(selector);
            const cursor = scope.current.querySelector("#cursor-main");
            const elChars = el.querySelectorAll('.char');
            for(const char of elChars) {
                animate(char, { opacity: 1 }, { duration: 0 });
                animate(cursor, { left: `${char.offsetLeft + char.offsetWidth}px` }, { duration: 0 });
                await new Promise(r => setTimeout(r, 80));
            }
        }
        await oldTypeText('#main-title');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        animate('#cursor-main', { opacity: 0 }, { duration: 0.3 });

        let stringIndex = 0;
        while (true) {
          const subTextSelector = `#subtitle-${stringIndex}`;
          await typeText(subTextSelector, '#cursor-sub');
          await new Promise(resolve => setTimeout(resolve, 1500));
          await deleteText(subTextSelector, '#cursor-sub');
          await new Promise(resolve => setTimeout(resolve, 500));
          stringIndex = (stringIndex + 1) % subStrings.length;
        }
      };

      animationSequence();
    }
  }, [startAnimation]);

  return (
    <div ref={scope} className="flex flex-col items-center">
      <h1 id="main-title" className='text-5xl font-mono h-20 whitespace-nowrap flex items-center justify-center relative'>
        {mainTitle.split('').map((char, index) => (
          <span key={index} className="char" style={{ opacity: 0 }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        <span 
          id="cursor-main" 
          className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-white' 
        />
      </h1>

      {/* --- Add a unique class to the subtitle H1 for easy selection --- */}
      <h1 className='subtitle-container text-3xl font-mono text-blue-400 h-12 relative flex justify-center items-center'>
        <span id="ghost-subtitle" className="opacity-0 whitespace-nowrap">{longestSubtitle}</span>
        
        {subStrings.map((str, strIndex) => (
          <span key={strIndex} id={`subtitle-${strIndex}`} className="absolute whitespace-nowrap">
            {str.split('').map((char, charIndex) => (
              <span key={charIndex} className="char" style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
        
        <span 
          id="cursor-sub" 
          className='absolute left-0 top-0 w-1 h-9 bg-blue-400' 
          style={{ opacity: 0 }}
        />
      </h1>
    </div>
  );
}