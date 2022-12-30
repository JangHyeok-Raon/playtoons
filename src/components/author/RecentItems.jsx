import RecentItem from "@COMPONENTS/author/RecentItem";
import {
  faCircleChevronLeft,
  faCircleChevronRight
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const RecentItems = () => {
  SwiperCore.use([Navigation]);
  const recents = useSelector(({ author }) => author.recents);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const renderItems = useMemo(() => {
    return recents.map((item, index) => {
      return (
        <SwiperSlide key={`recent_${index}`} className="swiper-slide">
          <RecentItem item={item} />
        </SwiperSlide>
      );
    });
  }, [recents]);

  return (
    <div className="slider_profile"> 
      <Swiper
        className="swiper-container mySwiper1"
        slidesPerView={5}
        spaceBetween={30}
        observer={true}
        observeParents={true}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.8,
            spaceBetween: 12,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        onUpdate={(swiper) => {
          nextRef?.current?.classList?.add("slide_st");
          prevRef?.current?.classList?.add("slide_st");
        }}
      >
        <div className="swiper-wrapper">{renderItems}</div>
      </Swiper>

      <button ref={prevRef} type="button" className="swiper-button-prev my1">
        <FontAwesomeIcon icon={faCircleChevronLeft} />
      </button>
      <button ref={nextRef} type="button" className="swiper-button-next my1">
        <FontAwesomeIcon icon={faCircleChevronRight} />
      </button>
    </div>
  );
};

export default RecentItems;
