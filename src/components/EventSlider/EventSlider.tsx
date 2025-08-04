import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./EventSlider.scss";
import { HistoricalEvent } from "../TimeSlider/types";
import React, { useRef, useEffect, useState } from "react";
import RightArrow from "./icons/RightArrow";
import LeftArrow from "./icons/LeftArrow";

interface EventSliderProps {
  events: HistoricalEvent[];
}

const EventSlider = ({ events }: EventSliderProps) => {
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="event-slider-container">
      <button className="custom-nav prev" ref={prevRef}>
        <LeftArrow />
      </button>
      <button className="custom-nav next" ref={nextRef}>
        <RightArrow />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation;

          if (navigation && typeof navigation !== 'boolean') {
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        spaceBetween={80}
        slidesPerView={"auto"}
      >
        {sortedEvents.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="event-card">
              <p className="year">{event.year}</p>
              <p className="description">{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;
