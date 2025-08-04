import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './EventSlider.scss';
import { Event } from '../TimeSlider/types';
import React from 'react';

interface EventSliderProps {
  events: Event[];
}

const EventSlider = ({ events }: EventSliderProps) => {
  return (
    <div className="event-slider-container">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={50}
        slidesPerView={1}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;