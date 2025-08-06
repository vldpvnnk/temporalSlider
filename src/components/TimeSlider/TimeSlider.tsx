import React, { useState, useEffect, useRef } from "react";
import { timeSegments } from "../context";
import EventSlider from "../EventSlider/EventSlider";
import "./TimeSlider.scss";
import gsap from "gsap";
import Segment from "./Segment";
import NavigationButtons from "./NavigationButtons";

const TimeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const activeSegment = timeSegments[activeIndex];
  const count = timeSegments.length;
  const angleStep = 360 / count;
  const initialBaseAngleDeg = -90 + angleStep / 2;

  const baseAngleRef = useRef({ current: initialBaseAngleDeg });

  const centerX = 268;
  const centerY = 268;

  const radiusX = 265; 
  const radiusY = 268;
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % count);
    setClickedIndex(null);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
    setClickedIndex(null);
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current.querySelector(".segment.active"),
        { scale: 0.5 },
        { scale: 1, duration: 0.3 }
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    const newBaseAngle = initialBaseAngleDeg - activeIndex * angleStep;

    gsap.to(baseAngleRef.current, {
      current: newBaseAngle,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => {
        setTick((t) => t + 1); 
      },
    });
  }, [activeIndex, angleStep, initialBaseAngleDeg]);
  const startYear =timeSegments[activeIndex]?.startYear;
  const endYear = timeSegments[activeIndex]?.endYear;
  return (
    <>
    <div className="time-slider-wrapper">
      <div className="axis-y"></div>
      <div className="horizontal-line"></div>
      <div className="border-wrapper"/>
      <div className="time-slider">
        <div className="grid-overlay">
          <div className="horizontal-line"></div>
          <div className="vertical-line"></div>
        </div>        
        <div className="time-slider-row">
          <div className="date-with-buttons-wrapper">
            <div className="historical-date-title">
              <p>Исторические даты</p>
            </div>
            <div className="segment-with-buttons-wrapper">
              <p className="segment-on-buttons-title">
                {activeIndex + 1} / {count}
              </p>
              <NavigationButtons 
                activeIndex={activeIndex} 
                length={timeSegments.length}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>
          </div>
          <div className="time-circle" ref={circleRef}>
            
            <div className="circle-line" />
              <div className="circle-years">
                <span className="year-left">{startYear}</span>
                <span className="year-right">{endYear}</span>
              </div>

              {timeSegments.map((segment, i) => {
                const isHovered = hoveredIndex === i;

                const angleDeg = baseAngleRef.current.current + i * angleStep;
                const angleRad = (angleDeg * Math.PI) / 180;

                const x = centerX + radiusX * Math.cos(angleRad);
                const y = centerY + radiusY * Math.sin(angleRad);

                const dotRef = React.createRef<HTMLDivElement>();
                const circleRef = React.createRef<HTMLDivElement>();

                useEffect(() => {
                  if (dotRef.current && circleRef.current) {
                    if (isHovered) {
                      gsap.to(dotRef.current, { opacity: 0, duration: 0.5 });
                      gsap.to(circleRef.current, { scale: 1, opacity: 1, duration: 0.5 });
                    } else {
                      gsap.to(dotRef.current, { opacity: 1, duration: 0.5 });
                      gsap.to(circleRef.current, { scale: 0, opacity: 0, duration: 0.5 });
                    }
                  }
                }, [isHovered]);

                return (
                  <Segment 
                    index={i} 
                    segment={segment} 
                    activeIndex={activeIndex} 
                    hoveredIndex={hoveredIndex} 
                    setActiveIndex={setActiveIndex} 
                    setHoveredIndex={setHoveredIndex}
                    clickedIndex={clickedIndex}
                    setClickedIndex={setClickedIndex}
                    x={x}
                    y={y}
                  />
                );
              })}
          </div>
        </div>

        <EventSlider events={activeSegment.events} />
      </div>
    </div>
    </>

  );
};

export default TimeSlider;
