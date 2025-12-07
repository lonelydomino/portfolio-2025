import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaCode,
  FaExternalLinkAlt,
  FaChevronDown,
  FaPython
} from 'react-icons/fa'
import { SiTypescript, SiTailwindcss } from 'react-icons/si'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from './emailConfig'
import './App.css'
import { Link } from 'react-router-dom'

// Floating decoration component
const FloatingDecoration = ({ top, left, size, delay, color }: { 
  top: string, 
  left: string, 
  size: number, 
  delay: number, 
  color: string 
}) => (
  <motion.div
    style={{
      position: 'absolute',
      top,
      left,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
      opacity: 0.2,
      zIndex: 0
    }}
    animate={{
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// Tech badge component
const TechBadge = ({ text, delay }: { text: string, delay: number }) => (
  <motion.span
    className="tech-badge"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: delay,
      ease: "easeOut"
    }}
    style={{
      display: 'inline-block',
      background: 'rgba(0, 229, 255, 0.1)',
      color: 'var(--accent)',
      padding: '0.5rem 1rem',
      margin: '0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      letterSpacing: '1px',
      fontFamily: 'monospace',
      border: '1px solid var(--accent)',
      boxShadow: '0 0 10px var(--accent-glow)'
    }}
  >
    {text}
  </motion.span>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [terminalText, setTerminalText] = useState('');
  const fullTerminalText = '> Hello World\n> Initializing interface...\n> Running system check...\n> All systems online.';
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Theme switching logic
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.style.setProperty('--background', '#050a18')
      root.style.setProperty('--foreground', '#e0f2ff')
      root.style.setProperty('--border', '#1a2a4a')
    } else {
      root.style.setProperty('--background', '#f0f4ff')
      root.style.setProperty('--foreground', '#0a1a3a')
      root.style.setProperty('--border', '#c0d0f0')
    }
  }, [isDarkMode])

  // Terminal text typing effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTerminalText(fullTerminalText.slice(0, i));
      i++;
      if (i > fullTerminalText.length) {
        clearInterval(typing);
      }
    }, 50);

    return () => clearInterval(typing);
  }, []);

  return (
    <>
      <header className="header container">
        <div className="logo">MM</div>
        <nav className="nav">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: 'var(--foreground)'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      <section className="hero container">
        {/* Floating decorations */}
        <FloatingDecoration top="20%" left="10%" size={300} delay={0} color="var(--accent)" />
        <FloatingDecoration top="60%" left="80%" size={250} delay={2} color="var(--secondary-accent)" />
        <FloatingDecoration top="80%" left="30%" size={200} delay={4} color="var(--accent)" />
        <FloatingDecoration top="30%" left="60%" size={180} delay={3} color="var(--secondary-accent)" />

        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-tagline">Hello, I'm</div>
          <h1 className="hero-title">Michael Martinez</h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              background: 'rgba(10, 20, 40, 0.5)',
              border: '1px solid var(--border)',
              padding: '1rem',
              borderRadius: 'var(--radius)',
              fontFamily: 'monospace',
              marginBottom: '2rem',
              position: 'relative',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              maxWidth: '600px'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '10px',
              background: 'var(--background)',
              padding: '0 10px',
              color: 'var(--accent)',
              fontSize: '0.8rem'
            }}>
              terminal@user:~$
            </div>
            <pre style={{ margin: 0, overflow: 'hidden', whiteSpace: 'pre-wrap', color: 'var(--foreground)' }}>
              {terminalText}
              <span style={{ 
                display: 'inline-block',
                width: '8px',
                height: '18px',
                backgroundColor: 'var(--accent)',
                animation: 'pulse 1s infinite',
                verticalAlign: 'middle',
                marginLeft: '2px'
              }}></span>
            </pre>
          </motion.div>

          <p className="hero-description">
            A passionate full-stack developer crafting beautiful web experiences with modern technologies.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <TechBadge text="REACT" delay={0.5} />
            <TechBadge text="TYPESCRIPT" delay={0.7} />
            <TechBadge text="NODE.JS" delay={0.9} />
            <TechBadge text="UI/UX" delay={1.1} />
          </div>
          
          <a href="#contact" className="button">Get in Touch</a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'var(--accent)',
            opacity: 0.8
          }}
        >
          <FaChevronDown size={20} style={{ filter: 'drop-shadow(0 0 5px var(--accent-glow))' }} />
        </motion.div>
      </section>

      <section id="about" className="section container">
        <FloatingDecoration top="20%" left="5%" size={200} delay={1} color="var(--accent)" />
        <FloatingDecoration top="70%" left="90%" size={150} delay={3} color="var(--secondary-accent)" />
        
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image" style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(45deg, var(--accent), var(--secondary-accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src="/images/projects/me.png" 
                alt="Michael Martinez" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(5px)',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                letterSpacing: '1px'
              }}>
                {"<developer/>"}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(5px)',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                letterSpacing: '1px'
              }}>
                {new Date().getFullYear()}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ 
              marginBottom: '1.5rem', 
              fontSize: '1.75rem',
              color: 'var(--accent)',
              textShadow: '0 0 5px var(--accent-glow)'
            }}>
              Frontend Developer & UI Designer
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              I'm a passionate web developer with 5+ years of experience building modern, responsive web applications. 
              My expertise lies in crafting beautiful user interfaces and seamless user experiences.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              I specialize in React, TypeScript, Node.js, and modern frontend frameworks. I enjoy solving complex 
              problems and turning ideas into reality through clean, efficient code.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or enjoying outdoor activities.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="section" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
        <FloatingDecoration top="10%" left="80%" size={180} delay={2} color="var(--accent)" />
        <FloatingDecoration top="70%" left="10%" size={220} delay={0} color="var(--secondary-accent)" />
        
        <div className="container">
          <h2 className="section-title">My Skills</h2>
          <div className="skills-container">
            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <div className="skill-icon"><FaReact /></div>
              <h3>React</h3>
              <p>Building modern and scalable user interfaces using React and its ecosystem</p>
            </motion.div>

            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ animation: 'float 6s ease-in-out infinite 1s' }}
            >
              <div className="skill-icon"><SiTypescript /></div>
              <h3>TypeScript</h3>
              <p>Developing type-safe applications with improved code quality and maintainability</p>
            </motion.div>

            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ animation: 'float 6s ease-in-out infinite 2s' }}
            >
              <div className="skill-icon"><FaNodeJs /></div>
              <h3>Node.js</h3>
              <p>Creating backend services and APIs with Node.js and Express</p>
            </motion.div>

            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ animation: 'float 6s ease-in-out infinite 3s' }}
            >
              <div className="skill-icon"><FaDatabase /></div>
              <h3>Databases</h3>
              <p>Working with SQL and NoSQL databases including MongoDB and PostgreSQL</p>
            </motion.div>

            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ animation: 'float 6s ease-in-out infinite 4s' }}
            >
              <div className="skill-icon"><SiTailwindcss /></div>
              <h3>CSS/Tailwind</h3>
              <p>Crafting responsive and beautiful UIs with modern CSS and Tailwind</p>
            </motion.div>

            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ animation: 'float 6s ease-in-out infinite 5s' }}
            >
              <div className="skill-icon"><FaCode /></div>
              <h3>Full Stack</h3>
              <p>End-to-end application development from frontend to backend</p>
            </motion.div>

            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ animation: 'float 6s ease-in-out infinite 6s' }}
            >
              <div className="skill-icon"><FaPython /></div>
              <h3>Python</h3>
              <p>Building data-driven applications, automation scripts, and backend services</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="projects" className="section container">
        <FloatingDecoration top="80%" left="5%" size={150} delay={1} color="var(--secondary-accent)" />
        <FloatingDecoration top="20%" left="95%" size={200} delay={3} color="var(--accent)" />
        
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 5 }}>
              <span style={{
                background: 'var(--accent)',
                color: 'var(--background)',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                boxShadow: '0 0 10px var(--accent-glow)'
              }}>FEATURED</span>
            </div>
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--accent), rgba(0, 229, 255, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Project image - replace placeholder with your actual image */}
              <img 
                src="/images/projects/project1.png" 
                alt="Squid Report Platform" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              {/* Project screenshot background with overlay */}
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Squid Report Platform</h3>
              <p className="project-description">
                A full-stack report generating solution with user authentication and report management designed for environmental professionals.
              </p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Typescript</span>
                <span className="tag">Python</span>
                <span className="tag">FastAPI</span>
              </div>
              <div className="project-links">
                <a href="https://squid.amaearthgroup.com/" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Explore</a>
                <a href="https://github.com/lonelydomino/squid-frontend" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="project-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--secondary-accent), rgba(255, 0, 229, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Project image - replace placeholder with your actual image */}
              <img 
                src="/images/projects/3.png" 
                alt="TDP website" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              {/* Project screenshot background with overlay */}
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Texas Democratic Party Website</h3>
              <p className="project-description">
                A website for the Texas Democratic Party built with Squarespace, JavaScript, and CSS.
              </p>
              <div className="tags">
                <span className="tag">Squarespace</span>
                <span className="tag">Javascript</span>
                <span className="tag">CSS</span>
                <span className="tag">Figma</span>
              </div>
              <div className="project-links">
                <a href="https://texasdemocrats.org/"><FaExternalLinkAlt /> Explore</a>
              </div>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--accent), var(--secondary-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Project image - replace placeholder with your actual image */}
              <img 
                src="/images/projects/4.jpg" 
                alt="Restaurant Website" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              {/* Project screenshot background with overlay */}
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Restaurant Website</h3>
              <p className="project-description">
                This is a code repository and website for a restaurant splash landing page made using React.
              </p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">CSS</span>
                <span className="tag">Responsive</span>
                <span className="tag">UI/UX</span>
              </div>
              <div className="project-links">
                <Link to="https://react-restaurant-landing-page.onrender.com/" className="project-link"><FaExternalLinkAlt /> Explore</Link>
                <a href="https://github.com/lonelydomino/react-restaurant-landing-page" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project 4 */}
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--accent), var(--secondary-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img 
                src="/images/projects/1.png" 
                alt="gpt3" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">GPT3 Tech Page</h3>
              <p clasl-featsName="project-description">
                Using React, created a landing page for a GPT3 tech company.
              </p>
              <div className="tags">
                <span className="tag">React</span>
              </div>
              <div className="project-links">
                <a href="https://modern-react-app1.onrender.com/" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Explore</a>
                <a href="https://github.com/lonelydomino/modern-react-app1" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project 5 */}
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--accent), var(--secondary-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img 
                src="/images/projects/6.png" 
                alt="Todos MERN Stack App" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            {/* Frontend hosted n vercel, backend hosted on render and mongodb, two separate repos */}
            <div className="project-content">
              <h3 className="project-title">Todos MERN Stack App              </h3>
              <p className="project-description">
              This is a code repository and website for an app that allows the user to add, track and complete a custom todo list. Built using NodeJS, React and MongoDB.
              </p>
              <div className="tags">
                <span className="tag">Express</span>
                <span className="tag">MongoDB</span>
                <span className="tag">React</span>
                <span className="tag">NodeJS</span>
              </div>
              <div className="project-links">
                <a href="https://todos-mern-client.vercel.app/" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Explore</a>
                <a href="https://github.com/lonelydomino/Todos-Mern-FullApp" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project 6 */}
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--accent), var(--secondary-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img 
                src="/images/projects/5.png" 
                alt="Notes App" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Notes App              </h3>
              <p className="project-description">
              This is a code repository and website for an app that allows the user to add and track notes using tags.
              </p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Typescript</span>
                <span className="tag">Bootstrap</span>
              </div>
              <div className="project-links">
                <a href="https://654c7235320bb43a59837339--poetic-rolypoly-f66083.netlify.app/" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Explore</a>
                <a href="https://github.com/lonelydomino/ts-react-notes-app" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project 7 - Real-time Chat Application */}
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--accent), var(--secondary-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img 
                src="/images/projects/7.png" 
                alt="Real-time Chat Application" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Real-time Chat Application</h3>
              <p className="project-description">
                A modern, full-featured real-time chat application with group chats, file sharing, voice messages, video calls, and end-to-end encryption. Built with Next.js, Socket.io, MongoDB, and Redis.
              </p>
              <div className="tags">
                <span className="tag">Next.js</span>
                <span className="tag">Socket.io</span>
                <span className="tag">MongoDB</span>
              </div>
              <div className="project-links">
                <a href="https://chat-app-qu48.onrender.com/" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Explore</a>
                <a href="https://github.com/lonelydomino/chat-app" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project 8 - Pilk Chat */}
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--secondary-accent), var(--accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img 
                src="/images/projects/8.png" 
                alt="Pilk Chat" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">BlueSky Clone</h3>
              <p className="project-description">
                A modern, decentralized social media platform built with Next.js and TypeScript. Features include user authentication, posts, following system, likes, reposts, comments, real-time notifications, and a bookmarks system.
              </p>
              <div className="tags">
                <span className="tag">Next.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">Tailwind CSS</span>
              </div>
              <div className="project-links">
                <a href="https://pilkchat.vercel.app" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Explore</a>
                <a href="https://github.com/lonelydomino/pilkchat" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>

          {/* Project 9 - Weather Dashboard */}
          <motion.div 
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div 
              style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--accent), var(--secondary-accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img 
                src="/images/projects/9.png" 
                alt="Weather Dashboard" 
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0
                }}
              />
              
              <div style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}></div>
            </div>
            <div className="project-content">
              <h3 className="project-title">Weather Dashboard</h3>
              <p className="project-description">
                A full-stack weather dashboard application with Python FastAPI backend and React TypeScript frontend. Features include current weather data, forecast information, and real-time weather API integration with a modern, responsive interface.
              </p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
                <span className="tag">FastAPI</span>
                <span className="tag">Python</span>
              </div>
              <div className="project-links">
                <a href="https://weather-dashboard-nine-beta.vercel.app/" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Explore</a>
                <a href="https://github.com/lonelydomino/weather-dashboard" target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="section" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
        <FloatingDecoration top="30%" left="10%" size={180} delay={2} color="var(--accent)" />
        <FloatingDecoration top="60%" left="90%" size={200} delay={4} color="var(--secondary-accent)" />
        
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container">
            <form 
              ref={formRef}
              className="contact-form" 
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setFormError('');
                
                try {
                  console.log("Form submitted");
                  
                  // Get form values for possible fallback
                  const formData = new FormData(formRef.current as HTMLFormElement);
                  const name = formData.get('from_name') as string;
                  const email = formData.get('reply_to') as string;
                  const message = formData.get('message') as string;
                  
                  console.log("Sending email with data:", { name, email, message });

                  // Fix for EmailJS template - ensure message is included
                  const templateParams = {
                    from_name: name,
                    reply_to: email,
                    message: `From: ${name}\nEmail: ${email}\n\n${message}`,
                    to_email: "michael.martinez2707@gmail.com",
                    subject: `Portfolio Contact from ${name}`
                  };
                  
                  // EmailJS configuration - using sendForm was problematic, switch to send
                  emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                  )
                  .then((result) => {
                    console.log('Email sent successfully:', result.text);
                    setFormSubmitted(true);
                    setIsSubmitting(false);
                    
                    if (formRef.current) {
                      formRef.current.reset();
                    }
                    
                    // Hide the success message after 3 seconds
                    setTimeout(() => setFormSubmitted(false), 3000);
                  }, (error) => {
                    console.error('Error sending email:', error.text);
                    
                    // Fallback to mailto if EmailJS fails
                    if (error.text?.includes("Public Key is invalid")) {
                      console.log("Falling back to mailto link");
                      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
                      const body = encodeURIComponent(`Message from: ${name}\nEmail: ${email}\n\n${message}`);
                      window.location.href = `mailto:michael.martinez2707@gmail.com?subject=${subject}&body=${body}`;
                      setIsSubmitting(false);
                    } else {
                      setFormError('Failed to send your message. Please try again or contact directly via email.');
                      setIsSubmitting(false);
                    }
                  });
                } catch (error) {
                  console.error("Error submitting form:", error);
                  setFormError('An unexpected error occurred. Please try again.');
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="from_name" id="name" className="form-input" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="reply_to" id="email" className="form-input" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea name="message" id="message" className="form-textarea" placeholder="Your Message" required></textarea>
              </div>
              <input type="hidden" name="to_email" value="michael.martinez2707@gmail.com" />
              <button 
                type="submit" 
                className="button" 
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {formSubmitted && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem', 
                  textAlign: 'center',
                  color: 'var(--accent)',
                  background: 'rgba(0, 229, 255, 0.1)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--accent)'
                }}>
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {formError && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem', 
                  textAlign: 'center',
                  color: '#ff4e4e',
                  background: 'rgba(255, 0, 0, 0.1)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid #ff4e4e'
                }}>
                  {formError}
                </div>
              )}
            </form>
            <div className="contact-info" style={{ 
              marginTop: '2rem', 
              textAlign: 'center',
              padding: '1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: 'rgba(0, 10, 20, 0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Contact Info</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <FaEnvelope style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                <a href="mailto:michael.martinez2707@gmail.com" style={{ 
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  borderBottom: '1px dashed var(--accent)',
                  transition: 'color 0.3s ease'
                }}>
                  michael.martinez2707@gmail.com
                </a>
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <FaLinkedin style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                <a href="https://www.linkedin.com/in/michael-martinez-bb49a8a0/" target="_blank" rel="noopener noreferrer" style={{ 
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  borderBottom: '1px dashed var(--accent)',
                  transition: 'color 0.3s ease'
                }}>
                  LinkedIn
                </a>
              </p>
              <p>
                <FaGithub style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                <a href="https://github.com/lonelydomino/" target="_blank" rel="noopener noreferrer" style={{ 
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  borderBottom: '1px dashed var(--accent)',
                  transition: 'color 0.3s ease'
                }}>
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="social-links">
            <a href="https://github.com/lonelydomino/" target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/michael-martinez-bb49a8a0/" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
            <a href="mailto:michael.martinez2707@gmail.com" className="social-link"><FaEnvelope /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} Michael Martinez. All rights reserved.</p>
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '0.8rem', 
            opacity: 0.7,
            fontFamily: 'monospace',
            letterSpacing: '1px'
          }}>
            &lt;/&gt; with ❤️ and React
          </p>
        </div>
      </footer>
    </>
  )
}

export default App 