import React, { useState, useEffect, useRef } from 'react';
import { Check, Clock, Video, Globe } from 'lucide-react';

// --- Theme Colors matched to OnetoZ's light beige/dark text theme ---
const PRIMARY_COLOR_DARK = '#222222'; // Dark text/buttons
const PRIMARY_COLOR_LIGHT = '#EFEAD4'; // Light Beige for button backgrounds
const ACCENT_COLOR_ACCENT = '#A38B57'; // Soft Gold/Brown for subtle accents
const BODY_BG = '#FFF9EA'; // Main Body Background
const CARD_BG = '#ffffff'; // Card Background

const MeetingSection = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Use useRef for the section and text elements for Intersection Observer
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // --- Utility Functions ---

  const generateTimeSlots = () => {
    // Generate simple dummy slots for demonstration
    const slots = [];
    const availableHours = [9, 10, 11, 14, 15, 16]; // 9 AM, 10 AM, 11 AM, 2 PM, 3 PM, 4 PM

    availableHours.forEach(hour => {
      slots.push(`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`);
      slots.push(`${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour >= 12 ? 'PM' : 'AM'}`);
    });
    return slots;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    // getDay() returns 0 for Sunday, 1 for Monday. We want Monday to be 0 for CSS grid.
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) { days.push(null); }
    for (let day = 1; day <= daysInMonth; day++) { days.push(day); }

    return days;
  };

  const isDateAvailable = (day) => {
    if (!day) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    // Check if date is not in the past
    return checkDate >= today;
  };

  // --- Handlers ---
  const handleDateSelect = (day) => {
    if (isDateAvailable(day)) {
      setSelectedDate(day);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      const meetingDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate);
      const meetingDateTime = `${meetingDate.toDateString()} at ${selectedTime}`;

      const emailBody = `Hi OnetoZ Team,

I would like to schedule a 25-minute strategy call.

Preferred Date & Time: ${meetingDateTime}

I look forward to your confirmation.

Best regards`;

      const emailLink = `mailto:OnetoZsolution@gmail.com?subject=Meeting Request - 25-Minute Strategy Call&body=${encodeURIComponent(emailBody)}`;
      window.open(emailLink);
    }
  };

  const navigateMonth = (amount) => {
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + amount));
  };

  // --- Scroll Animation Effect (Parallax/Scroll Reveal) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Re-trigger animation on scroll back into view
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // --- Data for Rendering ---
  const days = getDaysInMonth(currentMonth);
  const timeSlots = generateTimeSlots();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();
  const titleWords = "Ready to Bring Your Vision to Life?".split(' ');

  return (
    <div ref={sectionRef} className={`meeting-section ${isVisible ? 'is-visible' : ''} ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="meeting-container">
        <div className="meeting-content">

          {/* Left Text Content with Animation */}
          <div className="meeting-text">
            <h2 className="meeting-title" ref={titleRef}>
              {titleWords.map((word, index) => (
                <span key={index} className="word-wrapper" style={{ '--word-delay': `${index * 0.08}s` }}>
                  {word}
                </span>
              ))}
            </h2>
            <div className="meeting-description">
              <p style={{ '--p-delay': '0.8s' }} className="fade-in-p">Every great project starts with a <b>clear conversation.</b></p>
              <p style={{ '--p-delay': '1.0s' }} className="fade-in-p">We work with founders and teams who are serious about building something impactful. Schedule a <b>short call to discuss</b> your project goals, challenges, and roadmap.</p>
              <p style={{ '--p-delay': '1.2s' }} className="fade-in-p">Let's discuss your ideas, goals, and how we can help make them happen.</p>
              <p style={{ '--p-delay': '1.4s' }} className="fade-in-p">Calls are <b>25 minutes long</b> — focused, practical, and completely commitment-free.</p>
            </div>
          </div>

          {/* Right Scheduler Box */}
          <div className="meeting-scheduler">
            <div className="scheduler-fixed-header">
              <div className="meeting-icon-wrapper"><span className="meeting-icon">●</span></div>
              <div className="meeting-info">
                <div className="company-name">OnetoZ</div>
                <div className="meeting-title-scheduler">25-Minute Strategy Call</div>
                <div className="meeting-description-scheduler">
                  A short call to understand your goals and see how our team can help you move forward with a clear plan of action.
                </div>
              </div>
            </div>

            <div className="meeting-details">
              <div className="detail-item">
                <Check size={16} color={PRIMARY_COLOR_DARK} />
                <span>Requires confirmation</span>
              </div>
              <div className="detail-item">
                <Clock size={16} color={PRIMARY_COLOR_DARK} />
                <span>25m</span>
              </div>
              <div className="detail-item">
                <Video size={16} color={PRIMARY_COLOR_DARK} />
                <span>Google Meet</span>
              </div>
              <div className="detail-item">
                <Globe size={16} color={PRIMARY_COLOR_DARK} />
                <span>Asia/Kolkata</span>
              </div>
            </div>

            {/* Scrollable Calendar/Time Container */}
            <div className="calendar-time-scroll-container">

              {/* Calendar Section */}
              <div className="calendar-section">
                <div className="calendar-header">
                  <button
                    className="nav-btn"
                    onClick={() => navigateMonth(-1)}
                  >
                    ‹
                  </button>
                  <h3 className="month-year">
                    {currentMonthName} {currentYear}
                  </h3>
                  <button
                    className="nav-btn"
                    onClick={() => navigateMonth(1)}
                  >
                    ›
                  </button>
                </div>

                <div className="calendar-grid">
                  <div className="day-header">MON</div>
                  <div className="day-header">TUE</div>
                  <div className="day-header">WED</div>
                  <div className="day-header">THU</div>
                  <div className="day-header">FRI</div>
                  <div className="day-header">SAT</div>
                  <div className="day-header">SUN</div>

                  {days.map((day, index) => (
                    <button
                      key={index}
                      className={`calendar-day ${day === selectedDate ? 'selected' : ''} ${isDateAvailable(day) ? 'available' : 'unavailable'}`}
                      onClick={() => handleDateSelect(day)}
                      disabled={!isDateAvailable(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Section (Only visible after date selection) */}
              {selectedDate && (
                <div className="time-section">
                  <div className="time-label">TIME</div>
                  <div className="time-slots">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        className={`time-slot ${time === selectedTime ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Fixed Schedule Button at the bottom */}
            {selectedDate && selectedTime && (
              <button className="schedule-btn" onClick={handleSchedule}>
                Schedule Meeting
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* --- General Layout & Colors --- */
        .meeting-section {
          background-color: ${BODY_BG};
          padding: 120px 32px;
          min-height: 100vh;
          width: 100%;
          /* Initial state for Scroll Reveal */
          opacity: 0;
          transition: opacity 0.5s ease, background-color 0.4s;
        }

        .meeting-section.dark-theme {
            background-color: #111111;
        }

        .meeting-section.is-visible {
          opacity: 1;
        }

        .meeting-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .meeting-content {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr; /* Adjusted for better ratio */
          gap: 80px;
          align-items: flex-start; /* Align content to the top */
          min-height: 700px;
        }

        /* --- Left Text Animation --- */
        .meeting-text {
          /* Initial state for Scroll Reveal */
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.5s;
        }

        .meeting-section.is-visible .meeting-text {
          opacity: 1;
          transform: translateY(0);
        }

        /* Title Word-by-Word Animation */
        .meeting-title {
          font-size: 56px;
          font-weight: 800;
          color: ${PRIMARY_COLOR_DARK};
          margin-bottom: 32px;
          line-height: 1.1;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 10px; /* Space between words */
          transition: color 0.4s;
        }

        .dark-theme .meeting-title {
            color: #FFF9EA;
        }
        
        .word-wrapper {
          display: inline-block;
          overflow: hidden;
          opacity: 0;
          transform: translateY(100%);
        }

        .meeting-section.is-visible .word-wrapper {
            animation: text-reveal 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
            animation-delay: var(--word-delay);
        }

        @keyframes text-reveal {
            0% { opacity: 0; transform: translateY(100%); }
            100% { opacity: 1; transform: translateY(0); }
        }

        /* Paragraph Staggered Fade-in */
        .meeting-description p {
          font-size: 20px;
          line-height: 1.6;
          color: #444;
          margin-bottom: 24px;
          font-weight: 400;
          transition: color 0.4s;
        }

        .dark-theme .meeting-description p {
            color: #9CA3AF;
        }
        
        .fade-in-p {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            transition-delay: var(--p-delay);
        }

        .meeting-section.is-visible .fade-in-p {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* --- Right Scheduler Box --- */
        .meeting-scheduler {
          background: ${CARD_BG};
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid ${PRIMARY_COLOR_LIGHT};
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.7s, background-color 0.4s, border-color 0.4s;
          display: flex;
          flex-direction: column;
          max-height: 700px; /* Set max height */
        }

        .dark-theme .meeting-scheduler {
            background-color: #1A1A1A;
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .meeting-section.is-visible .meeting-scheduler {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Fixed Header/Details */
        .scheduler-fixed-header {
          display: flex;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          margin-bottom: 20px;
        }

        .meeting-icon-wrapper {
            padding-top: 5px;
        }

        .meeting-icon {
          width: 8px;
          height: 8px;
          background: ${PRIMARY_COLOR_DARK};
          border-radius: 50%;
          display: block;
          transition: background-color 0.4s;
        }

        .dark-theme .meeting-icon {
            background-color: ${ACCENT_COLOR_ACCENT};
        }

        .company-name {
          font-size: 14px;
          color: #777;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .meeting-title-scheduler {
          font-size: 24px;
          font-weight: 700;
          color: ${PRIMARY_COLOR_DARK};
          margin-bottom: 10px;
          transition: color 0.4s;
        }

        .dark-theme .meeting-title-scheduler {
            color: #FFF9EA;
        }

        .meeting-description-scheduler {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
          font-weight: 400;
          transition: color 0.4s;
        }

        .dark-theme .meeting-description-scheduler {
            color: #9CA3AF;
        }

        .meeting-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #333;
          font-weight: 500;
          transition: color 0.4s;
        }

        .dark-theme .detail-item {
            color: #E5E7EB;
        }
        
        .dark-theme .detail-item svg {
            color: ${ACCENT_COLOR_ACCENT} !important;
        }
        
        /* Scrollable Container for Calendar/Time */
        .calendar-time-scroll-container {
            overflow-y: auto; /* This enables vertical scroll when content overflows */
            padding-right: 15px; /* Add padding for scrollbar */
            flex-grow: 1; /* Allow container to fill remaining space */
        }
        
        /* Styling the scrollbar (optional, but good for aesthetics) */
        .calendar-time-scroll-container::-webkit-scrollbar {
            width: 8px;
        }
        .calendar-time-scroll-container::-webkit-scrollbar-thumb {
            background-color: #ddd;
            border-radius: 4px;
        }
        .calendar-time-scroll-container::-webkit-scrollbar-track {
            background-color: transparent;
        }
        
        /* Calendar Specific Styles */
        .calendar-section {
          margin-bottom: 24px;
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .nav-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: ${PRIMARY_COLOR_DARK};
          font-weight: 600;
          transition: background 0.2s;
        }

        .nav-btn:hover {
          background: #f0f0f0;
        }

        .month-year {
          font-size: 18px;
          font-weight: 700;
          color: ${PRIMARY_COLOR_DARK};
          transition: color 0.4s;
        }

        .dark-theme .month-year {
            color: #FFF9EA;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }

        .day-header {
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #777;
          padding: 4px 0;
        }

        .calendar-day {
          width: 38px;
          height: 38px;
          border: 1px solid #ddd;
          background: #f5f5f5;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
          color: ${PRIMARY_COLOR_DARK};
          transition: all 0.2s ease;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark-theme .calendar-day {
            background-color: #222;
            border-color: #333;
            color: #FFF9EA;
        }
        
        /* Available, Hover, Selected States */
        .calendar-day.available:hover {
          border-color: ${ACCENT_COLOR_ACCENT};
        }

        .calendar-day.selected {
          background: ${PRIMARY_COLOR_DARK};
          color: white;
          border-color: ${PRIMARY_COLOR_DARK};
          transform: scale(1.05);
        }

        .dark-theme .calendar-day.selected {
            background-color: ${ACCENT_COLOR_ACCENT};
            border-color: ${ACCENT_COLOR_ACCENT};
            color: #111;
        }

        .calendar-day.unavailable {
          background: ${CARD_BG};
          color: #ccc;
          cursor: not-allowed;
          border-color: #f0f0f0;
        }

        .dark-theme .calendar-day.unavailable {
            background-color: #1A1A1A;
            color: #444;
            border-color: #222;
        }

        /* Time Selection Styles */
        .time-section {
          padding-top: 16px;
          border-top: 1px solid #eee;
          transition: border-color 0.4s;
        }

        .dark-theme .time-section {
            border-top-color: #333;
        }

        .time-label {
          font-size: 16px;
          font-weight: 700;
          color: ${PRIMARY_COLOR_DARK};
          margin-bottom: 16px;
        }

        .time-slots {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .time-slot {
          padding: 8px 12px;
          border: 2px solid ${PRIMARY_COLOR_LIGHT};
          background: ${PRIMARY_COLOR_LIGHT};
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          color: ${PRIMARY_COLOR_DARK};
          transition: all 0.2s ease;
          font-weight: 600;
        }

        .dark-theme .time-slot {
            background-color: #222;
            border-color: #333;
            color: #FFF9EA;
        }

        .time-slot:hover {
          border-color: ${ACCENT_COLOR_ACCENT};
        }

        .time-slot.selected {
          background: ${PRIMARY_COLOR_DARK};
          color: white;
          border-color: ${PRIMARY_COLOR_DARK};
        }

        .dark-theme .time-slot.selected {
            background-color: ${ACCENT_COLOR_ACCENT};
            color: #111;
            border-color: ${ACCENT_COLOR_ACCENT};
        }

        /* Fixed Schedule Button */
        .schedule-btn {
          width: 100%;
          padding: 14px;
          background: ${PRIMARY_COLOR_DARK};
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          flex-shrink: 0; /* Ensures button does not shrink in scrollable content */
        }

        .schedule-btn:hover {
          background: ${ACCENT_COLOR_ACCENT};
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .dark-theme .schedule-btn {
            background-color: #FFF9EA;
            color: #111;
        }

        .dark-theme .schedule-btn:hover {
            background-color: ${ACCENT_COLOR_ACCENT};
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }

        /* Responsive adjustments */
        @media (max-width: 992px) {
          .meeting-content {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .meeting-title {
            font-size: 44px;
          }
          
          .meeting-description p {
              font-size: 18px;
          }

          .meeting-scheduler {
            max-height: none; /* Remove max height on smaller screens */
          }
        }
        
        @media (max-width: 576px) {
            .meeting-title {
                font-size: 32px;
                line-height: 1.2;
            }
            .meeting-description p {
                font-size: 16px;
            }
            .calendar-day {
                width: 35px;
                height: 35px;
            }
            .time-slot {
                font-size: 13px;
                padding: 6px 10px;
            }
        }
      `}</style>
    </div>
  );
};

export default MeetingSection;