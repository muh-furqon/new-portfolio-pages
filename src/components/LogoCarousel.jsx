// The list of your tools and languages
const tools = [
  { name: 'React', url: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Python', url: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'Tailwind CSS', url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Framer Motion', url: 'https://cdn.simpleicons.org/framer/0055FF' },
  { name: 'PostgreSQL', url: 'https://cdn.simpleicons.org/postgresql/4169E1' },
];

export default function LogoCarousel() {
  return (
    // 1. The Outer "Mask" Container
    <div
      className="w-full overflow-hidden py-12"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
    >
      {/* 2. The Inner "Scrolling Track" that contains both lists */}
      <div className="flex animate-infinite-scroll">
        {/* The first list of logos */}
        {tools.map((tool, index) => (
          <div key={`tool-a-${index}`} className="flex-shrink-0 flex flex-col items-center justify-center px-8">
            <img src={tool.url} alt={tool.name} className="h-12 w-12" />
            <span className="text-sm text-gray-400 mt-2">{tool.name}</span>
          </div>
        ))}
        
        {/* The second, duplicated list of logos */}
        {tools.map((tool, index) => (
          <div key={`tool-b-${index}`} className="flex-shrink-0 flex flex-col items-center justify-center px-8" aria-hidden="true">
            <img src={tool.url} alt={tool.name} className="h-12 w-12" />
            <span className="text-sm text-gray-400 mt-2">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}