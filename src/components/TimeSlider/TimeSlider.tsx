import { useState, useEffect, useRef } from "react";
import React from "react";
import { TimeSegment } from "./types";
import { timeSegments } from "../context";
import EventSlider from "../EventSlider/EventSlider";
import "./TimeSlider.scss";
import gsap from "gsap";

const TimeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const radius = 140;

  const activeSegment = timeSegments[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % timeSegments.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      (prev - 1 + timeSegments.length) % timeSegments.length
    );
  };

  useEffect(() => {
    if (circleRef.current) {
      const segments = circleRef.current.querySelectorAll(".segment");
      const centerX = 175;
      const centerY = 175;

      segments.forEach((segment, index) => {
        const angle = (360 / timeSegments.length) * index - 90;
        const rad = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);

        (segment as HTMLElement).style.left = `${x}px`;
        (segment as HTMLElement).style.top = `${y}px`;
      });
    }
  }, [timeSegments.length]);

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current.querySelector(".segment.active"),
        { scale: 1 },
        { scale: 1.3, duration: 0.3 }
      );
    }
  }, [activeIndex]);

  return (
    <div className="time-slider-wrapper">
      <div className="time-slider">
        <div className="time-circle" ref={circleRef}>
          <div className="circle-line" />
          <button className="circle-nav prev" onClick={handlePrev}>
            ←
          </button>
          <button className="circle-nav next" onClick={handleNext}>
            →
          </button>
          {timeSegments.map((segment, i) => (
            <button
              key={segment.id}
              className={`segment ${activeIndex === i ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="year">{segment.id}</span>
              <span className="dot"></span>
            </button>
          ))}
        </div>
        <EventSlider events={activeSegment.events} />
      </div>
    </div>
  );
};

export default TimeSlider;
