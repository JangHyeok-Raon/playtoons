import React, { useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import TimelineItem from "./TimelineItem";
import { TIMELINE_DELAY } from "@/common/constant";

const TimelineItems = ({ items }) => {
  SwiperCore.use([Navigation, Autoplay]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const renderItems = (items) => {
    return (
      <div className="swiper-wrapper">
        {items?.map((item, index) => {
          return (
            <SwiperSlide
              key={`recent_${index}`}
              className="swiper-slide"
              virtualIndex={index}
            >
              {({ isActive }) => (
                <TimelineItem item={item} isActive={isActive} />
              )}
            </SwiperSlide>
          );
        })}
      </div>
    );
  };

  return (
    <Swiper
      className="swiper-container-vertical"
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      direction="vertical"
      effect="fade"
      freeMode={true}
      // autoplay={{
      //   delay: TIMELINE_DELAY,
      //   disableOnInteraction: false,
      // }}
      navigation={{
        prevEl: prevRef?.current,
        nextEl: nextRef?.current,
      }}
    >
      <div className="rgh">
        <button ref={prevRef} type="button" className="btn01 slide_st">
          <span className="i">
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        </button>
        <button ref={nextRef} type="button" className="btn01 slide_st">
          <span className="i">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
      </div>
      {renderItems(items)}
    </Swiper>
  );
};

export default TimelineItems;
