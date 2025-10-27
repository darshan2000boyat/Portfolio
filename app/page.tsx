"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Briefcase, GraduationCap, Menu, X } from 'lucide-react';
import * as THREE from 'three';

interface MousePosition {
  x: number;
  y: number;
}

interface Skill {
  languages: string[];
  libraries: string[];
  frameworks: string[];
  testing: string[];
  databases: string[];
  devops: string[];
}

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: string[];
}

interface Project {
  name: string;
  tech: string;
  period: string;
  description: string;
  link: string | null;
}

function Character3D(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let model: THREE.Group;
    let mixer: THREE.AnimationMixer;
    let animationId: number;

    const init = async (): Promise<void> => {
      // Scene setup
      scene = new THREE.Scene();
      
      // Camera
      camera = new THREE.PerspectiveCamera(
        50,
        containerRef.current!.clientWidth / containerRef.current!.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 1, 3);
      camera.lookAt(0, 0.5, 0);

      // Renderer
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
      });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputEncoding = THREE.sRGBEncoding;
      containerRef.current!.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xa855f7, 1);
      directionalLight1.position.set(5, 5, 5);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xec4899, 0.8);
      directionalLight2.position.set(-5, 3, -5);
      scene.add(directionalLight2);

      const spotLight = new THREE.SpotLight(0x8b5cf6, 0.5);
      spotLight.position.set(0, 10, 0);
      scene.add(spotLight);

      // Load GLB model
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader();
        
        // You'll need to replace this with the actual path to your .glb file
        loader.load(
          '/path-to-your-model.glb', // UPDATE THIS PATH
          (gltf) => {
            model = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.multiplyScalar(scale);
            
            model.position.x = -center.x * scale;
            model.position.y = -center.y * scale;
            model.position.z = -center.z * scale;

            scene.add(model);

            // Setup animations if available
            if (gltf.animations && gltf.animations.length > 0) {
              mixer = new THREE.AnimationMixer(model);
              const action = mixer.clipAction(gltf.animations[0]);
              action.play();
            }

            setIsLoading(false);
          },
          (progress) => {
            // Optional: track loading progress
            const percentComplete = (progress.loaded / progress.total) * 100;
            console.log(`Loading: ${percentComplete}%`);
          },
          (error) => {
            console.error('Error loading model:', error);
            setError('Failed to load 3D model');
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.error('Error initializing loader:', err);
        setError('Failed to initialize 3D loader');
        setIsLoading(false);
      }

      // Animation loop
      const clock = new THREE.Clock();
      const animate = (): void => {
        animationId = requestAnimationFrame(animate);

        if (mixer) {
          mixer.update(clock.getDelta());
        }

        if (model) {
          model.rotation.y += 0.005; // Slow rotation
        }

        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = (): void => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) {
          renderer.dispose();
          if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
          }
        }
      };
    };

    init();
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading 3D Model...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}

export default function Portfolio(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills: Skill = {
    languages: ['JavaScript', 'TypeScript', 'Java', 'SQL', 'NoSQL'],
    libraries: ['React', 'Redux', 'ThreeJS', 'R3F', 'WebGL'],
    frameworks: ['Angular', 'Next.js', 'React Native', 'SpringBoot', 'Hibernate', 'SpringAI', 'Node.js/Express', 'Microservices', 'Kafka', 'GraphQL'],
    testing: ['Jest', 'JUnit'],
    databases: ['MySQL', 'PostgreSQL', 'MongoDB'],
    devops: ['CI/CD', 'Docker', 'Kubernetes', 'AWS (EC2, Lambda, S3, Amplify, Route53)', 'Git', 'GitHub', 'BitBucket']
  };

  const experience: Experience[] = [
    {
      company: 'Curve Metrics',
      role: 'Software Developer',
      location: 'Nagpur, India',
      period: 'June 2024 – Present',
      achievements: [
        'Revamped the Genius GmbH website to enhance UX and search/filtering capabilities',
        'Implemented microservices-based architecture to modularize and scale key backend services',
        'Integrated generative AI features to automate content creation and improve personalization',
        'Used React TypeScript components'
      ]
    },
    {
      company: 'Brain Inventory',
      role: 'Software Developer',
      location: 'Indore, India',
      period: 'Oct 2022 – June 2024',
      achievements: [
        'SEO-optimized company website using Next.js, integrated with AWS services like S3, Lambda, and Amplify',
        'Integrated WordPress blogs and lead generation tools to boost inbound marketing',
        'Worked across the full stack using Angular, MUI on the frontend, and Node.js and SpringBoot on the backend'
      ]
    }
  ];

  const projects: Project[] = [
    {
      name: 'Genius GmbH',
      tech: 'TypeScript, Next.js, React, AWS, CommerceTools, SpringBoot',
      period: 'Jan 2024 – Present',
      description: 'Built a wholesale marketplace with multi-role architecture. Integrated CMS and eCommerce backend using Contentful and CommerceTools.',
      link: null
    },
    {
      name: 'Dairydreams.shop',
      tech: 'Next.js 14, TypeScript, Firebase, TailwindCSS',
      period: 'Oct 2024 – Dec 2024',
      description: 'Built an eCommerce site with payment gateway, filtering, search, and authentication. (Freelance)',
      link: 'https://dairydreams.shop'
    },
    {
      name: 'Brain Inventory',
      tech: 'Next.js, AWS S3, Amplify, Lambda',
      period: 'May 2023 – Jan 2024',
      description: 'Developed a lead-gen company website optimized for search engines and performance. Connected a WordPress blog to Next.js frontend with serverless AWS support.',
      link: null
    },
    {
      name: 'Numetric.work',
      tech: 'Angular, TypeScript, Spring Boot, MySQL',
      period: 'Nov 2023 – Jan 2024',
      description: 'Developed a portfolio and job listing platform for creative professionals. Implemented user dashboards, job filtering, and Firebase-based auth and storage.',
      link: null
    }
  ];

  const scrollToSection = (section: string): void => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems: string[] = ['home', 'skills', 'experience', 'projects', 'contact'];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 opacity-60 transition-all duration-300 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at ${mousePosition.x * 0.8}% ${mousePosition.y * 1.2}%, rgba(139, 92, 246, 0.3) 0%, transparent 60%),
            linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)
          `
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Darshan Boyat
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-3">
              {navItems.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left capitalize py-2 text-gray-300 hover:text-purple-400"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Full Stack Developer
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                Building scalable web applications with modern technologies
              </p>
              <div className="flex justify-center lg:justify-start gap-6 mb-8">
                <a href="https://github.com/darshanboyat" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                  <Github size={28} />
                </a>
                <a href="https://linkedin.com/in/darshanboyat" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                  <Linkedin size={28} />
                </a>
                <a href="mailto:darshboyat@gmail.com" className="hover:text-purple-400 transition-colors">
                  <Mail size={28} />
                </a>
              </div>
              <div className="text-gray-400">
                <p className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Mail size={18} /> darshboyat@gmail.com
                </p>
                <p className="flex items-center justify-center lg:justify-start gap-2">
                  <Phone size={18} /> +91-9691174714
                </p>
              </div>
            </div>

            {/* Right side - 3D Character */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md h-96 lg:h-[500px] bg-slate-800/30 rounded-lg border border-purple-500/20 overflow-hidden">
                <Character3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Code className="text-purple-400" size={36} />
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Languages & Libraries</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Libraries</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.libraries.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-pink-500/20 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Frameworks & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Databases & Testing</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Databases</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.databases.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Testing</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.testing.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-green-500/20 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">DevOps & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {skills.devops.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-orange-500/20 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Briefcase className="text-purple-400" size={36} />
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400">{exp.company}</h3>
                    <p className="text-lg text-gray-300">{exp.role}</p>
                    <p className="text-sm text-gray-400">{exp.location}</p>
                  </div>
                  <span className="text-sm text-purple-300 mt-2 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <Code className="text-purple-400" size={36} />
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-purple-400">{project.name}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className="text-sm text-purple-300 mb-3">{project.period}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(', ').map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-lg p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="text-purple-400" size={32} />
                Education
              </h2>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">
                  Sagar Institute of Science and Technology
                </h3>
                <p className="text-gray-300">B.Tech in Computer Science and Engineering</p>
                <p className="text-sm text-gray-400">Bhopal, India</p>
                <p className="text-sm text-purple-300 mt-2">Aug 2019 – Aug 2023</p>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Mail className="text-purple-400" size={32} />
                Get In Touch
              </h2>
              <div className="space-y-4">
                <a href="mailto:darshboyat@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors">
                  <Mail size={20} />
                  <span>darshboyat@gmail.com</span>
                </a>
                <a href="tel:+919691174714" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors">
                  <Phone size={20} />
                  <span>+91-9691174714</span>
                </a>
                <a href="https://linkedin.com/in/darshanboyat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors">
                  <Linkedin size={20} />
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://github.com/darshanboyat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors">
                  <Github size={20} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-400 border-t border-purple-500/20">
        <p>© 2025 Darshan Boyat. Built with Next.js 15 & React.</p>
      </footer>
      </div>
    </div>
  );
}