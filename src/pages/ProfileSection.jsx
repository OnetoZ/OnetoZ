import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import imgAkarshana from "./about us image/Akarshana .jpg";
import imgAbhinivesh from "./about us image/abhinivesh.jpg";
import imgSriman from "./about us image/sriman.jpg";
import imgSandhanam from "./about us image/sandhanam.jpg";

const ProfileSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Akarshana",
      roleLines: ["AI", "FULLSTACK", "DEVELOPER"],
      description:
        "An AI full stack developer who creates innovative designs and powerful apps. I blend creativity with technical excellence to deliver seamless, impactful digital experiences. Let’s build technology that inspires.",
      avatar: imgAkarshana,
      linkedin: "#",
      portfolio: "#",
      github: "https://github.com",
    },
    {
      id: 2,
      name: "Abhinivesh",
      roleLines: ["AI", "FULLSTACK", "DEVELOPER"],
      description:
        "A visionary full stack developer with a strong foundation in AI and emerging technologies. I architect transformative digital solutions that fuse captivating design with robust functionality.",
      avatar: imgAbhinivesh,
      linkedin: "https://www.linkedin.com/in/abhinivesh-s-888894sa/",
      portfolio: "https://docs.google.com/document/d/1oJV3dqzHlu1daAS-v5hbrFopZzTtYgO6/edit?usp=drivesdk&ouid=116490592873221895952&rtpof=true&sd=true",
      github: "https://github.com",
    },
    {
      id: 3,
      name: "Sriman",
      roleLines: ["PRODUCT", "MANAGER AND", " FULLSTACK DEVELOPER"],
      description:
        "A product manager passionate about innovation and operational excellence. I guide teams to deliver impactful, high-performing products that meet user needs and business goals.",
      avatar: imgSriman,
      linkedin: "https://www.linkedin.com/in/srimanh/",
      portfolio: "https://tranquil-kitsune-3ae00d.netlify.app",
      github: "https://github.com",
    },
    {
      id: 4,
      name: "Sandhanam",
      roleLines: ["UI/UX ", "DESIGNER AND", "FULLSTACK DEVELOPER"],
      description:
        "UI/UX Designer | Full-Stack Developer | Motion-Driven Interfaces I design user-centric experiences, develop robust applications, and enhance interactions through animation and visual storytelling.",
      avatar: imgSandhanam,
      linkedin: "https://www.linkedin.com/in/sandanam-k/",
      portfolio: "#",
      github: "https://github.com",
    },
  ];

  // === Visibility animation ===
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector(".profile-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // === Card scroll animation ===
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".profile-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
          else entry.target.classList.remove("is-visible");
        });
      },
      { threshold: 0.5 }
    );
    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="profile-section">
      <div className="profile-list profile-list-stacked">
        {teamMembers.map((member) => (
          <div className="profile-card" key={member.id}>
            <div className="profile-image">
              <img src={member.avatar} alt={member.name} />
            </div>

            <div className="profile-content">
              <div className="profile-role">
                <span className="role-line-1">{member.roleLines[0]}</span>
                <span className="role-line-2">{member.roleLines[1]}</span>
                <span className="role-line-3">{member.roleLines[2]}</span>
              </div>

              <div className="profile-greeting">Hi, I'm {member.name}</div>

              <div className="profile-link-container">
                <div className="profile-line"></div>
                <span className="asterisk">*</span>
                <span className="portfolio-tagline">See my work in my Portfolio.</span>
              </div>

              <div className="profile-description">{member.description}</div>

              <div className="profile-actions">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="action-btn linkedin-btn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* GitHub Button */}
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="action-btn github-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="action-btn portfolio-btn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </a>

                <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="action-btn portfolio-text-btn">
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;
