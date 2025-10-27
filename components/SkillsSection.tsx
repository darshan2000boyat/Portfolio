import React from "react";
import { FaCode } from "react-icons/fa";

interface Skill {
  languages: string[];
  libraries: string[];
  frameworks: string[];
  testing: string[];
  databases: string[];
  devops: string[];
}

const SkillsSection = () => {
  const skills: Skill = {
    languages: ["JavaScript", "TypeScript", "Java", "SQL", "NoSQL"],
    libraries: ["React", "Redux", "ThreeJS", "R3F", "WebGL"],
    frameworks: [
      "Angular",
      "Next.js",
      "React Native",
      "SpringBoot",
      "Hibernate",
      "SpringAI",
      "Node.js/Express",
      "Microservices",
      "Kafka",
      "GraphQL",
    ],
    testing: ["Jest", "JUnit"],
    databases: ["MySQL", "PostgreSQL", "MongoDB"],
    devops: [
      "CI/CD",
      "Docker",
      "Kubernetes",
      "AWS (EC2, Lambda, S3, Amplify, Route53)",
      "Git",
      "GitHub",
      "BitBucket",
    ],
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
          <FaCode className="text-purple-400" size={36} />
          Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">
              Languages & Libraries
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Libraries</p>
                <div className="flex flex-wrap gap-2">
                  {skills.libraries.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-pink-500/20 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">
              Frameworks & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.frameworks.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-500/20 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">
              Databases & Testing
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 mb-2">Databases</p>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-500/20 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Testing</p>
                <div className="flex flex-wrap gap-2">
                  {skills.testing.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-green-500/20 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <h3 className="text-xl font-semibold mb-4 text-purple-400">
              DevOps & Cloud
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.devops.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-orange-500/20 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
