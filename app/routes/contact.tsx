import { type MetaFunction } from "@remix-run/node";
import Navbar from 'app/components/navbar';

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Adam Timur Aslan" },
    { name: "description", content: "Get in touch with Adam Timur Aslan" },
  ];
};

export default function Contact() {
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
    <div className="min-h-screen grid grid-rows-[7rem_1fr_auto_1fr] grid-cols-[5rem_1fr_1fr_1fr] sm:grid-cols-1 font-serif dark:bg-black dark:text-white">
      {/* Header */}
      <header className="col-span-full p-6 border-b-2">
        <h1 className="text-3xl font-bold">Adam Timur Aslan → Frontend Developer</h1>
      </header>

      {/* Sidebar */}
      <aside className="border-r-4 p-4">
        <div className="[writing-mode:vertical-rl] transform rotate-180 text-lg">
          –› Hey!
        </div>
      </aside>

      {/* Main Content */}
      <main className="col-span-2 p-8 rotate-1">
        <div className="space-y-6">
          <p className="text-xl">
            Based in Brooklyn, interested in all things 3D art, music, and full-stack development for over 8 years.
          </p>
          
          <div className="space-y-4">
            <a 
              href="https://linkedin.com/in/adamaslan" 
              className="block text-blue-600 dark:text-blue-400 hover:underline"
            >
              → Please visit my LinkedIn page :)
            </a>
            
            <div className="border-t-[50px] border-black dark:border-white p-4 -rotate-2">
              <p>Download our custom font Utopia Serif... you can have it for free!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Additional Content */}
      <aside className="p-6 rotate-2">
        <div className="border-2 p-4">
          {/* Placeholder for Tic-Tac-Toe game */}
          <div className="text-center">Tic-Tac-Toe Game Coming Soon!</div>
        </div>
      </aside>

      {/* Footer */}
      <footer className="col-span-full text-center p-4 border-t-2">
        <p>Thanks for visiting!</p>
      </footer>
    </div>
    </>
  );
}