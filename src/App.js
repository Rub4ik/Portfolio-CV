import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress, SiPandas } from "react-icons/si";
import { userInfo } from './config'; // Import userInfo

// Main App component
const App = () => {
  // State to manage the active section for navigation highlighting
  const [activeSection, setActiveSection] = useState('home');

  // Function to handle smooth scrolling and update active section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Effect to observe scroll position and update active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7, // Adjust threshold as needed for when a section is considered "active"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Clean up observer on component unmount
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen font-inter antialiased bg-gray-50 text-gray-800">
      {/* Tailwind CSS CDN - This will be loaded automatically in the Canvas environment */}
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      {/* Font Inter - This will be loaded automatically in the Canvas environment */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /> */}

      <Helmet>
        <title>{userInfo.name} | Portfolio</title>
        <meta name="description" content={userInfo.description} />
        <meta name="keywords" content={userInfo.keywords} />
        <meta name="author" content={userInfo.author} />
        <meta property="og:title" content="{userInfo.name} | Portfolio" />
        <meta property="og:description" content="Explore projects and skills of {userInfo.name}, a passionate developer and data scientist." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://Rub4ik.42web.io/" />
        <meta property="og:image" content="https://Rub4ik.42web.io/images/self.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{userInfo.name} | Portfolio" />
        <meta name="twitter:description" content="Explore projects and skills of {userInfo.name}, a passionate developer and data scientist." />
        <meta name="twitter:image" content="https://Rub4ik.42web.io/images/self.png" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "{userInfo.name}",
            "url": "https://Rub4ik.42web.io/",
            "sameAs": [
              "https://instagram.com/Ibrokhim_rm",
              "https://github.com/Rub4ik",
              "https://twitter.com/Thatweix"
            ],
            "jobTitle": "Web Developer, Data Scientist",
            "image": "https://Rub4ik.42web.io/images/self.png"
          }
          `}
        </script>
      </Helmet>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md rounded-b-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Brand/Logo */}
          <a href="#home" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300" onClick={() => scrollToSection('home')}>
            Rub4ik.42web.io
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink sectionId="home" activeSection={activeSection} onClick={scrollToSection}>Home</NavLink>
            <NavLink sectionId="about" activeSection={activeSection} onClick={scrollToSection}>About</NavLink>
            <NavLink sectionId="skills" activeSection={activeSection} onClick={scrollToSection}>Skills</NavLink>
            <NavLink sectionId="projects" activeSection={activeSection} onClick={scrollToSection}>Projects</NavLink>
            <NavLink sectionId="contact" activeSection={activeSection} onClick={scrollToSection}>Contact</NavLink>
          </div>

          {/* Mobile Navigation (Hamburger Icon) - Placeholder for future implementation */}
          <div className="md:hidden">
            {/* You can add a hamburger icon and mobile menu toggle here */}
            <button className="text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main className="pt-20"> {/* Add padding-top to account for fixed navbar */}

        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8">
          <div className="text-center max-w-4xl">
            <div className="flex justify-center mb-6">
              <div
                className="p-1 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #00FFA4 0%, #A668FF 100%)",
                  display: "inline-block"
                }}
              >
                <img
                  src={userInfo.image} // <-- Use image from userInfo
                  alt="Profile"
                  className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="/images/self.png"; }}
                />
              </div>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              Hi, I'm <span className="text-yellow-300">{userInfo.name}</span>
            </h1>
            <p className="text-xl mb-8">
              A passionate <span className="font-semibold">Web Developer & Data Scientist</span> building modern and responsive web applications.
            </p>
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-white text-indigo-600 hover:bg-indigo-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              View My Work
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  Hello! I'm a dedicated web developer with a strong focus on creating clean, efficient, and user-friendly applications.
                  I enjoy bringing ideas to life on the web, from conceptualization to deployment.
                </p>
                <p className="text-lg leading-relaxed">
                  My journey in web development started with a curiosity for how websites work, which quickly evolved into a passion for building them.
                  I'm always eager to learn new technologies and improve my skills to deliver high-quality solutions.
                </p>
              </div>
              <div className="flex justify-center">
                <div
                  className="p-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #00FFA4 0%, #A668FF 100%)",
                    display: "inline-block"
                  }}
                >
                  <img
                    src={userInfo.image}
                    alt="About Me"
                    className="w-60 h-60 rounded-full border-4 border-white shadow-xl object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="/images/self.png"; }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-8 bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">My Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Example skill cards with icons */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaHtml5 className="mx-auto text-5xl text-orange-600 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">HTML5</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaCss3Alt className="mx-auto text-5xl text-blue-500 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">CSS3</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaJs className="mx-auto text-5xl text-yellow-400 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">JavaScript</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaReact className="mx-auto text-5xl text-blue-400 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">React</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <SiTailwindcss className="mx-auto text-5xl text-teal-400 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">Tailwind CSS</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaNodeJs className="mx-auto text-5xl text-green-600 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">Node.js</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <SiExpress className="mx-auto text-5xl text-gray-700 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">Express.js</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <SiMongodb className="mx-auto text-5xl text-green-700 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">MongoDB</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaGitAlt className="mx-auto text-5xl text-orange-500 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">Git</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaGithub className="mx-auto text-5xl text-gray-900 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">GitHub</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <FaPython className="mx-auto text-5xl text-yellow-500 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">Python</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <SiPandas className="mx-auto text-5xl text-indigo-500 mb-2" />
                <p className="text-xl font-semibold text-indigo-700">Pandas</p>
              </div>
              {/* Add more skills as needed, using appropriate icons */}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">My Projects</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Map through projects from userInfo */}
              {userInfo.projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  liveLink={project.liveLink}
                  githubLink={project.githubLink}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-8 bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-lg mb-8">
              Have a question or want to collaborate? Feel free to reach out!
            </p>
            <div className="bg-white p-8 rounded-lg shadow-xl text-gray-800">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-left text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="mt-12 text-center">
              <p className="text-lg mb-4">Find me on social media:</p>
              <div className="flex justify-center space-x-6">
                <a
                  href={userInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300 transition-colors duration-300 text-3xl"
                  aria-label="Instagram"
                >
                  {/* Instagram icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6 1.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
                </a>
                <a
                  href={userInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300 transition-colors duration-300 text-3xl"
                  aria-label="GitHub"
                >
                  {/* GitHub icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                </a>
                <a
                  href={userInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300 transition-colors duration-300 text-3xl"
                  aria-label="Twitter"
                >
                  {/* Twitter icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37a8.59 8.59 0 0 1-2.72 1.04a4.28 4.28 0 0 0-7.29 3.9A12.13 12.13 0 0 1 3.11 4.9a4.28 4.28 0 0 0 1.32 5.71a4.22 4.22 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.19a4.3 4.3 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2c0-.19-.01-.39-.02-.58A8.72 8.72 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center rounded-t-lg">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Ibrohim Ruzmetov. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

// NavLink component for navigation items
const NavLink = ({ sectionId, activeSection, onClick, children }) => {
  const isActive = activeSection === sectionId;
  return (
    <a
      href={`#${sectionId}`}
      className={`text-lg font-medium px-3 py-2 rounded-md transition-colors duration-300
        ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'}`}
      onClick={() => onClick(sectionId)}
    >
      {children}
    </a>
  );
};

// ProjectCard component for displaying project details
const ProjectCard = ({ title, description, imageUrl, liveLink, githubLink }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/E0E7FF/6366F1?text=Project+Image"; }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex space-x-4">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-300"
          >
            Live Demo
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-700 text-white text-center py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
