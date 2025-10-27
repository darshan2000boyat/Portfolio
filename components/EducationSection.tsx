import React from "react";
import { FaEnvelope, FaGithub, FaGraduationCap, FaLinkedin, FaPhone } from "react-icons/fa";

const EducationSection = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 rounded-lg p-8 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FaGraduationCap className="text-purple-400" size={32} />
              Education
            </h2>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Sagar Institute of Science and Technology
              </h3>
              <p className="text-gray-300">
                B.Tech in Computer Science and Engineering
              </p>
              <p className="text-sm text-gray-400">Bhopal, India</p>
              <p className="text-sm text-purple-300 mt-2">
                Aug 2019 – Aug 2023
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-8 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FaEnvelope className="text-purple-400" size={32} />
              Get In Touch
            </h2>
            <div className="space-y-4">
              <a
                href="mailto:darshboyat@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <FaEnvelope size={20} />
                <span>darshboyat@gmail.com</span>
              </a>
              <a
                href="tel:+919691174714"
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <FaPhone size={20} />
                <span>+91-9691174714</span>
              </a>
              <a
                href="https://linkedin.com/in/darshanboyat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <FaLinkedin size={20} />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com/darshanboyat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
              >
                <FaGithub size={20} />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
