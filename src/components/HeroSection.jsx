/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAnimate } from 'motion/react';

export default function HeroSection({ startAnimation }) {
  const [scope, animate] = useAnimate();

  const mainTitle = "Hi, I'm Furqon";
  const subStrings = ['A Fullstack Developer', 'An AI Engineer'];

  useEffect(() => {
    if (startAnimation) {
      const typeText = async (textSelector, cursorSelector) => {
        const element = scope.current.querySelector(textSelector);
        const cursor = scope.current.querySelector(cursorSelector);
        const chars = element.querySelectorAll('.char');
        
        animate(cursor, { opacity: [1, 0] }, { duration: 0.8, repeat: Infinity });

        for (let i = 0; i < chars.length; i++) {
          const char = chars[i];
          animate(char, { opacity: 1 }, { duration: 0 });
          animate(cursor, { left: `${char.offsetLeft + char.offsetWidth}px` }, { duration: 0 });
          await new Promise(resolve => setTimeout(resolve, 80));
        }
      };

      const deleteText = async (textSelector, cursorSelector) => {
        const element = scope.current.querySelector(textSelector);
        const cursor = scope.current.querySelector(cursorSelector);
        const chars = element.querySelectorAll('.char');

        for (let i = chars.length - 1; i >= 0; i--) {
          const char = chars[i];
          animate(char, { opacity: 0 }, { duration: 0 });
          const prevChar = chars[i-1];
          if (prevChar) {
            animate(cursor, { left: `${prevChar.offsetLeft + prevChar.offsetWidth}px` }, { duration: 0 });
          } else {
            animate(cursor, { left: "0px" }, { duration: 0 });
          }
          await new Promise(resolve => setTimeout(resolve, 40));
        }
      };

      const animationSequence = async () => {
        await typeText('#main-title', '#cursor-main');
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
    <div className='w-1/2' ref={scope}>
      <h1 id="main-title" className='text-5xl font-mono h-20 whitespace-nowrap flex items-center relative'>
        {mainTitle.split('').map((char, index) => (
          <span key={index} className="char" style={{ opacity: 0 }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {/* FIX 1: Add centering classes to align with flex text */}
        <span 
          id="cursor-main" 
          className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-white' 
        />
      </h1>

      <h1 className='text-3xl font-mono text-blue-400 h-12 relative'>
        {subStrings.map((str, strIndex) => (
          <span key={strIndex} id={`subtitle-${strIndex}`} className="absolute left-0 top-0 whitespace-nowrap flex items-center h-full">
            {str.split('').map((char, charIndex) => (
              <span key={charIndex} className="char" style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
        {/* FIX 2: Change height to h-9 (36px) to match text-3xl line-height */}
        <span 
          id="cursor-sub" 
          className='absolute left-0 top-0 w-1 h-9 bg-blue-400' 
          style={{ opacity: 0 }}
        />
      </h1>
    </div>
  );
}