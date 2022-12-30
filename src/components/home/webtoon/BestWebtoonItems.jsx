import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import BestWebtoon from "./BestWebtoon";
import { getCurationList as getCurationListAPI } from "@/services/curationService";

const BestWebtoonItems = ({ curationNum }) => {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [items, setItems] = useState([]);

  /**
     default background color
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getBackgroundColor = (index) => {
    const num = index % 3;
    if( num === 0 ){
      return '#F8E323';
    } else if( num === 1 ) {
      return '#38AADE';
    } else {
      return '#7CDB62';
    }
  };

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
          <BestWebtoon item={item} color={getBackgroundColor(index)} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      <div className="lst_banner">
        <Swiper
          className="swiper-container mySwiper2"
          slidesPerView={3}
          spaceBetween={48}
          observer={true}
          observeParents={true}
          navigation={{
            nextEl: ".swiper-button-next.bt_mainSlider10",
            prevEl: ".swiper-button-prev.bt_mainSlider10",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.05,
              spaceBetween: 16,
            },
            961: {
              slidesPerView: 2.1,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          onUpdate={() => {
            nextRef?.current?.classList?.add("slide_st");
            prevRef?.current?.classList?.add("slide_st");
          }}
        >
          <div className="swiper-wrapper">{renderItems}</div>
        </Swiper>

        <button
          ref={prevRef}
          type="button"
          className="swiper-button-prev bt_mainSlider10"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button
          ref={nextRef}
          type="button"
          className="swiper-button-next bt_mainSlider10"
        >
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </>
  );
};

export default BestWebtoonItems;
