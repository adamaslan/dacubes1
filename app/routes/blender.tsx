import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "Blender 3D" },
    { name: "description", content: "Explore Blender 3D software and projects" },
  ];
};

export default function BlenderPage() {
  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  const logo = <div>My Logo</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={navLinks} logo={logo} />
      
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blender 3D Software</h1>
        
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Blender is a free and open-source 3D computer graphics software toolset used for creating
            animated films, visual effects, art, 3D models, and interactive 3D applications.
          </p>
          <p className="text-lg text-gray-700">
            Explore some of the amazing features and projects created with Blender below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 p-5 max-w-4xl mx-auto" id="parent">
          <a href="https://www.blender.org/features/modeling/" target="_blank" rel="noopener noreferrer" 
             className="block w-[280px] sm:w-[320px] md:w-[360px] aspect-square mx-auto bg-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
            <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">3D Modeling</h2>
              <p className="text-white text-sm sm:text-base">Create detailed 3D models with powerful tools</p>
              <p className="text-blue-100 text-xs sm:text-sm mt-2">Learn more about modeling in Blender</p>
            </div>
          </a>

          <a href="https://www.blender.org/features/animation-rigging/" target="_blank" rel="noopener noreferrer" 
             className="block w-[280px] sm:w-[320px] md:w-[360px] aspect-square mx-auto bg-green-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
            <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Animation</h2>
              <p className="text-white text-sm sm:text-base">Bring your creations to life</p>
              <p className="text-green-100 text-xs sm:text-sm mt-2">Explore animation capabilities</p>
            </div>
          </a>

          <a href="https://www.blender.org/features/rendering/" target="_blank" rel="noopener noreferrer" 
             className="block w-[280px] sm:w-[320px] md:w-[360px] aspect-square mx-auto bg-purple-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
            <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Rendering</h2>
              <p className="text-white text-sm sm:text-base">Cycles and Eevee render engines</p>
              <p className="text-purple-100 text-xs sm:text-sm mt-2">Create photorealistic images</p>
            </div>
          </a>

          <a href="https://www.blender.org/features/sculpting/" target="_blank" rel="noopener noreferrer" 
             className="block w-[280px] sm:w-[320px] md:w-[360px] aspect-square mx-auto bg-red-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
            <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Sculpting</h2>
              <p className="text-white text-sm sm:text-base">Digital clay for organic modeling</p>
              <p className="text-red-100 text-xs sm:text-sm mt-2">Discover sculpting tools</p>
            </div>
          </a>
        </div>
        
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <a 
            href="https://www.blender.org/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Download Blender
          </a>
        </div>
      </main>
    </div>
  );
}