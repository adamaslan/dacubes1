import { type MetaFunction } from "@remix-run/node";
import Navbar from 'app/components/navbar';

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Adam Timur Aslan" },
    { name: "description", content: "Get in touch with Adam Timur Aslan" },
  ];
};

const cssAnimations = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    animation: gradient 15s ease infinite;
  }

  .font-marker {
    font-family: 'Permanent Marker', cursive;
  }
`;

export default function Contact() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssAnimations }} />
      
      <Navbar
        links={[
          { href: "/", text: "Home" },
          { href: "/about", text: "About" },
          { href: "/contact", text: "Contact" }
        ]}
        logo={<div className="text-white font-bold font-marker">LOGO</div>}
      />
      
      <div 
        className="min-h-screen relative animate-gradient"
        style={{
          background: "linear-gradient(125deg, #ff00cc, #3333ff, #00ccff, #33cc33, #ff6600)",
          backgroundSize: "400% 400%",
          padding: '2rem'
        }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Bio Section */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg mt-8">
            <p className="text-xl text-white font-marker">
              Based in Brooklyn, interested in all things 3D art, music, and full-stack development for over 8 years. Lets Connect!
            </p>
          </div>

          {/* Links Section */}
          <div className="mt-8 space-y-4">
            <a
              href="https://linkedin.com/in/adamaslan"
              className="block text-white p-4 bg-blue-600 hover:bg-blue-700 transition-colors font-marker rounded-lg text-center"
            >
              LinkedIn Profile
            </a>
            
            <a
              href="https://github.com/adamaslan"
              className="block text-white p-4 bg-gray-800 hover:bg-gray-900 transition-colors font-marker rounded-lg text-center"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </>
  );
}