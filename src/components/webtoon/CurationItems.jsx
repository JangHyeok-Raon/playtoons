import { useWindowSize } from "@/hook/useWindowSize";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import {
  faCircleChevronLeft,
  faCircleChevronRight
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import Curation from "./Curation";

const CurationItems = ({ curationNum }) => {
  SwiperCore.use([Navigation, Pagination]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const windowSize = useWindowSize();
  const [items, setItems] = useState([]);
  const [stateIsMobile, setStateIsMobile] = useState(windowSize.width < 961);

  const getCurationList = async (curationNum) => {
    const response = await getCurationListAPI(curationNum);
    if (response.status === 200) {
      setItems(response.data.posts);
    }
  };

  useEffect(() => {
    if (!items?.length) {
      getCurationList(curationNum);
    }
  }, [items, curationNum]);

  useEffect(() => {
    if (windowSize.width < 961) {
      setStateIsMobile(true);
    }
  }, [windowSize]);

  const renderItems = useMemo(() => {
    return items.map((item, index) => {
      return (
        <SwiperSlide
          key={`swiper_slide_${index}`}
          className="item swiper-slide"
        >
          <Curation item={item} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      <div className="lst_banner">
        <Swiper
          className="swiper-container mySwiper1"
          // initialSlide={0}
          slidesPerView={3}
          spaceBetween={12}
          loop={true}
          observer={true}
          observeParents={true}
          centeredSlides={stateIsMobile}
          pagination={{
            el: ".swiper-pagination.my1",
            dynamicBullets: true,
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              spaceBetween: 16,
            },
            1000: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
          }}
          onUpdate={() => {
            nextRef?.current?.classList?.add("slide_st");
            prevRef?.current?.classList?.add("slide_st");
          }}
        >
          <div className="swiper-wrapper">{renderItems}</div>
        </Swiper>

        <div className="swiper-pagination my1"></div>

        <button ref={prevRef} type="button" className="swiper-button-prev my1">
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button ref={nextRef} type="button" className="swiper-button-next my1">
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </>
  );
};

export default CurationItems;
