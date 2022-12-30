import React, { useRef } from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import CurationItems from "./CurationItems";
import { useSelector } from "react-redux";

const All = ({ openSearch }) => {
  SwiperCore.use([Navigation, Pagination]);
  const banners = useSelector(({ store }) => store.banners);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <div className="main_sch">
        <div className="inr-c">
          <div className="lft">
            <Link to="" className="btn-pk n blue bdrs">
              すべて
            </Link>
            <button
              type="button"
              className="btn_sch_input"
              onClick={() => openSearch()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} /> ハッシュタグ検索
            </button>

            <Link to="" className="btn-pk n blue2 bdrs">
              異世界
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              SF
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              恋愛
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              アクション
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              日常
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              その他
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="main_area lst_banner long">
        <div className="inr-c">
          <Swiper
            className="swiper-container mySwiper0"
            slidesPerView={3}
            spaceBetween={12}
            centeredSlides={true}
            loop={true}
            observer={true}
            observeParents={true}
            navigation={{
              prevEl: ".swiper-button-prev.my1",
              nextEl: ".swiper-button-next.my1",
            }}
            pagination={{
              el: ".swiper-pagination.my1",
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.3,
                spaceBetween: 16,
              },
              961: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
            }}
            onUpdate={() => {
              nextRef?.current?.classList?.add("slide_st");
              prevRef?.current?.classList?.add("slide_st");
            }}
          >
            <div className="swiper-wrapper">
              {banners?.map((item, index) => {
                return (
                  <SwiperSlide key={`item_${index}`} className="swiper-slide">
                    <Link to={item?.link}>
                      <img src={item?.bannerImage} alt="이미지" />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>

          <div className="swiper-pagination my1"></div>

          <button
            ref={prevRef}
            type="button"
            className="swiper-button-prev my1"
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="swiper-button-next my1"
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
      </div>
      <CurationItems />
    </>
  );
};

export default All;
