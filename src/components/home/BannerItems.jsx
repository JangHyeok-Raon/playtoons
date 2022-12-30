import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner from "./Banner";

const BannerItems = ({ curationNum }) => {
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const items = useSelector(({ home }) => home.banners);

  const renderItems = useMemo(() => {
    return items?.map((item, index) => {
      return (
        <SwiperSlide key={index} className="item swiper-slide">
          <Banner item={item?.banner} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      <Swiper
        className="swiper-container mySwiper0 home"
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        observer={true}
        observeParents={true}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        pagination={{
          el: '.swiper-pagination.my1',
          clickable: true,
          // dynamicBullets: true,
        }}
        onUpdate={() => {
          nextRef?.current?.classList?.add("slide_st");
          prevRef?.current?.classList?.add("slide_st");
        }}
      >
        <div className="swiper-wrapper">{renderItems}</div>
      </Swiper>

      <div className="swiper-pagination my1"></div>

      <button
        ref={prevRef}
        type="button"
        className="swiper-button-prev my1 hide-m"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        ref={nextRef}
        type="button"
        className="swiper-button-next my1 hide-m"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

export default BannerItems;
