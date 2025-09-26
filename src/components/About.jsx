import React from "react";

function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      
      {/* About Website Section */}
      <div id="about" className="space-y-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">About This Website</h2>

        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold text-gray-900">WriteUp</span> — a space to explore ideas, stories, and perspectives from different walks of life.
        </p>

        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          This website was built with a simple purpose: to share content that informs, inspires, and sparks curiosity. Whether it’s learning something new, reflecting on experiences, or enjoying a thoughtful read, you’ll always find something meaningful here.
        </p>

        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          We believe in keeping things <span className="font-medium text-gray-900">clear, engaging, and valuable</span> for every reader.
        </p>
      </div>

      {/* Features Section */}
      <div id="features" className="space-y-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Features</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg sm:text-xl">
          <li>Curated articles to inform and educate</li>
          <li>Inspirational stories and perspectives</li>
          <li>Interactive content to spark curiosity</li>
          <li>Clean, user-friendly design</li>
          <li>Community connection and engagement</li>
        </ul>
      </div>

      {/* Personal Bio Section */}
      <div id="creator" className="space-y-4 bg-gray-50 p-6 rounded-2xl shadow-md">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">About the Creator</h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Hi, I'm <span className="font-semibold text-gray-900">Naman Dadhich</span>, a B.Tech student at IIIT Bhopal (2023–2027, CGPA: 9.04).  
          Aspiring software developer, competitive programmer, and tech enthusiast.  
          I enjoy building full-stack projects using <span className="font-medium">React, Redux, Tailwind, and Node.js</span>, and have solved 500+ DSA problems across <span className="font-medium">LeetCode, CodeChef, and Codeforces</span>.  
          Notable projects include <span className="font-medium">HackDevs</span>, a hackathon collaboration platform, and a <span className="font-medium">Weather App</span> providing real-time forecasts.
        </p>
      </div>

      {/* End Note Section */}
      <div id="endnote" className="space-y-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">End Note</h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          At its heart, this website isn’t just about content — it’s about connection. Connecting ideas and people, words and understanding, curiosity and growth.
        </p>

        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          Thank you for being here — we hope you enjoy exploring, learning, and connecting as much as we enjoyed creating this space for you.
        </p>
      </div>

    </section>
  );
}

export default About;
