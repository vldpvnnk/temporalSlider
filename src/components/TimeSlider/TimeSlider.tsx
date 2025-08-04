import { useState } from "react";
import { TimeSegment } from "./types";
import { timeSegments } from "../context";
import EventSlider from "../EventSlider/EventSlider";
import './TimeSlider.scss';
import React from "react"
const TimeSlider = () => {
    const [activeSegment, setActiveSegment] = useState<TimeSegment>(timeSegments[0])
    return (
    <div className="time-slider">
        <div className="time-segments">
            {timeSegments.map((segment) => (
                <button
                    key={segment.id}
                    className={`segment ${activeSegment.id === segment.id ? 'active' : ''}`}
                    onClick={() => setActiveSegment(segment)}
                >
                    {segment.year}
                </button>
                ))}
        </div>
        <EventSlider events={activeSegment.events}/>        
    </div>
    )
}

export default TimeSlider;