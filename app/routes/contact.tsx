import { type MetaFunction } from "@remix-run/node";
import Navbar from 'app/components/navbar';
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Adam Timur Aslan" },
    { name: "description", content: "Get in touch with Adam Timur Aslan" },
  ];
};

export default function Contact() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  
  // Floating text animation
  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    
    let position = 0;
    const speed = 0.5;
    
    const animate = () => {
      position += speed;
      element.style.transform = `translateY(${Math.sin(position * 0.05) * 10}px)`;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Track mouse/touch position for the interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setCursorPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Fun confetti effect on click
  const triggerConfetti = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };
  
  return (
    <>
      <Navbar
        links={[
          { href: "/", text: "Home" },
          { href: "/about", text: "About" },
          { href: "/contact", text: "Contact" }
        ]}
        logo={<div className="text-white font-bold">LOGO</div>}
      />
      
      {/* Fun confetti overlay */}
      {clicked && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 2})`,
                opacity: Math.random(),
                animation: `fall ${1 + Math.random() * 3}s linear forwards`
              }}
            />
          ))}
        </div>
      )}
      
      <div 
        className="min-h-screen relative overflow-hidden font-serif"
        style={{
          background: "linear-gradient(125deg, #ff00cc, #3333ff, #00ccff, #33cc33, #ff6600)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite"
        }}
      >
        {/* Custom animations */}
        <style jsx global>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          
          @keyframes fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }

          /* Parallax effect for moving elements based on cursor */
          .parallax {
            transition: transform 0.2s ease-out;
          }
        `}</style>
        
        {/* Interactive floating shapes in background */}
        <div 
          className="absolute h-32 w-32 bg-pink-500 opacity-20 rounded-full top-20 left-20 parallax"
          style={{ 
            animation: "float 8s ease-in-out infinite",
            transform: `translate(${(cursorPosition.x - window.innerWidth/2) / 30}px, ${(cursorPosition.y - window.innerHeight/2) / 30}px)`
          }}
        />
        <div 
          className="absolute h-40 w-40 bg-yellow-300 opacity-10 top-60 right-40 parallax"
          style={{ 
            animation: "float 12s ease-in-out infinite, spin 20s linear infinite",
            transform: `translate(${-(cursorPosition.x - window.innerWidth/2) / 40}px, ${-(cursorPosition.y - window.innerHeight/2) / 40}px)`
          }}
        />
        <div 
          className="absolute h-24 w-24 bg-green-400 opacity-20 bottom-20 left-1/3 parallax"
          style={{ 
            animation: "float 9s ease-in-out infinite",
            transform: `translate(${(cursorPosition.x - window.innerWidth/2) / 50}px, ${(cursorPosition.y - window.innerHeight/2) / 50}px)`
          }}
        />
        
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-[5rem_1fr_1fr_1fr] lg:grid-cols-[5rem_1fr_1fr_1fr] grid-rows-[auto_1fr_auto] md:grid-rows-[7rem_1fr_auto_1fr]">
          {/* Header */}
          <header className="col-span-full p-4 md:p-6 border-b-8 border-double border-purple-600 z-10 backdrop-blur-sm bg-black bg-opacity-20">
            <h1 className="text-2xl md:text-4xl font-bold text-white mix-blend-difference break-words"
                style={{ textShadow: "3px 3px 0px #ff00cc, 6px 6px 0px #3333ff" }}>
              Adam Timur Aslan → Frontend Developer
            </h1>
          </header>
          
          {/* Sidebar - hidden on mobile, visible on larger screens */}
          <aside className="hidden md:block border-r-8 border-dotted border-yellow-400 p-4 bg-gradient-to-b from-blue-500 to-purple-600 bg-opacity-50 z-10 row-span-2">
            <div className="[writing-mode:vertical-rl] transform rotate-180 text-2xl font-extrabold text-white"
                style={{ animation: "pulse 3s infinite ease-in-out" }}>
              –› Hey! ✨
            </div>
          </aside>
          
          {/* Mobile sidebar alternative */}
          <div className="md:hidden col-span-full p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-center z-10">
            <div className="text-xl font-extrabold text-white animate-bounce">
              –› Hey! ✨
            </div>
          </div>
          
          {/* Main Content */}
          <main className="col-span-full md:col-span-2 p-4 md:p-8 z-10 backdrop-blur-sm bg-white bg-opacity-10"
                style={{ 
                  transform: "rotate(1deg)",
                  boxShadow: "10px 10px 0 rgba(0,0,0,0.2), -10px -10px 0 rgba(255,255,255,0.1)"
                }}>
            <div className="space-y-6">
              <p ref={textRef} 
                 className="text-xl md:text-2xl font-bold text-white p-4 transition-all duration-300" 
                 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                 onClick={triggerConfetti}
              >
                Based in Brooklyn, interested in all things 3D art, music, and full-stack development for over 8 years.
                <span className="block text-sm mt-2 opacity-70">(Click me for a surprise!)</span>
              </p>
              
              <div className="space-y-4">
                <a
                  href="https://linkedin.com/in/adamaslan"
                  className="block text-white p-4 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-cyan-400 hover:to-blue-600 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 active:scale-95"
                  style={{ animation: "wiggle 10s ease-in-out infinite" }}
                >
                  → Please visit my LinkedIn page :)
                </a>
                
                <div className="border-t-[50px] border-orange-500 p-4 md:p-6 -rotate-2 bg-black relative overflow-hidden hover:scale-105 transition-transform cursor-pointer" 
                     style={{ animation: "float 6s ease-in-out infinite" }}
                     onClick={triggerConfetti}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-700 opacity-20"></div>
                  <p className="text-white font-bold relative z-10">Download our custom font Utopia Serif... you can have it for free!</p>
                  
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 h-8 w-8 border-t-4 border-l-4 border-yellow-300"></div>
                  <div className="absolute top-0 right-0 h-8 w-8 border-t-4 border-r-4 border-green-300"></div>
                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-cyan-300"></div>
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-red-300"></div>
                </div>

                {/* Interactive element - drag or hover effect */}
                <div className="mt-8 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg transform hover:rotate-3 transition-all duration-300">
                  <h3 className="text-white text-xl font-bold mb-2">Get in Touch!</h3>
                  <form className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full p-2 bg-white bg-opacity-20 border-2 border-white placeholder-white placeholder-opacity-70 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transform focus:scale-105 transition-all"
                    />
                    <textarea 
                      placeholder="Your Message" 
                      rows={3}
                      className="w-full p-2 bg-white bg-opacity-20 border-2 border-white placeholder-white placeholder-opacity-70 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transform focus:scale-105 transition-all"
                    />
                    <button 
                      type="button" 
                      className="w-full bg-white text-red-500 font-bold py-2 rounded hover:bg-yellow-300 hover:text-red-700 transform hover:scale-105 active:scale-95 transition-all"
                      onClick={triggerConfetti}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </main>
          
          {/* Additional Content */}
          <aside className="col-span-full md:col-span-1 p-4 md:p-6 z-10 backdrop-blur-sm bg-black bg-opacity-30 mt-4 md:mt-0"
                 style={{ 
                   transform: "rotate(2deg)",
                   boxShadow: "5px 5px 0 rgba(255,0,204,0.5), -5px -5px 0 rgba(51,51,255,0.5)"
                 }}>
            <div className="border-8 border-dashed border-green-400 p-4 bg-gradient-to-bl from-purple-900 to-indigo-800 hover:from-indigo-800 hover:to-purple-900 transition-colors duration-500"
                 style={{ animation: "pulse 5s infinite ease-in-out" }}>
              <a
                href="https://github.com/adamaslan"
                className="block text-white font-bold hover:text-yellow-300 transition-colors duration-300 transform hover:scale-105"
                style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.5)" }}
              >
                → Check out my GitHub projects!
              </a>
            </div>
            
            {/* Fun interactive element */}
            <div className="mt-6 relative overflow-hidden rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-1">
              <div className="bg-black bg-opacity-30 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-white font-bold mb-2">My Skills</h3>
                <ul className="space-y-2">
                  {["React", "TypeScript", "CSS/SCSS", "Node.js", "Three.js"].map((skill, index) => (
                    <li 
                      key={skill} 
                      className="flex items-center text-white relative overflow-hidden group"
                      style={{ animation: `shake ${3 + index * 0.5}s ease-in-out ${index * 0.2}s infinite` }}
                    >
                      <div className="w-full h-3 bg-white bg-opacity-20 rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
                          style={{ 
                            width: `${75 + Math.random() * 25}%`,
                            animation: "pulse 4s infinite"
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 group-hover:text-yellow-300 transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Mobile-friendly social links */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["Twitter", "Instagram", "Dribbble", "Medium"].map(platform => (
                <a 
                  key={platform}
                  href="#" 
                  className="inline-block bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:bg-opacity-40 transition-all transform hover:scale-110 active:scale-95"
                >
                  <span className="text-white">{platform.charAt(0)}</span>
                </a>
              ))}
            </div>
          </aside>
          
          {/* Footer */}
          <footer className="col-span-full text-center p-4 border-t-8 border-double border-cyan-400 z-10 backdrop-blur-sm bg-black bg-opacity-20 mt-4">
            <p className="text-white font-bold text-xl"
               style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
               onClick={triggerConfetti}
            >
              Thanks for visiting!
            </p>
            
            {/* Responsive footer links */}
            <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white">
              <a href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">© 2025 Adam Timur Aslan</a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}