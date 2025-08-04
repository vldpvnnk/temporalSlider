import React from 'react';
import '../styles/main.scss';
import TimeSlider from './TimeSlider/TimeSlider';

const App = () => {
  return (
    <div className="app">
      <h1>Time Slider App</h1>
      <TimeSlider />
    </div>
  );
};

export default App;