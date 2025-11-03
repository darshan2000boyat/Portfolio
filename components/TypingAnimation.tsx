import TypeIt from "typeit-react";

const TypingAnimation = () => {
  return (
    <TypeIt
      options={{
        strings: [
          "Full Stack Developer",
          "React Developer",
          "Angular Developer",
          "Next JS Developer",
          "Spring Boot Developer",
        ],
        loop: true,
        speed: 75,
        breakLines: false,
       
      }}
      className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
    />
  );
};

export default TypingAnimation;
