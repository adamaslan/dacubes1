import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import RevolvingGLBPage from "~/components/three6";
import Navbar from "~/components/navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "AI Projects - Portfolio" },
    { name: "description", content: "Explore our AI and development projects" },
  ];
};

export default function AIProjects() {
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
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">AI Projects</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 p-5 max-w-6xl mx-auto" id="parent">
          <Link to="./townbranch-hapenny" className="block group">
            <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
              <div className="relative overflow-hidden">
                <img 
                  className="w-full h-64 md:h-80 object-cover transform transition-all duration-500 group-hover:scale-105"
                  alt='food' 
                  src="/happeny2.jpg" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>
              <div className="p-4 bg-rose-100 transition-colors duration-300 group-hover:bg-orange-100">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Transatlantic Collaboration and Sustainability</h2>
                <h3 className="text-lg text-gray-600">The Story of Town Branch and Ha'Penny</h3>
              </div>
            </div>
          </Link>

          <Link to="/sherrycbasedcktailperfectforsummer" className="block group">
            <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 md:h-80 object-cover transform transition-all duration-500 group-hover:scale-105"
                  alt='cocktail'
                  src="https://res.cloudinary.com/adamaslan/image/upload/v1660751024/drinksfoodlife/grandarmypunch_e9pums.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>
              <div className="p-4 bg-sky-100 transition-colors duration-300 group-hover:bg-indigo-100">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Summer Cocktails Part 2</h2>
                <h3 className="text-lg text-gray-600">Grand Army Punch by @chemixtry</h3>
              </div>
            </div>
          </Link>

          <Link to="./about" className="block group">
            <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
              <div className="relative overflow-hidden">
                <div className="w-full h-64 md:h-80 relative overflow-hidden border-2 border-emerald-200">
                  <RevolvingGLBPage 
                    glbFile="/dfl-loading3.glb" 
                    className="w-full h-full transform transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>
              <div className="p-4 bg-emerald-100 transition-colors duration-300 group-hover:bg-teal-100">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Think this 3D logo is cool?</h2>
                <h3 className="text-lg text-gray-600">Let us make you one for an Ad on our site! Contact us today!</h3>
              </div>
            </div>
          </Link>

          <Link to="/northdumplingindimessquare" className="block group">
            <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 md:h-80 object-cover transform transition-all duration-500 group-hover:scale-105"
                  alt='dumpling'
                  src="https://res.cloudinary.com/adamaslan/image/upload/v1654718488/drinksfoodlife/northdump1_dptuen.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              </div>
              <div className="p-4 bg-amber-100 transition-colors duration-300 group-hover:bg-orange-100">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">North Dumpling, the Guru of Dimes Square,</h2>
                <h3 className="text-lg text-gray-600">Dumplings Shining Brightly on the Lower East Side</h3>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}