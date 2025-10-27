import React from "react";
import { FaBriefcase } from "react-icons/fa";

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: string[];
}

const ExperienceSection = () => {
  const experience: Experience[] = [
    {
      company: "Curve Metrics",
      role: "Software Developer",
      location: "Nagpur, India",
      period: "June 2024 – Present",
      achievements: [
        "Revamped the Genius GmbH website to enhance UX and search/filtering capabilities",
        "Implemented microservices-based architecture to modularize and scale key backend services",
        "Integrated generative AI features to automate content creation and improve personalization",
        "Used React TypeScript components",
      ],
    },
    {
      company: "Brain Inventory",
      role: "Software Developer",
      location: "Indore, India",
      period: "Oct 2022 – June 2024",
      achievements: [
        "SEO-optimized company website using Next.js, integrated with AWS services like S3, Lambda, and Amplify",
        "Integrated WordPress blogs and lead generation tools to boost inbound marketing",
        "Worked across the full stack using Angular, MUI on the frontend, and Node.js and SpringBoot on the backend",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
          <FaBriefcase className="text-purple-400" size={36} />
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-lg p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400">
                    {exp.company}
                  </h3>
                  <p className="text-lg text-gray-300">{exp.role}</p>
                  <p className="text-sm text-gray-400">{exp.location}</p>
                </div>
                <span className="text-sm text-purple-300 mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="text-gray-300 flex items-start gap-2"
                  >
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
  );
};

export default ExperienceSection;
