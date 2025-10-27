import React from "react";
import { FaCode, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  name: string;
  tech: string;
  period: string;
  description: string;
  link: string | null;
}

const ProjectSection = () => {
  const projects: Project[] = [
    {
      name: "Genius GmbH",
      tech: "TypeScript, Next.js, React, AWS, CommerceTools, SpringBoot",
      period: "Jan 2024 – Present",
      description:
        "Built a wholesale marketplace with multi-role architecture. Integrated CMS and eCommerce backend using Contentful and CommerceTools.",
      link: null,
    },
    {
      name: "Dairydreams.shop",
      tech: "Next.js 14, TypeScript, Firebase, TailwindCSS",
      period: "Oct 2024 – Dec 2024",
      description:
        "Built an eCommerce site with payment gateway, filtering, search, and authentication. (Freelance)",
      link: "https://dairydreams.shop",
    },
    {
      name: "Brain Inventory",
      tech: "Next.js, AWS S3, Amplify, Lambda",
      period: "May 2023 – Jan 2024",
      description:
        "Developed a lead-gen company website optimized for search engines and performance. Connected a WordPress blog to Next.js frontend with serverless AWS support.",
      link: null,
    },
    {
      name: "Numetric.work",
      tech: "Angular, TypeScript, Spring Boot, MySQL",
      period: "Nov 2023 – Jan 2024",
      description:
        "Developed a portfolio and job listing platform for creative professionals. Implemented user dashboards, job filtering, and Firebase-based auth and storage.",
      link: null,
    },
  ];
  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
          <FaCode className="text-purple-400" size={36} />
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-105"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-purple-400">
                  {project.name}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <FaExternalLinkAlt size={20} />
                  </a>
                )}
              </div>
              <p className="text-sm text-purple-300 mb-3">{project.period}</p>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.split(", ").map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
