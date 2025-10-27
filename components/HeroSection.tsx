import React from "react";
import Character3D from "@/app/Character3D";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import TypingAnimation from "./TypingAnimation";

const HeroSection = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Full Stack Developer
            </h1> */}
            <TypingAnimation />
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              Building scalable web applications with modern technologies
            </p>
            <div className="flex justify-center lg:justify-start gap-6 mb-8">
              <a
                href="https://github.com/darshanboyat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com/in/darshanboyat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="mailto:darshboyat@gmail.com"
                className="hover:text-purple-400 transition-colors"
              >
                <FaEnvelope size={28} />
              </a>
            </div>
            <div className="text-gray-400">
              <p className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <FaEnvelope size={18} /> darshboyat@gmail.com
              </p>
              <p className="flex items-center justify-center lg:justify-start gap-2">
                <FaPhone size={18} /> +91-9691174714
              </p>
            </div>
          </div>

          {/* Right side - 3D Character */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-96 lg:h-[500px] overflow-hidden">
              <Character3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
