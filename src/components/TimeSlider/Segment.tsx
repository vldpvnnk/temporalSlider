import React, { useRef, useEffect } from "react";
import { TimeSegment } from "../../types";
import gsap from "gsap";

interface SegmentProps {
    index: number;
    segment: TimeSegment;
    activeIndex: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
    setActiveIndex: (index: number) => void;
    setClickedIndex: (index: number | null) => void;
    x: number;
    y: number;
    clickedIndex: number | null;
    sliderId?: string;
}

const Segment: React.FC<SegmentProps> = React.memo(({
    index,
    segment,
    activeIndex,
    hoveredIndex,
    setHoveredIndex,
    setActiveIndex,
    x,
    y,
    clickedIndex,
    setClickedIndex,
    sliderId = ""
}) => {
    const isActive = activeIndex === index;
    const isHovered = hoveredIndex === index;
    const isClicked = clickedIndex === index;

    const dotRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!dotRef.current || !circleRef.current) return;

        const dot = dotRef.current;
        const circle = circleRef.current;

        if (isHovered || isActive) {
            gsap.to(dot, { opacity: 0, duration: 0.3 });
            gsap.to(circle, { scale: 1, opacity: 1, duration: 0.3 });
        } else {
            gsap.to(dot, { opacity: 1, duration: 0.3 });
            gsap.to(circle, { scale: 0, opacity: 0, duration: 0.3 });
        }
    }, [isHovered, isActive]);

    const handleMouseEnter = () => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);
    const handleClick = () => {
        setActiveIndex(index);
        setClickedIndex(isClicked ? null : index);
    };

    return (
        <button
            ref={buttonRef}
            className={`segment ${isActive ? "active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
            aria-label={`Segment ${segment.id}`}
            aria-current={isActive ? "true" : "false"}
            data-slider-id={sliderId}
        >
            <div
                ref={dotRef}
                className="dot"
                style={{ opacity: isActive ? 0 : 0.5 }}
                aria-hidden="true"
            />
            <div
                ref={circleRef}
                className="circle-outline"
                aria-hidden="true"
            />
            
            {(isActive || isHovered) && (
                <div 
                    className="popup-wrapper" 
                    style={{ paddingLeft: isClicked ? "40px" : "0px" }}
                >
                    <div style={{ 
                        position: 'relative', 
                        display: 'flex', 
                        alignItems: 'center'
                    }}>
                        <div className="popup-id">{segment.id}</div>
                        {isClicked && (
                            <div className="category-label" style={{ marginLeft: '20px' }}>
                                {segment.category}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </button>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.index === nextProps.index &&
        prevProps.activeIndex === nextProps.activeIndex &&
        prevProps.hoveredIndex === nextProps.hoveredIndex &&
        prevProps.clickedIndex === nextProps.clickedIndex &&
        prevProps.x === nextProps.x &&
        prevProps.y === nextProps.y &&
        prevProps.segment.id === nextProps.segment.id &&
        prevProps.segment.category === nextProps.segment.category
    );
});

Segment.displayName = "Segment";

export default Segment;