import React, { useState, useEffect, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import Curation from "./Curation";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { useWindowSize } from "@/hook/useWindowSize";

const CurationItems = ({ curationNum }) => {
  SwiperCore.use([Navigation, Pagination]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [items, setItems] = useState([]);
  const windowSize = useWindowSize();

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

  const renderItems = useMemo(() => {
    return items.map((item, index) => {
      return (
        <SwiperSlide key={index} className="cx">
          <Curation item={item} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      <div className="lst_banner long">
        <Swiper
          className="swiper-container mySwiper1"
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          observer={true}
          observeParents={true}
          pagination={{
            el: ".swiper-pagination.my1",
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
          }}
          onUpdate={(swiper) => {
            nextRef?.current?.classList?.add("slide_st");
            prevRef?.current?.classList?.add("slide_st");
          }}
        >
          {renderItems}
        </Swiper>
        
        <div className={`swiper-pagination my1 ${windowSize.width < 961 ? 'none' : ''}`}></div>

        <button
          ref={prevRef}
          type="button"
          className="swiper-button-prev my1 hide-m"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button
          ref={nextRef}
          type="button"
          className="swiper-button-next my1 hide-m"
        >
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </>
  );
};

export default CurationItems;
