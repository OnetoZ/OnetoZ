import React, { useState, useEffect } from "react";
import "./ProfileSection.css";

import imgAkarshana from "./about us image/Akarshana .jpg";
import imgAbhinivesh from "./about us image/abhinivesh.jpg";
import imgAkashad from "./about us image/akshad.jpg";
import imgThiruneshak from "./about us image/thiruneshak.jpg";
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
    },
    {
      id: 3,
      name: "Akashad",
      roleLines: ["CONTENT", "WRITTER AND", "DIGITAL MARKETING"],
      description:
        "A frontend and digital marketing specialist elevating brand identities through striking visuals and smart online strategies. I blend creative design with data-driven marketing for engaging experiences.",
      avatar: imgAkashad,
      linkedin: "#",
      portfolio: "#",
    },
    {
      id: 4,
      name: "Thiruneshak",
      roleLines: ["FULLSTACK ", "DEVELOPER AND", "DIGITAL MARKETING"],
      description:
        "A specialist in content writing and marketing. I turn brand stories into engaging campaigns that captivate audiences and drive real results through creativity and strategy.",
      avatar: imgThiruneshak,
      linkedin: "https://www.linkedin.com/in/thiruneshak-j",
      portfolio: "https://thiruneshakj-portfolio.netlify.app",
    },
    {
      id: 5,
      name: "Sriman",
      roleLines: ["PRODUCT", "MANAGER AND", " FULLSTACK DEVELOPER"],
      description:
        "A product manager passionate about innovation and operational excellence. I guide teams to deliver impactful, high-performing products that meet user needs and business goals.",
      avatar: imgSriman,
      linkedin: "https://www.linkedin.com/in/srimanh/",
      portfolio: "https://tranquil-kitsune-3ae00d.netlify.app",
    },
    {
      id: 6,
      name: "Sandhanam",
      roleLines: ["UI/UX ", "DESIGNER AND", "FULLSTACK DEVELOPER"],
      description:
        "A UI/UX designer and full stack developer passionate about crafting intuitive interfaces and robust applications. I blend art and code to create seamless digital experiences.",
      avatar: imgSandhanam,
      linkedin: "#",
      portfolio: "#",
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

              <div className="profile-link">
                <span className="asterisk">*</span>
                <span className="asterisk-1">*</span>
                <span className="portfolio-tagline">See my work in my Portfolio.</span>
              </div>

              <div className="profile-description">{member.description}</div>

              <div className="profile-actions">
                <button className="action-btn linkedin-btn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>

                <button className="action-btn portfolio-btn">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </button>

                <button className="action-btn portfolio-text-btn">
                  Portfolio
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;
