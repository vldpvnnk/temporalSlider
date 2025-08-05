import React, { useRef } from "react";
import { TimeSegment } from "./types"

interface SegmentProps{
    index: number;
    segment: TimeSegment;
    activeIndex: number;
    hoveredIndex: number | null;
    setHoveredIndex: (value: React.SetStateAction<number | null>) => void;
    setActiveIndex: (value: React.SetStateAction<number>) => void;
    setClickedIndex: React.Dispatch<React.SetStateAction<number | null>>;
    x: number;
    y: number;
    clickedIndex: number | null;
}
const Segment = ({
    index,
    segment,
    activeIndex,
    hoveredIndex,
    setHoveredIndex,
    setActiveIndex,
    x,
    y,
    clickedIndex,
    setClickedIndex
}: SegmentProps) => {
      const isActive = activeIndex === index;
  const isHovered = hoveredIndex === index;

  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
    return (                  
    <button
        key={`${segment.id}-${index}`}
        className={`segment ${isActive ? "active" : ""}`}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => {setActiveIndex(index)
            setClickedIndex(index)
        }}
        style={{
            left: `${x}px`,
            top: `${y}px`,
        }}
        >
        <div
            ref={dotRef}
            className="dot"
            style={{ opacity: isActive ? 0 : 1 }}
        />
        <div
            ref={circleRef}
            className="circle-outline"
        />
{(isActive || isHovered) && (
  <div className="popup-wrapper">
    <div className="popup-id">{segment.id}</div>
    {clickedIndex === index && (
      <div className="category-label">{segment.category}</div>
    )}
  </div>
)}
        </button>
    )
}

export default Segment;