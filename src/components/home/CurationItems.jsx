import React, { useState, useEffect, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import Curation from "./Curation";

const CurationItems = ({ curationNum }) => {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [items, setItems] = useState([]);

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
        <SwiperSlide key={index} className="cx swiper-slide">
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
          slidesPerView={6}
          spaceBetween={10}
          grid={{ rows: 1 }}
          observer={true}
          observeParents={true}
          navigation={{
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
          }}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 14,
              grid: {
                rows: 2,
              },
            },
            961: {
              slidesPerView: 4,
              spaceBetween: 20,
              grid: {
                rows: 1,
              },
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 48,
              grid: {
                rows: 1,
              },
            },
          }}
          onUpdate={() => {
            nextRef?.current?.classList?.add("slide_st");
            prevRef?.current?.classList?.add("slide_st");
          }}
        >
          <div className="swiper-wrapper">{renderItems}</div>
        </Swiper>
        
        {/* top 과 겹치는 이름이므로 pagination이 안나왔으므로 삭제 */}
        {/* <div className="swiper-pagination my1"></div> */}

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
