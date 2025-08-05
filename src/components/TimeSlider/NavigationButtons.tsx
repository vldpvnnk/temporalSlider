import React from "react";
import LeftArrow from "../EventSlider/icons/LeftArrow";
import RightArrow from "../EventSlider/icons/RightArrow";

interface NavigationButtonsProps {
  activeIndex: number;
  length: number;
  onNext: () => void;
  onPrev: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  activeIndex,
  length,
  onNext,
  onPrev,
}) => {
  const opacityLeftArrow = activeIndex !== 0 ? 1 : 0.5;
  const opacityRightArrow = activeIndex !== length - 1 ? 1 : 0.5;

  return (
    <div className="buttons-wrapper">
      <button
        className="prev"
        onClick={onPrev}
        disabled={activeIndex === 0}
        style={{
          opacity: opacityLeftArrow,
          cursor: opacityLeftArrow === 1 ? "pointer" : "auto",
        }}
      >
        <LeftArrow />
      </button>
      <button
        className="next"
        onClick={onNext}
        disabled={activeIndex === length - 1}
        style={{
          opacity: opacityRightArrow,
          cursor: opacityRightArrow === 1 ? "pointer" : "auto",
        }}
      >
        <RightArrow />
      </button>
    </div>
  );
};

export default NavigationButtons;
